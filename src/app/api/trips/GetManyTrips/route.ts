
import { prisma } from "@/app/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  const trips = await prisma.trip.findMany();

  return new NextResponse(JSON.stringify(trips), { status: 200 });
}