"use client";
import React, { useEffect, useState, useMemo } from "react";
import TittlePageComponent from "../TittlePageComponent";
import SearchInputComponent from "../SearchInputComponent";
import CardListPenjualanFooter from "./CardListPenjualanFooter";
import Link from "next/link";
import { Button } from "@nextui-org/react";
import { iPenjualan } from "@/app/lib/penjualan/defenition";
import CardListPenjualan from "./CardListPenjualan";

interface iItem {
  item: iPenjualan[];
}

function ListPenjualan({ item }: iItem) {
  const [searchTerm, setSearchTerm] = useState<string>("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const { filteredData, totalQty, totalPenjualan } = useMemo(() => {
    const filtered = item.filter((item) =>
      item.nama_product.toLowerCase().includes(searchTerm.toLowerCase())
    );
    const totalQty = filtered.reduce((acc, curr) => acc + curr.qty * 1, 0);
    const totalPenjualan = filtered.reduce(
      (acc, curr) => acc + curr.qty * curr.hjual,
      0
    );

    return { filteredData: filtered, totalQty, totalPenjualan };
  }, [item, searchTerm]);

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
              placeholder="Ketik untuk mencari..."
              onChange={handleChange}
            />
          </div>
          <div className="w-4/12">
            <Link href={"/dashboard/penjualan/create"}>
              <Button className="w-full rounded-full bg-primary text-white">
                Buat
              </Button>
            </Link>
          </div>
        </div>
        <div className="flex flex-col space-y-1 mt-5 overflow-scroll overflow-y-visible h-[85vh] pb-44">
          {filteredData.map((item) => (
            <CardListPenjualan key={item.id} items={item} />
          ))}
        </div>
        <div className="fixed right-4 bottom-16 left-4 h-20 font-bold">
          <CardListPenjualanFooter
            tatalQty={totalQty}
            totalPenjualan={totalPenjualan}
          />
        </div>
      </div>
    </div>
  );
}

export default React.memo(ListPenjualan);
