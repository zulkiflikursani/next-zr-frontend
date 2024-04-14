import { cookies } from "next/headers";
import { unstable_noStore as noStore } from "next/cache";
import { getServerSession } from "next-auth";
import { options } from "@/app/api/auth/[...nextauth]/options";
import { Product } from "./defenition";

async function data1(fromData: FormData) {
  return <div></div>;
}
export async function ProdutById(id: string) {
  const cookie = cookies().get("jwt");
  const session = await getServerSession(options);
  const company = session?.user.company;
  noStore();
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}products/${id}/${company}/product`,
      {
        credentials: "include",
        headers: {
          Cookie: `jwt=${cookie?.value}`,
        },
      }
    );
    const items = await res.json();
    return items;
  } catch (error) {
    return new Error("Failed to fetch Product");
  }
}
export async function Products() {
  noStore();
  const cookie = cookies().get("jwt");
  const session = await getServerSession(options);
  const company = session?.user.company;
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}products/${company}/company`,
      {
        credentials: "include",
        headers: {
          Cookie: `jwt=${cookie?.value}`,
        },
        cache: "no-store",
        next: { tags: ["productTag"] },
      }
    );

    const items = await res.json();
    console.log("items", items);
    return items;
  } catch (error) {
    return new Error("Failed to fetch Product");
  }
}
export default data1;
