import express from "express";
import db from "@repo/db/client"
import { StatusCodes } from "http-status-codes";
import cors from "cors"
const app = express();
app.use(express.json());
app.use(cors());

app.post("/hdfcWebhook", async(req,res)=>{
    // ZOD validation 
    //TODO Only increase the balance if the OnRampStatus is processing
    const paymentInformation:{
        token : string 
        userId: string
        amount: string
    } ={
        token:req.body.token,
        userId:req.body.user_idenifier,
        amount:req.body.amount,
    }
    try{
// Transactional Function: Here, a transaction is defined as an asynchronous function passed to prisma.$transaction. Within this function, multiple operations are performed within the transaction context (tx).
// Error Handling: Custom error handling is added within the transaction.
// Array of Operations: In this approach, an array of Prisma operations is passed directly to prisma.$transaction.
// Optional Configuration: An optional configuration object can be provided to specify transaction isolation levels.
// Differences:
// Syntax:

// Transactional Function: Uses an asynchronous function with the tx transaction context.
// Array of Operations: Directly passes an array of Prisma operations.
// Flexibility:

// Transactional Function: Allows for more complex logic and error handling within the transaction.
// Array of Operations: Simpler and more straightforward for a set of predefined operations.
// Error Handling:

// Transactional Function: Can include custom error handling logic.
// Array of Operations: Relies on Prisma's built-in error handling for the operations provided.
        await db.$transaction([
            db.balance.update({
                where:{
                    userId:Number(paymentInformation.userId)
                },
                data:{
                    amount:{increment:Number(paymentInformation.amount)}
                }
            }),
            db.onRampTransaction.update({
                where:{
                    token:paymentInformation.token
                },
                data:{
                    status:"Success"
                }
            })
    
        ])
        res.status(StatusCodes.OK).json({
            message:"captured"
        })
    
    }catch(e:any){
        res.status(StatusCodes.LENGTH_REQUIRED).json({
            error_message:e.message,
            message:"Error while processing webhook"
        })    
    }
})

app.listen(3003);