import { Card, CardBody } from "@nextui-org/react";
import React from "react";
import { DeleteButton } from "../inventory/DeleteButton";
// import { EditIcon } from "../EditIcon";
import { TrashIcon, PencilIcon } from "@heroicons/react/24/solid";
import Link from "next/link";
import { iPembelian } from "@/app/lib/pembelian/defenition";

interface iProps {
  items: iPembelian;
}
function CardListProduksi(props: iProps) {
  return (
    <div>
      <Card>
        <CardBody>
          <div className="flex justify-between text-[10px]">
            <div className="flex flex-col w-full">
              <div className="w-full">{props.items.tanggal_transaksi}</div>
              {/* <div className="flex ÷"> */}
              <div className="flex justify-around w-full">
                <div>{props.items.kode_pembelian}</div>
                <div>{props.items.nama_product}</div>
                <div className="min-w-[40px] text-right">
                  {props.items.qty} pcs
                </div>
                <div className="min-w-[60px] text-right">
                  Rp.{props.items.hbeli}
                </div>
                <div className="min-w-[70px] text-right">
                  Rp. {props.items.qty * props.items.hbeli}
                </div>
              </div>
              {/* </div>÷ */}
            </div>
            <div className="flex flex-col space-y-2 ml-2">
              {/* <div className="bg-secondary p-1 rounded-md cursor-pointer hover:bg-primary focus:bg-primary">
                <TrashIcon className="w-3 " />
              </div> */}
              <Link
                href={`/dashboard/produksi/${props.items.kode_pembelian}/edit`}
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

export default CardListProduksi;
