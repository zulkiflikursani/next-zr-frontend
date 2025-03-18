import ListSaldoInventori from "@/app/component/saldoinventory/ListSaldoInventori";
import { getStokAwal } from "@/app/lib/stokawal/data";
import React from "react";

async function page() {
  const currentDate = new Date();
  const option: Intl.DateTimeFormatOptions = {
    timeZone: "Asia/Makassar",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  };

  const now = currentDate.toLocaleDateString("en-US", option);

  const [month, day, year] = now.split("/").map((part) => parseInt(part));

  const stokAwal = await getStokAwal(month.toString(), year.toString());
  console.log(`${month}/${year}`, stokAwal);
  return (
    <div>
      <ListSaldoInventori />
    </div>
  );
}

export default page;
