import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Divider,
} from "@nextui-org/react";
import { getTotalPenjualanByDate } from "../lib/penjualan/data";
interface iProps {
  total_value: number;
  totalQty: number;
  total_pembelian: number;
}
function CardComponent(props: iProps) {
  const formattedTotalValue = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
  }).format(props.total_value);
  const formattedTotalPembelian = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
  }).format(props.total_pembelian);
  const sisakas = props.total_value - props.total_pembelian;
  const formattedSisaKas = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
  }).format(sisakas);
  return (
    <div className="grid grid-cols-2 gap-4 text-gray-600 ">
      <Card className="text-gray-600">
        <CardHeader>
          <h1 className="text-[12px] font-bolder">Penjualan</h1>
        </CardHeader>
        <Divider />
        <CardBody className="flex min-h-[50px] bg-yellow-500 justify-center items-center p-5">
          <p className="font-bold text-[18px]">{formattedTotalValue}</p>
        </CardBody>
      </Card>
      <Card className="text-gray-600">
        <CardHeader>
          <h1 className="text-[12px] font-bolder">Pembelian</h1>
        </CardHeader>
        <Divider />
        <CardBody className="flex min-h-[50px] bg-violet-400 justify-center items-center p-5">
          <p className="font-bold text-[18px]">{formattedTotalPembelian}</p>
        </CardBody>
      </Card>
      <Card className="text-gray-600">
        <CardHeader>
          <h1 className="text-[12px] font-bolder">Jumlah Transaksi</h1>
        </CardHeader>
        <Divider />
        <CardBody className="flex  bg-green-500 items-center justify-center p-5">
          <p className="font-bold text-[20px]">{props.totalQty}</p>
        </CardBody>
      </Card>
      <Card className="text-gray-600">
        <CardHeader>
          <h1 className="text-[12px] font-bolder">Kas</h1>
        </CardHeader>
        <Divider />
        <CardBody className="bg-primary flex h-[60px] items-center justify-center p-5">
          <p className="font-bold text-[20px]">{formattedSisaKas}</p>
        </CardBody>
      </Card>
    </div>
  );
}

export default CardComponent;
