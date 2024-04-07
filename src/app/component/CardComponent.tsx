import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Divider,
} from "@nextui-org/react";

function CardComponent() {
  return (
    <div className="grid grid-cols-2 gap-4 text-gray-600 ">
      <Card className="text-gray-600">
        <CardHeader>
          <h1 className="text-[12px] font-bolder">Penjualan</h1>
        </CardHeader>
        <Divider />
        <CardBody className="flex min-h-[50px] bg-yellow-500 justify-center items-center p-5">
          <p className="font-bold text-[18px]">Rp. 5.000.000</p>
        </CardBody>
      </Card>
      <Card className="text-gray-600">
        <CardHeader>
          <h1 className="text-[12px] font-bolder">Pembelian</h1>
        </CardHeader>
        <Divider />
        <CardBody className="flex min-h-[50px] bg-violet-400 justify-center items-center p-5">
          <p className="font-bold text-[18px]">Rp. 4.000.000</p>
        </CardBody>
      </Card>
      <Card className="text-gray-600">
        <CardHeader>
          <h1 className="text-[12px] font-bolder">Jumlah Transaksi</h1>
        </CardHeader>
        <Divider />
        <CardBody className="flex  bg-green-500 items-center justify-center p-5">
          <p className="font-bold text-[20px]">68</p>
        </CardBody>
      </Card>
      <Card className="text-gray-600">
        <CardHeader>
          <h1 className="text-[12px] font-bolder">Pendapatan</h1>
        </CardHeader>
        <Divider />
        <CardBody className="bg-primary flex h-[60px] items-center justify-center p-5">
          <p className="font-bold text-[20px]">Rp.1.000.000</p>
        </CardBody>
      </Card>
    </div>
  );
}

export default CardComponent;
