import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const cookie = request.cookies;
  const data = await request.json();
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}products/insert`,
      {
        method: "POST",
        credentials: "include",
        headers: {
          Cookie: `jwt=${cookie.get("jwt")?.value}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );
    const response = await res.json();
    return NextResponse.json({
      message: response.message,
      status: "ok",
    });
  } catch (error) {
    console.error("Database Error:", error);
    // throw new Error('Failed to create invoice.');
    return NextResponse.json({
      // failed connect
      message: "Database error : failed to Create invoices",
    });
  }
}
