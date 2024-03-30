import { options } from "@/app/api/auth/[...nextauth]/options";
import { getServerSession } from "next-auth";
import { cookies } from "next/headers";

export async function getPenjualanById(date: string) {
  const cookie = cookies().get("jwt");
  const session = await getServerSession(options);
  const company = session?.user.company;
  try {
    const res = await fetch(
      `http://127.0.0.1:8000/api/v1/penjualan/${date}/${company}/penjualan`,
      {
        method: "GET",
        credentials: "include",
        headers: {
          Cookie: `jwt=${cookie?.value}`,
        },
        cache: "no-store",
      }
    );
    const dataPenjualan = await res.json();
    return dataPenjualan;
  } catch (error) {
    console.error("error get penjualan", error);
  }
}
