import { BalanceCard } from "../../../components/BalanceCard";
import { P2pTransaction } from "../../../components/p2pTransaction";
import SendMoney from "../../../components/SendMoney";
import { getBalance ,getOnp2pTransactions} from "../../lib/helperFunction";
export default async function(){
    
    const balance = await getBalance();
    const p2pTransactions = await getOnp2pTransactions();
        return <div className="w-screen">
        <div className="text-4xl text-[#6a51a6] pt-8 mb-8 font-bold">
            Peer to Peer Transfer
        </div>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 p-4">
            <div>
            <SendMoney/>
            </div>
            <div>
                <BalanceCard amount={balance.amount} locked={balance.locked} />
                <div className="pt-4">
                <P2pTransaction transactions={p2pTransactions} />
                </div>
            </div>
        </div>
    </div>
        
}