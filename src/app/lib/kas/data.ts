import { options } from "@/app/api/auth/[...nextauth]/options";
import { getServerSession } from "next-auth";
import { cookies } from "next/headers";
import { unstable_noStore as noStore } from "next/cache";

export async function getSaldoKas() {
  const cookie = cookies().get("jwt");
  const session = await getServerSession(options);
  const company = session?.user.company;
  noStore();
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}kas/${company}/saldo`,
      {
        method: "GET",
        credentials: "include",
        headers: {
          Cookie: `jwt=${cookie?.value}`,
        },
        cache: "no-store",
      }
    );
    if (res.status === 200) {
      const saldo = await res.json();
      return saldo;
    } else {
      const error = await res.json();
      return error;
    }
  } catch (error) {
    console.log(error);
    return error;
  }
}
