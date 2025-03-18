import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const cookie = request.cookies;
  const data = await request.json();
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}kas/setor`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        Cookie: `jwt=${cookie.get("jwt")?.value}`,
      },
      body: JSON.stringify(data),
    });
    const response = await res.json();
    if (res.status === 200) {
      console.log(response);
      return NextResponse.json(response);
    } else {
      return NextResponse.json(response);
    }
  } catch (error) {
    console.error(error);
    return NextResponse.json(error);
  }
}
