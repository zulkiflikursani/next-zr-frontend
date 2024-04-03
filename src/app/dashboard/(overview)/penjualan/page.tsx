import ListPenjualan from "@/app/component/penjualan/ListPenjualan";
import { getPenjualanByDate } from "@/app/lib/penjualan/data";
import React from "react";

async function penjualan() {
  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth() + 1; // Months are zero-based, so we add 1
  const day = currentDate.getDate();

  const formattedDate = `${year}-${month}-${day}`;
  const dataPenjualan = await getPenjualanByDate(formattedDate);
  return (
    <div className="h-[80vh]">
      <ListPenjualan item={dataPenjualan} />
    </div>
  );
}

export default penjualan;
