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
  const currentDate = new Date().toISOString().split("T")[0];
  const dataPenjualan = await getTotalPenjualanByDate(currentDate);
  const dataPembelian = await getTotalPembelianByDate(currentDate);

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
