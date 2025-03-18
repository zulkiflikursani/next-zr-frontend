"use client";
import React, { useEffect, useState } from "react";
import TittlePageComponent from "../TittlePageComponent";
import SearchInputComponent from "../SearchInputComponent";
import Link from "next/link";
import { Button, Divider } from "@nextui-org/react";
import CardListProduksi from "./CardListProduksi";
import { iPembelian } from "@/app/lib/pembelian/defenition";
import CardListProduksiFooter from "./CardListProduksiFooter";

interface iItem {
  item: iPembelian[];
}
function ListProduksi(pembelian: iItem) {
  const listProduksi: iPembelian[] = pembelian.item;
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [filterData, setFilterData] = useState<iPembelian[]>([]);
  const [totalQty, setTotalQty] = useState(0);
  const [totalPembelian, setTotalPembelian] = useState(0);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  useEffect(() => {
    const hitQtydanPembelian = () => {
      setFilterData(() => {
        const filtered = listProduksi.filter((item) =>
          item.nama_product.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setTotalQty(filtered.reduce((acc: number, curr) => acc + curr.qty, 0));
        setTotalPembelian(
          filtered.reduce((acc, curr) => acc + curr.qty * curr.hbeli, 0)
        );
        return filtered;
      });
    };
    hitQtydanPembelian();
  }, [listProduksi, searchTerm]);

  return (
    <div className="flex flex-col h-[60vh] overscroll-none">
      <div className="w-full">
        <TittlePageComponent title="Daftar Produksi" />
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
            <Link href={"/dashboard/produksi/create"}>
              <Button className="w-full rounded-full bg-primary text-white">
                Create
              </Button>
            </Link>
          </div>
        </div>
        <div className="flex flex-col space-y-1 mt-5  overflow-scroll overflow-y-visible h-[85vh] pb-44">
          {filterData.map((item: iPembelian) => (
            <CardListProduksi key={item.id} items={item} />
          ))}
        </div>
        <div className="fixed right-4 bottom-16 left-4  h-20 font-bold  ">
          <CardListProduksiFooter
            tatalQty={totalQty}
            totalProduksi={totalPembelian}
          />
        </div>
      </div>
    </div>
  );
}

export default ListProduksi;
