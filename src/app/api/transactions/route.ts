import { db } from "@/db";
import { NextRequest, NextResponse } from "next/server";
import { DEFAULT_ROWS_PER_PAGE } from "@/constants";

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;

  const limit = Number(searchParams.get("limit")) || DEFAULT_ROWS_PER_PAGE;
  const page = Number(searchParams.get("page")) || 1;
  const notes = searchParams.get("notes") || false;

  const take = Number(limit);
  const skip = (Number(page) - 1) * take;

  try {
    const transactions = await db.transaction.findMany({
      skip: searchParams.get("limit") ? skip : undefined,
      take: searchParams.get("limit") ? take : undefined,
      orderBy: {
        createdAt: "desc",
      },
      include: {
        category: true,
      },
      where: {
        notes: notes ? { contains: notes } : undefined,
      },
    });
    const totalTransactions = await db.transaction.count({
      where: {
        notes: notes ? { contains: notes } : undefined,
      },
    });
    return NextResponse.json({ transactions, totalTransactions });
  } catch (error) {
    console.error("Failed to fetch transactions", error);
    return NextResponse.json(
      { error: "Failed to fetch transactions" },
      { status: 500 }
    );
  }
}
