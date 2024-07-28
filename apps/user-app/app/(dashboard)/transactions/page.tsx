import { getOnRampTransactions,getOnp2pTransactions,getBalance } from "../../lib/helperFunction";
import { BalanceCard } from "../../../components/BalanceCard";
import { OnRampTransactions } from "../../../components/OnRampTransaction";
import { P2pTransaction } from "../../../components/p2pTransaction";

export default async function() {
    const balance = await getBalance();
    const p2pTransactions = await getOnp2pTransactions();
    const transactions = await getOnRampTransactions();
    return <div className="flex flex-col justify-start items-center w-full gap-10">
    <div className=" w-2/3 ">
        <BalanceCard amount={balance.amount} locked={balance.locked} />
    </div>
    <div className=" flex flex-col gap-10 w-2/3 md:flex-row ">
        <div className="w-full md:w-1/2 ">
            <P2pTransaction transactions={p2pTransactions} />
        </div>
        <div className="w-full md:w-1/2">
            <OnRampTransactions transactions={transactions} />
        </div>
    </div>
</div>
}