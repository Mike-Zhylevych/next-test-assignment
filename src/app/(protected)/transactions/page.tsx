import { Hero } from "@/components/common";
import TransactionTable from "@/components/transaction-table";

export default async function Transactions() {
  return (
    <div className="relative z-10 flex flex-col w-full">
      <Hero />
      <TransactionTable />
    </div>
  );
}
