"use client";
import CardInventory from "@/app/component/inventory/CardInventory";
import { Button, Divider } from "@nextui-org/react";
import { useState } from "react";
import { Input } from "@nextui-org/react";
import React from "react";
import { MagnifyingGlassCircleIcon } from "@heroicons/react/24/solid";
import { Product } from "@/app/lib/inventory/defenition";
import Link from "next/link";
interface iItems {
  items: Product[];
}
function Inventory(item: iItems) {
  const [query, setQuery] = useState("");
  // console.log("log item==>", item);
  // const items = items;
  const products: any = item.items;
  const searchFilter = (array: any) => {
    return array.filter((el: Product) => el.nama.toLowerCase().includes(query));
  };

  //Applying our search filter function to our array of ountries recieved from the API
  const filtered: Product[] = searchFilter(products);
  function hendleChange(e: any) {
    setQuery(e.target.value);
  }

  return (
    <div className="min-h-screen md:w-10/12 md:mx-auto pb-24">
      <div>
        <h1>Daftar Barang</h1>
      </div>
      <Divider className="my-2" />
      <div className="my-2 w-full flex items-center space-x-2">
        <div className="w-8/12">
          <Input
            label="Search"
            isClearable
            radius="lg"
            classNames={{
              label: "text-black/50 dark:text-white/90",
              input: [
                "bg-transparent",
                "text-black/90 dark:text-white/90",
                "placeholder:text-default-700/50 dark:placeholder:text-white/60",
              ],
              innerWrapper: "bg-transparent",
              inputWrapper: [
                "shadow-xl",
                "bg-default-200/50",
                "dark:bg-default/60",
                "backdrop-blur-xl",
                "backdrop-saturate-200",
                "hover:bg-default-200/70",
                "dark:hover:bg-default/70",
                "group-data-[focused=true]:bg-default-200/50",
                "dark:group-data-[focused=true]:bg-default/60",
                "!cursor-text",
              ],
            }}
            placeholder="Type to search..."
            startContent={<MagnifyingGlassCircleIcon width={20} />}
            onChange={(e) => hendleChange(e)}
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
      <div className="grid  grid-cols-2 md:grid-cols-6  gap-1 z-10">
        {filtered.map((items) => (
          <div key={items.id}>{<CardInventory items={items} />}</div>
        ))}
      </div>
    </div>
  );
}

export default Inventory;
