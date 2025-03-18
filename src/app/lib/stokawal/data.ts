import { options } from "@/app/api/auth/[...nextauth]/options";
import { getServerSession } from "next-auth";
import { cookies } from "next/headers";
import { unstable_noStore as noStore } from "next/cache";
import { Nosifer } from "next/font/google";

export async function getStokAwal(month: string, year: string) {
  const cookie = cookies().get("jwt");
  const session = await getServerSession(options);
  const company = session?.user.company;
  noStore();
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}stokawal/${month}/${year}/${company}`,
      {
        method: "GET",
        credentials: "include",
        headers: {
          Cookie: `jwt=${cookie?.value}`,
        },
        cache: "no-cache",
      }
    );
    const dataStokAwal = await res.json();
    if (res.status === 200) {
      return dataStokAwal;
    } else {
      return dataStokAwal;
    }
  } catch (error) {
    console.error("gagal mengambil data stok awal");
  }
}
