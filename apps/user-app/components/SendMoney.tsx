"use client"
import { Button } from "@repo/ui/button";
import {Card} from "@repo/ui/card";
import { TextInput } from "@repo/ui/text-input";
import { useState } from "react";
import { p2pTransfer } from "../app/lib/actions/p2pTxn";

export default function(){
    
    const [phoneNumber,setPhoneNumber] = useState("");
    const [amount,setAmount] = useState("");
    return (
    <div className="max-h-[90pvh]">
            <Card title="Send">
                <div className="min-w-72 pt-2">
                    <TextInput placeholder="Enter the phone number" onChange={(value)=>setPhoneNumber(value)} label="Phone Number" />
                    <TextInput placeholder="Enter the amount" onChange={(value)=>setAmount(value)} label="Amount"/>
                    <div className="flex justify-center pt-4">
                        <Button onClick={async ()=>{
                        console.log("Details captured : ",phoneNumber);
                        console.log(amount);
                        await p2pTransfer(phoneNumber,Number(amount)*100);
                        }}>Submit</Button> 
                    </div>
                </div>
            </Card>
    </div>
    )
}