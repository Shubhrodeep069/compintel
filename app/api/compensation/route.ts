import { prisma } from "@/app/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const search = request.nextUrl.searchParams.get("search") || "";
  const company = request.nextUrl.searchParams.get("company") || "";
  const level = request.nextUrl.searchParams.get("level") || "";
  const role = request.nextUrl.searchParams.get("role") || "";
  const location = request.nextUrl.searchParams.get("location") || "";
  const page = Number(request.nextUrl.searchParams.get("page") || "1");
  const limit = Number(request.nextUrl.searchParams.get("limit") || "10");
  const sort = request.nextUrl.searchParams.get("sort") || "desc";

  const skip = (page - 1) * limit;

  const records = await prisma.compensationRecord.findMany({
    where: {
      ...(company
        ? {
          company: {
            name: {
              equals: company,
              mode: "insensitive",
            },
          },
        }
        : {}),
      ...(level
        ? {
          level: {
            equals: level,
            mode: "insensitive",
          },
        }
        : {}),
      ...(role
        ? {
          role: {
            equals: role,
            mode: "insensitive",
          },
        }
        : {}),
      ...(location
        ? {
          location: {
            equals: location,
            mode: "insensitive",
          },
        }
        : {}),
      OR: [
        {
          company: {
            name: {
              contains: search,
              mode: "insensitive",
            },
          },
        },
        {
          role: {
            contains: search,
            mode: "insensitive",
          },
        },
        {
          level: {
            contains: search,
            mode: "insensitive",
          },
        },
        {
          location: {
            contains: search,
            mode: "insensitive",
          },
        },
      ],
    },
    include: {
      company: true,
    },
    skip,
take: limit,
orderBy: {
  totalCompensation: sort === "asc" ? "asc" : "desc",
},
  });

  return NextResponse.json(records);
}