import ListPenjualan from "@/app/component/penjualan/ListPenjualan";
import { getPenjualanByDate } from "@/app/lib/penjualan/data";
import React from "react";

async function penjualan() {
  const currentDate = new Date();
  // Set the timezone to Makassar, Indonesia (WITA)
  const options: Intl.DateTimeFormatOptions = {
    timeZone: "Asia/Makassar",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    // hour: "2-digit",
    // minute: "2-digit",
    // second: "2-digit",
    // hour12: false,
  };
  const formattedDate = currentDate.toLocaleDateString("en-US", options);
  // const year = currentDate.getFullYear();
  // const month = currentDate.getMonth() + 1; // Months are zero-based, so we add 1
  // const day = currentDate.getDate();

  // const formattedDate = `${year}-${month}-${day}`;
  const dataPenjualan = await getPenjualanByDate(formattedDate);
  return (
    <div className="h-[80vh]">
      <ListPenjualan item={dataPenjualan} />
    </div>
  );
}

export default penjualan;
