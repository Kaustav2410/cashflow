"use client"
import { Button } from "@repo/ui/button";
import { TextInput } from "@repo/ui/text-input";
import { useState } from "react";
import { p2pTransfer } from "../app/lib/actions/p2pTxn";

export default function(){
    
    const [phoneNumber,setPhoneNumber] = useState("");
    const [amount,setAmount] = useState("");
    return <div className="border p-6 rounded-xl bg-[#ededed]">
                <h1 className="text-xl border-b pb-2">
                    Send Money 
                </h1>
                <div className="w-full">
                <TextInput placeholder="Enter the phone number" onChange={(value)=>setPhoneNumber(value)} label="Phone Number" />
                <TextInput placeholder="Enter the amount" onChange={(value)=>setAmount(value)} label="Amount"/>
                    <div className="flex justify-center pt-4">
                        <Button onClick={async ()=>{await p2pTransfer(phoneNumber,Number(amount)*100);}}>
                            Submit
                        </Button> 
                    </div>
                </div>
            </div>
}