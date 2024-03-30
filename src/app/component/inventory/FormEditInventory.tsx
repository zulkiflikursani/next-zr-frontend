"use client";
import { updateProduct } from "@/app/lib/inventory/action";
import { Button, Input } from "@nextui-org/react";
import React, { use, useEffect, useState } from "react";

import NotificationModal from "../NotificationModal";
import { Product } from "@/app/lib/inventory/defenition";
import { revalidate } from "@/app/lib/inventory/revalidate";

interface iProps {
  company: string;
  product?: Product;
}
function FormInventory(props: iProps) {
  const [showModal, setShowModal] = useState(false);
  const [message, setMessage] = useState("");
  const [formData, setFormData] = useState({
    nama: (props.product?.nama as string) || "",
    desc: (props.product?.desc as string) || "",
    company: props.company as string,
    kat: (props.product?.kat as string) || "",
    hjual: (props.product?.hjual as number) || 0,
    hbeli: (props.product?.hbeli as number) || 0,
  });
  // const updateProductWithId = updateProduct.bind(null, product?.id as any);

  const updateProductWithId = async () => {
    try {
      const formDataObject = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        formDataObject.append(key, value as string);
      });
      const resposnse = await updateProduct(
        props.product?.id as any,
        formDataObject
      );

      if (resposnse?.message === "success") {
        setShowModal(true);
        setMessage("Berhasil Mengupdate Data");
      }
    } catch (error) {
      setShowModal(true);
      setMessage(error as string);
    }
  };

  const hendleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  const onClose = () => {
    setShowModal(false);
    revalidate("/dashboard/inventory", "page", true);
  };
  return (
    <form action={updateProductWithId}>
      <div className="flex w-full h-10 justify-center">Input Produk</div>
      {!message ? (
        ""
      ) : (
        <NotificationModal
          message={message}
          isOpen={showModal}
          onClose={onClose}
        />
      )}
      <div className="flex flex-col flex-1 space-y-5">
        <Input
          size="sm"
          name="nama"
          type="text"
          label="Nama Product"
          value={formData?.nama}
          onChange={hendleChange}
          isRequired
        />
        {/* {state.errors?.nama} */}
        <Input
          size="sm"
          name="desc"
          type="text"
          label="Deskripsi Produk"
          value={formData?.desc}
          onChange={hendleChange}
          isRequired
        />
        {/* {state.errors?.desc} */}
        <Input
          size="sm"
          name="kat"
          type="text"
          label="Kategory"
          value={formData?.kat}
          onChange={hendleChange}
          isRequired
        />
        {/* {state.errors?.kat} */}
        <input
          name="company"
          type="text"
          hidden
          value={props.company}
          onChange={hendleChange}
        />
        {/* {state.errors?.company} */}
        <Input
          size="sm"
          name="hjual"
          type="number"
          label="Harga Jual"
          value={formData?.hjual as any}
          onChange={hendleChange}
        />
        {/* {state.errors?.hjual} */}
        <Input
          size="sm"
          name="hbeli"
          type="number"
          label="Harga Beli"
          value={formData?.hbeli as any}
          onChange={hendleChange}
        />
        {/* {state.errors?.hbeli} */}
      </div>
      <div className="mt-4 flex justify-center">
        <Button className="rounded-full focus:bg-primary" type="submit">
          Update
        </Button>
      </div>
    </form>
  );
}

export default FormInventory;
