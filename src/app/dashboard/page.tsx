import { getServerSession } from "next-auth";
import { options } from "../api/auth/[...nextauth]/options";
import CardComponent from "../component/CardComponent";
import TitileComponent from "../component/TitileComponent";
import { Divider } from "@nextui-org/react";
import CardMenu from "../component/CardMenu";
import { getTotalPenjualanByDate } from "../lib/penjualan/data";
import { getTotalPembelianByDate } from "../lib/pembelian/data";

const Dashboard = async () => {
  const session = await getServerSession(options);
  const currentDate = new Date();
  // Set the timezone to Makassar, Indonesia (WITA)
  const options2: Intl.DateTimeFormatOptions = {
    timeZone: "Asia/Makassar",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    // hour: "2-digit",
    // minute: "2-digit",
    // second: "2-digit",
    // hour12: false,
  };
  const now = currentDate.toLocaleDateString("en-US", options2);

  const [month, day, year] = now.split("/").map((part) => parseInt(part));

  const formattedMonth = month < 10 ? `0${month}` : month;
  const formattedDay = day < 10 ? `0${day}` : day;

  const formattedDate = `${year}-${formattedMonth}-${formattedDay}`;

  const dataPenjualan = await getTotalPenjualanByDate(formattedDate);
  const dataPembelian = await getTotalPembelianByDate(formattedDate);

  return (
    <div>
      <div>
        {session?.user?.name ? (
          <div>
            <TitileComponent
              name={session.user.name}
              company={session.user.company as string}
              title="Dashboard"
            />
            <div className="mb-4">
              <CardComponent
                total_value={dataPenjualan.total_penjualan}
                totalQty={dataPenjualan.total_qty}
                total_pembelian={dataPembelian.total_pembelian}
              />
            </div>
            <Divider />
            <div className="grid grid-cols-2 gap-4 my-4">
              <CardMenu menu="Daftar Barang" url="/dashboard/inventory" />
              <CardMenu menu="Penjualan" url="/dashboard/penjualan" />
              <CardMenu menu="Pembelian" url="/dashboard/pembelian" />
            </div>
          </div>
        ) : (
          "session non login"
        )}
      </div>
    </div>
  );
};

export default Dashboard;
