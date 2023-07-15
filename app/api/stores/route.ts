import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import prismaDb from "@/lib/prismaDb";

export async function POST(request: Request) {
  try {
    const { userId } = auth();
    const body = await request.json();

    const { name } = body;

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!name) {
      return new NextResponse("Name is required", { status: 400 });
    }

    const store = await prismaDb.store.create({
      data: {
        name,
        userId,
      },
    });

    return NextResponse.json(store);
  } catch (error) {
    console.log("[STORES_POST]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
