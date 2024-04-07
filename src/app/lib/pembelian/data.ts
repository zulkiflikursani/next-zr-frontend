import { options } from "@/app/api/auth/[...nextauth]/options";
import { getServerSession } from "next-auth";
import { cookies } from "next/headers";
import { iKeranjang, iPembelian } from "./defenition";

export async function getPembelianByDate(date: string) {
  const cookie = cookies().get("jwt");
  const session = await getServerSession(options);
  const company = session?.user.company;
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}pembelian/${date}/${company}/pembelian`,
      {
        method: "GET",
        credentials: "include",
        headers: {
          Cookie: `jwt=${cookie?.value}`,
        },
        cache: "no-store",
      }
    );
    const dataPembelian = await res.json();
    return dataPembelian;
  } catch (error) {
    console.error("error get penjualan", error);
  }
}

export async function getPembelianById(id: string) {
  const cookie = cookies().get("jwt");
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}pembelian/${id}`,
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
    await dataPenjualan.map(async (items: iPembelian) => {
      const total = await (items.qty * items.hbeli);
      keranjang.push({
        company: items.company,
        tanggal_transaksi: items.tanggal_transaksi,
        kode_pembelian: items.kode_pembelian,
        product_id: items.product_id,
        id_customer: items.id_customer,
        nama_product: items.nama_product,
        hbeli: items.hbeli,
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
