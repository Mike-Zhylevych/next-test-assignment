const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const incomeCategories = [
  { name: "Salary", description: "Income from salary" },
  { name: "Freelance", description: "Income from freelance work" },
  { name: "Investments", description: "Income from investments" },
  { name: "Rental Income", description: "Income from rental properties" },
  { name: "Business Income", description: "Income from business activities" },
  { name: "Interest Income", description: "Income from interest" },
  { name: "Dividends", description: "Income from dividends" },
  { name: "Gifts", description: "Income from gifts" },
  { name: "Refunds", description: "Income from refunds" },
  { name: "Other Income", description: "Other sources of income" },
];

const expenseCategories = [
  { name: "Groceries", description: "Expenses for groceries" },
  { name: "Rent/Mortgage", description: "Expenses for rent or mortgage" },
  { name: "Utilities", description: "Expenses for utilities" },
  { name: "Transportation", description: "Expenses for transportation" },
  { name: "Insurance", description: "Expenses for insurance" },
  { name: "Healthcare", description: "Expenses for healthcare" },
  { name: "Dining Out", description: "Expenses for dining out" },
  { name: "Entertainment", description: "Expenses for entertainment" },
  { name: "Travel", description: "Expenses for travel" },
  { name: "Education", description: "Expenses for education" },
  { name: "Clothing", description: "Expenses for clothing" },
  { name: "Personal Care", description: "Expenses for personal care" },
  { name: "Subscriptions", description: "Expenses for subscriptions" },
  { name: "Debt Payments", description: "Expenses for debt payments" },
  { name: "Savings", description: "Expenses for savings" },
  { name: "Charity", description: "Expenses for charity" },
  {
    name: "Household Supplies",
    description: "Expenses for household supplies",
  },
  { name: "Childcare", description: "Expenses for childcare" },
  { name: "Pets", description: "Expenses for pets" },
  { name: "Miscellaneous", description: "Miscellaneous expenses" },
];

async function main() {
  try {
    // Delete existing categories transactions and users
    await prisma.transaction.deleteMany({});
    await prisma.category.deleteMany({});
    await prisma.user.deleteMany({});

    // Insert income categories
    const createdIncomeCategories = [];
    for (const category of incomeCategories) {
      const createdCategory = await prisma.category.create({
        data: {
          name: category.name,
          description: category.description,
        },
      });
      createdIncomeCategories.push(createdCategory);
    }

    // Insert expense categories
    const createdExpenseCategories = [];
    for (const category of expenseCategories) {
      const createdCategory = await prisma.category.create({
        data: {
          name: category.name,
          description: category.description,
        },
      });
      createdExpenseCategories.push(createdCategory);
    }

    // Create a user
    await prisma.user.create({
      data: {
        id: "4322b15c-fc1d-4d3d-a822-5811bf53d486",
        email: "test@test.com",
      },
    });

    // Create transactions
    const userId = "4322b15c-fc1d-4d3d-a822-5811bf53d486";

    const transactions = [];

    for (let i = 0; i < 1000; i++) {
      const isIncome = Math.random() > 0.5;
      const category = isIncome
        ? createdIncomeCategories[
            Math.floor(Math.random() * createdIncomeCategories.length)
          ]
        : createdExpenseCategories[
            Math.floor(Math.random() * createdExpenseCategories.length)
          ];

      transactions.push({
        amount: isIncome
          ? Math.floor(Math.random() * 10000)
          : -Math.floor(Math.random() * 10000),
        payee: `Payee ${i}`,
        notes: `Transaction ${i}`,
        userId: userId,
        categoryId: category.id,
        createdAt: new Date(
          2024,
          Math.floor(Math.random() * 12),
          Math.floor(Math.random() * 30)
        ),
      });
    }

    await prisma.transaction.createMany({
      data: transactions,
    });

    console.log(
      "Categories and transactions have been populated successfully."
    );
  } catch (error) {
    console.error("Failed to populate categories and transactions:", error);
  } finally {
    await prisma.$disconnect();
  }
}

main();
