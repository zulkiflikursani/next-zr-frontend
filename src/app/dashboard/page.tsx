import { getServerSession } from "next-auth";
import { options } from "../api/auth/[...nextauth]/options";
import CardComponent from "../component/CardComponent";
import TitileComponent from "../component/TitileComponent";
import { Divider } from "@nextui-org/react";
import CardMenu from "../component/CardMenu";

const Dashboard = async () => {
  const session = await getServerSession(options);
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
              <CardComponent />
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
