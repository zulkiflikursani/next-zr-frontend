import { options } from "@/app/api/auth/[...nextauth]/options";
import { getServerSession } from "next-auth";
import { cookies } from "next/headers";
import { iKeranjang, iProduksi } from "./defenition";
import { unstable_noStore as noStore } from "next/cache";

export async function getProduksiByDate(date: string) {
  const cookie = cookies().get("jwt");
  const session = await getServerSession(options);
  const company = session?.user.company;
  noStore();
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}produksi/${date}/${company}/produksi`,
      {
        method: "GET",
        credentials: "include",
        headers: {
          Cookie: `jwt=${cookie?.value}`,
        },
        cache: "no-store",
      }
    );
    const dataProduksi = await res.json();
    if (res.status === 200) {
      return dataProduksi;
    } else {
      return dataProduksi;
    }
    // return dataProduksi;
  } catch (error) {
    console.error("error get penjualan", error);
  }
}

export async function getProduksiById(id: string) {
  const cookie = cookies().get("jwt");
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}produksi/${id}`,
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
    await dataPenjualan.data.map(async (items: iProduksi) => {
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
export async function getTotalProduksinByDate(date: string) {
  const cookie = cookies().get("jwt");
  const session = await getServerSession(options);
  const company = session?.user.company;
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}produksi/${date}/${company}/produksi/total`,
    {
      method: "GET",
      credentials: "include",
      headers: {
        Cookie: `jwt=${cookie?.value}`,
      },
      cache: "no-store",
    }
  );
  const dataProduksi = await res.json();
  return dataProduksi;
}
