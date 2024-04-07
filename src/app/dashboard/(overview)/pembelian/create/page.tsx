import TittlePageComponent from "@/app/component/TittlePageComponent";
import CardInventory from "@/app/component/penjualan/CardInventoryPenjualan";
import React from "react";
import ProductsCard from "./ProductsCard";
import { Products } from "@/app/lib/inventory/data";
import { Product } from "@/app/lib/inventory/defenition";
import { getServerSession } from "next-auth";
import { options } from "@/app/api/auth/[...nextauth]/options";

const page = async () => {
  const dataItems: Product[] = await Products();
  const session = await getServerSession(options);

  return (
    <div>
      <TittlePageComponent title={"Input Pembelian"} />
      <ProductsCard items={dataItems} userInfo={session?.user} />
    </div>
  );
};

export default page;
