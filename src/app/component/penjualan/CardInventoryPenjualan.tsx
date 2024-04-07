import { Avatar, Button, Card, CardBody, Divider } from "@nextui-org/react";
import Image from "next/image";
import { Product } from "@/app/lib/inventory/defenition";

interface iProps {
  items: Product;
  jenis: "pembelian" | "penjualan";
  onClick: () => void;
}
function CardInventory(props: iProps) {
  return (
    <div>
      <Card className="rounded-tr-3xl h-full rounded-tl-none rounded-bl-3xl rounded-br-none p-0">
        <CardBody className="m-0 p-2">
          {/* <Image
            src={"/images/bg-zr.jpg"}
            alt={props.items.nama}
            width={200}
            height={100}
            className=" w-full min-h-24  bg-gray-400 rounded-tr-3xl rounded-bl-3xl"
          ></Image> */}
          <div className="flex space-x-2 ">
            <div className="w-10">
              <Avatar name="V" />
            </div>
            <div className="w-full">
              <div className="font-bolder text-[12px] text-black mt-1 ">
                {props.items.nama}
              </div>
              {/* <div className="text-gray-500 text-[10px] ">{props.items.kat}</div> */}
              <Divider className="my-1" />
              {/* <div>{props.items.kat}</div> */}
              <div className="flex text-[10px] text-black mb-2">
                <div className="w-full">
                  {props.jenis === "penjualan" ? (
                    <div> Harga: {props.items.hjual}</div>
                  ) : (
                    <div> Harga: {props.items.hbeli}</div>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="flex items-center w-full space-x-2  justify-end ">
            <Button className="text-[10px]" size="sm" onClick={props.onClick}>
              add
            </Button>
          </div>
        </CardBody>
      </Card>
    </div>
  );
}
export default CardInventory;
