"use client";
import { createProduct } from "@/app/lib/inventory/action";
import { Button, Input, Snippet } from "@nextui-org/react";
import React, { use, useEffect, useState } from "react";
import { useFormState } from "react-dom";

import NotificationModal from "../NotificationModal";
import { revalidate } from "@/app/lib/inventory/revalidate";

interface iProps {
  company: string;
}
function FormInventory(props: iProps) {
  const initialState = { message: "", error: {} };
  const [state, dispatch] = useFormState(createProduct, initialState);
  const [showModal, setshowModal] = useState(false);
  const [formData, setformData] = useState({
    nama: "",
    kat: "",
    desc: "",
    hjual: "",
    hbeli: "",
  });

  useEffect(() => {
    if (state.message === "Berhasil Menyimpan Product") {
      setshowModal(true);
      setformData({
        nama: "",
        kat: "",
        desc: "",
        hjual: "",
        hbeli: "",
      });
    }
  }, [state]);

  const hendleChange = (e: any) => {
    const { name, value } = e.target;
    setformData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const onClose = () => {
    setshowModal(false);
    revalidate("/dashboard/inventory", "page", true);
  };
  return (
    <form action={dispatch}>
      <div className="flex w-full h-10 justify-center">Input Produk</div>
      {!state?.message ? (
        ""
      ) : (
        <NotificationModal
          message={state?.message}
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
          value={formData.nama}
          onChange={hendleChange}
          isRequired
        />
        {state.errors?.nama}
        <Input
          size="sm"
          name="desc"
          type="text"
          label="Deskripsi Produk"
          value={formData.desc}
          onChange={hendleChange}
          isRequired
        />
        {state.errors?.desc}
        <Input
          size="sm"
          name="kat"
          type="text"
          label="Kategory"
          value={formData.kat}
          onChange={hendleChange}
          isRequired
        />
        {state.errors?.kat}
        <input
          name="company"
          type="text"
          hidden
          value={props.company}
          onChange={hendleChange}
        />
        {state.errors?.company}
        <Input
          size="sm"
          name="hjual"
          value={formData.hjual}
          type="number"
          label="Harga Jual"
          onChange={hendleChange}
        />
        {state.errors?.hjual}
        <Input
          size="sm"
          name="hbeli"
          value={formData.hbeli}
          type="number"
          label="Harga Beli"
          onChange={hendleChange}
        />
        {state.errors?.hbeli}
      </div>
      <div className="mt-4 flex justify-center">
        <Button className="rounded-full focus:bg-primary" type="submit">
          Simpan
        </Button>
      </div>
    </form>
  );
}

export default FormInventory;
