import { NextRequest, NextResponse } from "next/server";

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const cookie = req.cookies;
  const data = await req.json();
  const id = params.id;
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}produksi/${id}?_method=PUT`,
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
    return NextResponse.json({
      message: response,
    });
  } catch (error) {
    console.error(error);
  }
}
