import { options } from "@/app/api/auth/[...nextauth]/options";
import { getServerSession } from "next-auth";
import { cookies } from "next/headers";
import { iKeranjang, iPenjualan } from "./defenition";
import { unstable_noStore as noStore } from "next/cache";

export async function getPenjualanByDate(date: string) {
  const cookie = cookies().get("jwt");
  const session = await getServerSession(options);
  const company = session?.user.company;
  noStore();
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}penjualan/${date}/${company}/penjualan`,
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

export async function getPenjualanById(id: string) {
  const cookie = cookies().get("jwt");
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}penjualan/${id}`,
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
    let keranjang: iKeranjang[] = [];
    await dataPenjualan.map(async (items: iPenjualan) => {
      const total = await (items.qty * items.hjual);
      keranjang.push({
        company: items.company,
        tanggal_transaksi: items.tanggal_transaksi,
        kode_penjualan: items.kode_penjualan,
        product_id: items.product_id,
        id_customer: items.id_customer,
        nama_product: items.nama_product,
        hjual: items.hjual,
        qty: items.qty,
        total: total,
      });
    });
    return keranjang;
  } catch (error) {
    console.error("error get penjualan", error);
    return [];
  }
}

export async function getTotalPenjualanByDate(date: string) {
  const cookie = cookies().get("jwt");
  const session = await getServerSession(options);
  const company = session?.user.company;
  noStore();
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}penjualan/${date}/${company}/penjualan/total`,
      {
        method: "GET",
        credentials: "include",
        headers: {
          Cookie: `jwt=${cookie?.value}`,
        },
        cache: "no-store",
      }
    );
    const data = await res.json();
    return data;
  } catch (error) {
    console.error("error get penjualan", error);
  }
}
