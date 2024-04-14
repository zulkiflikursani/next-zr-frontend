import { Card, CardBody } from "@nextui-org/react";
import React from "react";
import { DeleteButton } from "../inventory/DeleteButton";
// import { EditIcon } from "../EditIcon";
import { TrashIcon, PencilIcon } from "@heroicons/react/24/solid";
import { iPenjualan } from "@/app/lib/penjualan/defenition";
import Link from "next/link";

interface iProps {
  items: iPenjualan;
}
function CardListPenjualan(props: iProps) {
  return (
    <div>
      <Card>
        <CardBody>
          <div className="flex justify-between text-[10px]">
            <div className="flex flex-col w-full">
              <div className="w-full">{props.items.tanggal_transaksi}</div>
              {/* <div className="flex ÷"> */}
              <div className="flex justify-around w-full">
                <div>{props.items.kode_penjualan}</div>
                <div>{props.items.nama_product}</div>
                <div className="min-w-[40px] text-right">
                  {props.items.qty}
                  <span> pcs</span>
                </div>
                <div className="min-w-[60px] text-right">
                  Rp.{props.items.hjual}
                </div>
                <div className="min-w-[70px] text-right">
                  <span>Rp.</span> {props.items.qty * props.items.hjual}
                </div>
              </div>
              {/* </div>÷ */}
            </div>
            <div className="flex flex-col space-y-2 ml-2">
              {/* <div className="bg-secondary p-1 rounded-md cursor-pointer hover:bg-primary focus:bg-primary">
                <TrashIcon className="w-3 " />
              </div> */}
              <Link
                href={`/dashboard/penjualan/${props.items.kode_penjualan}/edit`}
                className="bg-secondary p-1 rounded-md cursor-pointer hover:bg-primary"
              >
                <PencilIcon className="w-3" />
              </Link>
            </div>
          </div>
        </CardBody>
      </Card>
    </div>
  );
}

export default CardListPenjualan;
