import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const cookie = request.cookies;
  const data = await request.json();
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}produksi/insert`,
      {
        method: "POST",
        credentials: "include",
        headers: {
          Cookie: `jwt=${cookie.get("jwt")?.value}`,
        },
        body: JSON.stringify(data),
      }
    );

    const response = await res.json();

    return NextResponse.json(response);
  } catch (error) {
    console.error(error);
    return NextResponse.json({
      message: "Database error",
    });
  }
}
