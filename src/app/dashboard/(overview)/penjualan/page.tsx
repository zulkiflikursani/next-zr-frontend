import ListPenjualan from "@/app/component/penjualan/ListPenjualan";
import { iKeranjangJual } from "@/app/lib/inventory/defenition";
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
  const now = currentDate.toLocaleDateString("en-US", options);

  const [month, day, year] = now.split("/").map((part) => parseInt(part));

  const formattedMonth = month < 10 ? `0${month}` : month;
  const formattedDay = day < 10 ? `0${day}` : day;

  const formattedDate = `${year}-${formattedMonth}-${formattedDay}`;

  const dataPenjualan: [] = await getPenjualanByDate(formattedDate);
  return (
    <div className="h-[80vh]">
      <ListPenjualan item={dataPenjualan} />
    </div>
  );
}

export default penjualan;
