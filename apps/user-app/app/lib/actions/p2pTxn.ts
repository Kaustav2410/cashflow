"use server"
import db from "@repo/db/client";
import { StatusCodes } from "http-status-codes";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth";

export async function p2pTransfer(to:string, amount:number){
    try{
    const session = await getServerSession(authOptions);
    const userId = session?.user?.id;
    if(!userId){
        return {
            message:"User is not logged in",
            status:StatusCodes.UNAUTHORIZED
        }
    }
    console.log("user is logged in");
    const reciver = await db.user.findFirst(
        {where:{
            number: to
        }})
        if(!reciver){
            return {
                message:"Not a valid phone number",
                status:StatusCodes.NOT_ACCEPTABLE
            }
        }
        console.log("Receiver is verified",reciver);
        const sender = await db.user.findUnique({
            where: {
                id: Number(userId)
        }
    });

    if (!sender) {
        return {
            message: "Sender not found",
            status: StatusCodes.NOT_FOUND
        };
    }
    console.log("sender is verified",sender);
    await db.$transaction(async (tx) => {
            // Locks the sender balance row till the transaction is complete to avoid multiple request which performs transaction on the senders balance which is outdated
            // if did the same thing in mongodb we dont have to lock because while mongodb is performing a transcation
            // and before it gets completed and another request is accessing the same resource it reverts back but postgres
            // doesn't have that 
            await tx.$queryRaw`SELECT * FROM "Balance" WHERE "userId"=${sender.id} FOR UPDATE`
            const bal =await tx.balance.findUnique({
                where:{userId:sender.id}
            }) 
            // simulates the waiting between transcation
            // console.log("above sleep");
            // await new Promise(resolve=>setTimeout(resolve,4000));
            // console.log("after sleep");
            console.log(bal);
            if(!bal || bal.amount<amount){
                throw new Error("Insufficent funds")
            } 
            await tx.balance.update({
                where:{userId:sender.id},
                data:{amount:{decrement:amount}}
            }),
            // When the user logs in corresponding entry is not created inside of the balance table 
            // therefore cant send money to the user who doesn't have an entry
            await tx.balance.update({
                where:{userId:reciver.id},
                data:{amount:{increment:amount}}
            })    
            console.log("transcation done");

            await tx.p2pTransfer.create({
                data:{
                    fromUserId:sender.id,
                    toUserId:reciver.id,
                    amount,
                    timestamp: new Date()
                }
            })
        })
    }
    catch(error){
        return {
            message:"Error while doing p2p transfer",
            status:StatusCodes.INTERNAL_SERVER_ERROR
        }
    }
}