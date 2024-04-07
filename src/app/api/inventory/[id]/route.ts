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
      `${process.env.NEXT_PUBLIC_API_URL}products/${id}`,
      {
        method: "PUT",
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
      message: "success",
    });
  } catch (error) {
    console.error("Database Error:", error);
    // throw new Error('Failed to create invoice.');
    return NextResponse.json({
      message: "Database error : failed to Update invoices",
    });
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: number } }
) {
  const cookie = req.cookies;
  const id = params.id;

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}products/${id}`,
      {
        method: "DELETE",
        credentials: "include",
        headers: {
          Cookie: `jwt=${cookie.get("jwt")?.value}`,
          "Content-Type": "application/json",
        },
      }
    );
    const response = await res.json();
    return NextResponse.json({
      message: response.message,
      status: "ok",
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({
      message: "Gagal menghapus data",
      status: "gagal",
    });
  }
}
