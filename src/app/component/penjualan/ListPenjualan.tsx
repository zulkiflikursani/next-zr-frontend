"use client";
import React, { useEffect, useState } from "react";
import TittlePageComponent from "../TittlePageComponent";
import SearchInputComponent from "../SearchInputComponent";
import CardListPenjualanFooter from "./CardListPenjualanFooter";
import Link from "next/link";
import { Button, Divider } from "@nextui-org/react";
import { iPenjualan } from "@/app/lib/penjualan/defenition";
import CardListPenjualan from "./CardListPenjualan";
import { array } from "zod";
import { list } from "postcss";

interface iItem {
  item: iPenjualan[];
}
function ListPenjualan(penjualan: iItem) {
  const listpenjualan: iPenjualan[] = penjualan.item;
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [filterData, setFilterData] = useState<iPenjualan[]>([]);
  const [totalQty, setTotalQty] = useState(0);
  const [totalPenjualan, setTotalPenjualan] = useState(0);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const filteredPenjualan = (array: any) => {
    return array.filter((el: iPenjualan) =>
      el.nama_product.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };
  useEffect(() => {
    const hitQtydanPenjualan = () => {
      setFilterData(() => {
        const filtered = listpenjualan.filter((item) =>
          item.nama_product.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setTotalQty(filtered.reduce((acc, curr) => acc + curr.qty, 0));
        setTotalPenjualan(filtered.reduce((acc, curr) => acc + curr.hjual, 0));
        return filtered;
      });
    };
    hitQtydanPenjualan();
  }, [listpenjualan, searchTerm]);

  return (
    <div className="flex flex-col h-[60vh] overscroll-none">
      <div className="w-full">
        <TittlePageComponent title="Penjualan" />
      </div>
      <div className="w-full h-[80vh]">
        <div className="flex items-center space-x-2">
          <div className="w-8/12">
            <SearchInputComponent
              label="Search"
              placeholder="Type to search..."
              onChange={handleChange}
            />
          </div>
          <div className="w-4/12">
            <Link href={"/dashboard/inventory/create"}>
              <Button className="w-full rounded-full bg-primary text-white">
                Create
              </Button>
            </Link>
          </div>
        </div>
        <div className="flex flex-col space-y-1 mt-5  overflow-scroll overflow-y-visible h-[85vh] pb-44">
          {filterData.map((item: iPenjualan) => (
            <CardListPenjualan key={item.id} items={item} />
          ))}
        </div>
        <div className="fixed right-4 bottom-16 left-4  h-20 font-bold  ">
          <CardListPenjualanFooter
            tatalQty={totalQty}
            totalPenjualan={totalPenjualan}
          />
        </div>
      </div>
    </div>
  );
}

export default ListPenjualan;
