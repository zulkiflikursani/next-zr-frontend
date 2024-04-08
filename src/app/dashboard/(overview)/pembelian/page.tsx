import ListPembelian from "@/app/component/pembelian/ListPembelian";
import { getPembelianByDate } from "@/app/lib/pembelian/data";

const page = async () => {
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
  const dataPembelian = await getPembelianByDate(formattedDate);
  return (
    <div>
      <ListPembelian item={dataPembelian} />
    </div>
  );
};

export default page;
