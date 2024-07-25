"use server"

import { StatusCodes } from 'http-status-codes';
import db from '@repo/db/client';
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth';
import { v4 as uuidv4 } from 'uuid';

export async function createOnRampTransaction(provider:string ,amount:number){
    // Token should come from the bank service provider 
    
    const session = await getServerSession(authOptions);
    const userId = session?.user?.id;
    console.log(userId);

    if(!userId){
        return {
            message:"User is not logged in",
            status:StatusCodes.UNAUTHORIZED
        }
    }
    try{
        const token = uuidv4();
        console.log(token);

        await db.onRampTransaction.create({
            data:{
                userId:Number(userId),
                provider,
                amount:amount,
                status:"Processing",
                startTime: new Date(),
                token
            }
        })

        return {
            message:"New Transaction entry created successfully",
            status:StatusCodes.OK,
        }
    }
    catch(err){
        return { 
            message:"Unknown error occured during the creation of new OnRamp Entry",
            status:StatusCodes.INTERNAL_SERVER_ERROR
        }
    }
}
