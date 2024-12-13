import React from "react";
import { render, screen } from "@testing-library/react";
import Dashboard from "../../../../src/app/(protected)/dashboard/page";
import { DonutChart, AreaChart } from "../../../../src/components/charts";
import { db } from "../../../../src/db";
import { usePathname } from "next/navigation";

// Mock for usePathname hook
jest.mock("next/navigation", () => ({
  usePathname: jest.fn(),
}));

// Mock the DonutChart component
jest.mock("../../../../src/components/charts/donut-chart", () => ({
  DonutChart: jest.fn(() => <div data-testid="donut-chart" />),
}));

// Mock the AreaChart component
jest.mock("../../../../src/components/charts/area-chart", () => ({
  AreaChart: jest.fn(() => <div data-testid="area-chart" />),
}));

// Mock the db module
jest.mock("../../../../src/db", () => ({
  db: {
    transaction: {
      findMany: jest.fn(),
    },
  },
}));

beforeEach(() => {
  (usePathname as jest.Mock).mockReturnValue("/dashboard"); // Return a valid pathname
});

describe("Dashboard", () => {
  it("renders DonutChart and AreaChart components with correct props", async () => {
    // Define mock data for transactions
    const mockLastMonthTransactions = [
      {
        id: "1090b63d-0e09-4d37-b18f-674bc6095d6d",
        amount: -7921,
        payee: "Payee 684",
        notes: "Transaction 684",
        userId: "4322b15c-fc1d-4d3d-a822-5811bf53d486",
        categoryId: "7ffbe7da-4103-41be-8efc-37c0ed5c9fa3",
        createdAt: "2024-12-10T23:00:00.000Z",
        category: {
          id: "7ffbe7da-4103-41be-8efc-37c0ed5c9fa3",
          name: "Utilities",
          description: "Expenses for utilities",
        },
      },
      {
        id: "1090b63d-0e09-4d37-b18f-674bc6095d6d",
        amount: -7921,
        payee: "Payee 684",
        notes: "Transaction 684",
        userId: "4322b15c-fc1d-4d3d-a822-5811bf53d486",
        categoryId: "7ffbe7da-4103-41be-8efc-37c0ed5c9fa3",
        createdAt: "2024-12-10T23:00:00.000Z",
      },
      {
        id: "1090b63d-0e09-4d37-b18f-674bc6095d6d",
        amount: -7921,
        payee: "Payee 685",
        notes: "Transaction 684",
        userId: "4322b15c-fc1d-4d3d-a822-5811bf53d486",
        categoryId: "7ffbe7da-4103-41be-8efc-37c0ed5c9fa3",
        createdAt: "2024-12-10T23:00:00.000Z",
        category: {
          id: "7ffbe7da-4103-41be-8efc-37c0ed5c9fa3",
          name: "Utilities",
          description: "Expenses for utilities",
        },
      },
      {
        id: "7553d4b8-6ff2-42b3-9f59-35d01c38a0f4",
        amount: -1352,
        payee: "Payee 683",
        notes: "Transaction 683",
        userId: "4322b15c-fc1d-4d3d-a822-5811bf53d486",
        categoryId: "08efdf77-feb3-40fd-89a3-d5a13b044098",
        createdAt: "2024-11-22T23:00:00.000Z",
        category: {
          id: "08efdf77-feb3-40fd-89a3-d5a13b044099",
          name: "Rental Income",
          description: "Income from rental properties",
        },
      },
    ];

    const mockLastYearTransactions = [
      {
        id: "a646874f-205d-4869-a2a7-3759a3597a04",
        amount: 9195,
        payee: "Payee 89",
        notes: "Transaction 89",
        userId: "4322b15c-fc1d-4d3d-a822-5811bf53d486",
        categoryId: "d5634398-ccf5-410a-ae41-f2477e0b85c9",
        createdAt: "2024-02-02T23:00:00.000Z",
        category: {
          id: "d5634398-ccf5-410a-ae41-f2477e0b85c9",
          name: "Refunds",
          description: "Income from refunds",
        },
      },
      {
        id: "6364f211-be70-4787-bcd4-8c149246edcd",
        amount: -5288,
        payee: "Payee 90",
        notes: "Transaction 90",
        userId: "4322b15c-fc1d-4d3d-a822-5811bf53d486",
        categoryId: "59f9af0e-3dd1-45f0-89c2-dbef3ba1eaf2",
        createdAt: "2024-12-19T23:00:00.000Z",
        category: {
          id: "59f9af0e-3dd1-45f0-89c2-dbef3ba1eaf2",
          name: "Savings",
          description: "Expenses for savings",
        },
      },
      {
        id: "84cb4b1b-d7d3-49cd-8c03-a7099bd27761",
        amount: 5674,
        payee: "Payee 99",
        notes: "Transaction 99",
        userId: "4322b15c-fc1d-4d3d-a822-5811bf53d486",
        categoryId: "44b3e534-8f4d-4a16-84a4-909fbcbf4d2f",
        createdAt: "2024-02-14T22:00:00.000Z",
        category: {
          id: "44b3e534-8f4d-4a16-84a4-909fbcbf4d2f",
          name: "Salary",
          description: "Income from salary",
        },
      },
    ];

    // Mock the db.transaction.findMany to return mock data
    (db.transaction.findMany as jest.Mock)
      .mockResolvedValueOnce(mockLastMonthTransactions)
      .mockResolvedValueOnce(mockLastYearTransactions);

    // Call the Dashboard component and await the JSX
    const dashboardJSX = await Dashboard();

    // Render the returned JSX
    render(dashboardJSX);

    // Assert that AreaChart is rendered
    expect(screen.getByTestId("area-chart")).toBeInTheDocument();

    // Assert that Areachart was called with correct props
    expect(AreaChart).toHaveBeenCalledWith(
      {
        expences: { December: -5288 },
        income: { February: 14869 },
      },
      {}
    );

    // Assert that DonutChart was called with correct props
    expect(DonutChart).toHaveBeenCalledWith(
      {
        expences: [
          { category: "Utilities", amount: 15.842 },
          { category: "Rental Income", amount: 1.352 },
        ],
      },
      {}
    );
  });
  it("renders two instances of DonutChart components ", async () => {
    expect(DonutChart).toHaveBeenCalledTimes(2);
  });
});
