import { Card } from '@repo/ui/card'
import React from 'react'

export const P2pTransaction = ({
    transactions
}: {
    transactions: {
        timestamp: Date,
        amount: number,
        From?:number,
        To?:number
    }[]
    })=>{
    if(transactions.length<0){
        return (
            <Card title='Recent p2p transactions'>
                <div className="text-center pb-8 pt-8">
                    No Recent transactions
                </div>
            </Card>
        )
    }
  return (
      <Card title='Recent P2P transactions'>
        {
            transactions.map(t => {
                
                // console.log(t);
                return <div className="flex justify-between">
                <div>
                    <div className="text-sm">
                        {t.From?(<p>Received INR</p>):(<p>Sent INR</p>)}
                    </div>
                    <div className="text-slate-600 text-xs">
                        {t.timestamp.toDateString()}
                    </div>
                </div>
                <div className="flex justify-center gap-2">
                {t.From?(<p>+</p>):(<p>-</p>)} Rs {t.amount / 100}
                </div>

            </div>})
        }
      </Card>
  )
}