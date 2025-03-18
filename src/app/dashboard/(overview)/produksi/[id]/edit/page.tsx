import React from "react";
import ProductsCardEdit from "./ProductsCardEdit";
import { getPenjualanById } from "@/app/lib/penjualan/data";
import { Product } from "@/app/lib/inventory/defenition";
import { getServerSession } from "next-auth";
import { options } from "@/app/api/auth/[...nextauth]/options";
import { Products } from "@/app/lib/inventory/data";
import { DateTime } from "next-auth/providers/kakao";
import { getProduksiById } from "@/app/lib/produksi/data";
interface iKeranjang {
  company: string | null | undefined;
  tanggal_transaksi: DateTime | null | undefined;
  kode_pembelian: string | null | undefined;
  product_id: string | null | undefined;
  id_customer: string | null | undefined;
  nama_product: string | undefined;
  hbeli: number;
  qty: number;
  total: number;
}
async function page({ params }: { params: { id: string } }) {
  const dataPembelian: iKeranjang[] = await getProduksiById(params.id);
  const items: Product[] = await Products();
  const session = await getServerSession(options);

  // console.log(items);

  return (
    <div>
      <ProductsCardEdit
        items={items}
        userInfo={session?.user}
        keranjang={dataPembelian}
        kodePembelian={params.id}
      />
    </div>
  );
}

export default page;
