import ListPembelian from "@/app/component/pembelian/ListPembelian";
import { getPembelianByDate } from "@/app/lib/pembelian/data";

const page = async () => {
  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth() + 1; // Months are zero-based, so we add 1
  const day = currentDate.getDate();

  const formattedDate = `${year}-${month}-${day}`;
  const dataPembelian = await getPembelianByDate(formattedDate);
  return (
    <div>
      <ListPembelian item={dataPembelian} />
    </div>
  );
};

export default page;
