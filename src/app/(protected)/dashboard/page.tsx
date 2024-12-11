import { Hero } from "@/components/common";
import { Card } from "@nextui-org/card";
import { DonutChart, AreaChart } from "@/components/charts";
import { db } from "@/db";
import type { Transaction, Category } from "@prisma/client";

type TransactionWithCategory = Transaction & { category: Category | null };

export default async function Dashboard() {
  const lastMonthtransactions = await db.transaction.findMany({
    include: {
      category: true,
    },
    where: {
      createdAt: {
        gte: new Date(new Date().setMonth(new Date().getMonth() - 1)),
      },
    },
  });

  // Get monthly expences and income of the last year
  const lastYeartransactions = await db.transaction.findMany({
    include: {
      category: true,
    },
    where: {
      createdAt: {
        gte: new Date(new Date().setFullYear(new Date().getFullYear() - 1)),
      },
    },
  });

  // Get monthly expences and income of the last year
  const lastYearExpences = lastYeartransactions.filter(
    ({ amount }) => amount < 0
  );

  // Get monthly expences and income of the last year
  const lastYearIncome = lastYeartransactions.filter(
    ({ amount }) => amount > 0
  );

  const lastMonthExpences = lastMonthtransactions.filter(
    ({ amount }) => amount < 0
  );
  const lastMonthIncome = lastMonthtransactions.filter(
    ({ amount }) => amount > 0
  );

  // Group by months and calulate the sum of the amount
  const groupByMonth = (transactions: TransactionWithCategory[]) => {
    return transactions.reduce(
      (
        acc: {
          [month: string]: number;
        },
        transaction: TransactionWithCategory
      ) => {
        const month = new Date(transaction.createdAt).toLocaleString(
          "default",
          {
            month: "long",
          }
        );
        const amount = transaction.amount;
        if (acc[month]) {
          acc[month] += amount;
        } else {
          acc[month] = amount;
        }
        return acc;
      },
      {}
    );
  };

  const groupByCategory = (transactions: TransactionWithCategory[]) =>
    transactions.reduce(
      (
        acc: {
          [category: string]: number;
        },
        transaction: TransactionWithCategory
      ) => {
        const category = transaction?.category?.name;
        const amount = Math.abs(transaction.amount / 1000);
        if (!category) {
          return acc;
        }
        if (acc[category]) {
          acc[category] += amount;
        } else {
          acc[category] = amount;
        }
        return acc;
      },
      {}
    );

  const sortByAmount = (transactions: { [category: string]: number }) =>
    Object.entries(transactions)
      .map(([category, amount]) => ({ category, amount }))
      .sort((a, b) => b.amount - a.amount);

  // Group by category
  const lastMonthExpencesByCategory = groupByCategory(lastMonthExpences);
  const lastMonthIncomeByCategory = groupByCategory(lastMonthIncome);

  // Sort by amount
  const sortedExpencesByCategory = sortByAmount(lastMonthExpencesByCategory);
  const sortedIncomeByCategory = sortByAmount(lastMonthIncomeByCategory);

  const lastYearExpencesByMonth = groupByMonth(lastYearExpences);
  const lastYearIncomeByMonth = groupByMonth(lastYearIncome);

  return (
    <>
      <div className="relative z-10 flex flex-col w-full">
        <Hero />
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 max-w-screen-2xl mx-auto px-4 w-full">
          <Card className="-mt-24 col-span-2">
            <div className="bg-default-300s p-8">
              <h1 className="text-2xl pb-2 font-bold mb-2">
                Transactions Overview
              </h1>
              <AreaChart
                expences={lastYearExpencesByMonth}
                income={lastYearIncomeByMonth}
              />
            </div>
          </Card>
          <Card className="col-span-2 md:col-span-1">
            <div className="bg-default-300s p-8">
              <h1 className="text-2xl pb-2 font-bold mb-2">
                Last Month Expences by category
              </h1>
              <DonutChart expences={sortedExpencesByCategory} />
            </div>
          </Card>
          <Card className="col-span-2 md:col-span-1">
            <div className="bg-default-300s p-8">
              <h1 className="text-2xl pb-2 font-bold mb-2">
                Last Month Income by category
              </h1>
              <DonutChart expences={sortedIncomeByCategory} />
            </div>
          </Card>
        </div>
      </div>
    </>
  );
}
