import SearchInputComponent from "@/app/component/SearchInputComponent";
import TittlePageComponent from "@/app/component/TittlePageComponent";
import ListPenjualan from "@/app/component/penjualan/ListPenjualan";
import { getPenjualanById } from "@/app/lib/penjualan/data";
import React from "react";

async function penjualan() {
  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth() + 1; // Months are zero-based, so we add 1
  const day = currentDate.getDate();

  const formattedDate = `${year}-${month}-${day}`;
  const dataPenjualan = await getPenjualanById(formattedDate);
  return (
    <div className="h-[80vh]">
      <ListPenjualan item={dataPenjualan} />
    </div>
  );
}

export default penjualan;
