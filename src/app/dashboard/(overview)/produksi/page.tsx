import ListProduksi from "@/app/component/produksi/ListProduksi";
import { getProduksiByDate } from "@/app/lib/produksi/data";
import React from "react";

async function page() {
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
  const listProduksi = await getProduksiByDate(formattedDate);
  return (
    <div>
      <ListProduksi
        item={
          listProduksi.data === "Produksi belum ada" ? [] : listProduksi.data
        }
      />
    </div>
  );
}

export default page;
