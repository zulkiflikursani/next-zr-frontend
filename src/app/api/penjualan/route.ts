import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const cookie = request.cookies;
  const data = await request.json();
  // console.log("data req", data);
  try {
    const res = await fetch("http://127.0.0.1:8000/api/v1/penjualan/insert", {
      method: "POST",
      credentials: "include",
      headers: {
        Cookie: `jwt=${cookie.get("jwt")?.value}`,
      },
      body: JSON.stringify(data),
    });

    const response = await res.json();
    // console.log(response);
    return NextResponse.json({
      message: response,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({
      message: "Database error",
    });
  }
}
