import TitileComponent from "@/app/component/TitileComponent";
import TittlePageComponent from "@/app/component/TittlePageComponent";
import FormSaldo from "@/app/component/kas/FormSaldo";
import { getSaldoKas } from "@/app/lib/kas/data";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Divider,
  Input,
} from "@nextui-org/react";
import React from "react";

async function page() {
  const getSaldo = await getSaldoKas();
  const formattedSaldoValue = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
  }).format(getSaldo.saldo);
  return (
    <div>
      <TittlePageComponent title={"Setoran"} />
      <Card className="text-gray-600">
        <CardHeader>
          <div className="w-full flex justify-between">
            <h1 className="text-[16px] font-bolder">Kas </h1>
            <div>{getSaldo.tanggal_transaksi}</div>
          </div>
        </CardHeader>
        <Divider />
        <CardBody className="flex min-h-[50px] bg-yellow-500 justify-center items-center p-5">
          <p className="font-bold text-[16px]">{formattedSaldoValue}</p>
        </CardBody>
      </Card>
      <Divider className="my-2" />
      <div className="mt-2">
        <FormSaldo max={getSaldo.saldo} />
      </div>
    </div>
  );
}

export default page;
