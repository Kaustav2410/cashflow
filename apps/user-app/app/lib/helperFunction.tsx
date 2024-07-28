import prisma from "@repo/db/client";
import { getServerSession } from "next-auth";
import { authOptions } from "./auth";

export async function getBalance() {
    const session = await getServerSession(authOptions);
    const balance = await prisma.balance.findFirst({
        where: {
            userId: Number(session?.user?.id)
        }
    });
    return {
        amount: balance?.amount || 0,
        locked: balance?.locked || 0
    }
}

export async function getOnRampTransactions() {
    const session = await getServerSession(authOptions);
    const txns = await prisma.onRampTransaction.findMany({
        where: {
            userId: Number(session?.user?.id)
        }
    });
    return txns.map((t) => ({
        time: t.startTime,
        amount: t.amount,
        status: t.status,
        provider: t.provider
    }))
}
export async function getOnp2pTransactions() {
    const session = await getServerSession(authOptions);
    const txns = await prisma.p2pTransfer.findMany({
        where: {
            OR: [
                { fromUserId: Number(session?.user?.id) },
                { toUserId: Number(session?.user?.id) }
              ]
        },
        take:5,
        orderBy:{
            timestamp:"desc"
        }
    });

    return txns.map((t) => {
        if(Number(session.user.id)===t.fromUserId)
            return {
                timestamp: t.timestamp,
                amount: t.amount,
                To: t.toUserId,
            }
        else{
            return {
                timestamp: t.timestamp,
                amount: t.amount,
                From: t.fromUserId,
            }
        }
    })
}