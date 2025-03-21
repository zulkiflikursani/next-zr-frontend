"use client";
import SearchInputComponent from "@/app/component/SearchInputComponent";
import CardInventory from "@/app/component/penjualan/CardInventoryPenjualan";
import { Product } from "@/app/lib/inventory/defenition";
import { Checkout, CheckoutUpdate } from "../../../../../lib/produksi/action";
import { format } from "date-fns";

import {
  Button,
  Card,
  CardBody,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/react";

import { DateTime } from "next-auth/providers/kakao";
import React, { useEffect, useState } from "react";
import { TrashIcon } from "@heroicons/react/24/solid";
import NotificationModal from "@/app/component/NotificationModal";
import { redirect } from "next/dist/server/api-utils";
import { revalidate } from "@/app/lib/inventory/revalidate";
import { Console } from "console";
interface iUser {
  id: number;
  name: string;
  email: string;
  status: string | null;
  company: string | null;
  accessToken: string;
  refresToken: string;
}
interface iProps {
  items: Product[];
  userInfo: iUser | undefined;
  keranjang: iKeranjang[];
  kodePembelian: string;
}
interface iKeranjang {
  company: string | null | undefined;
  tanggal_transaksi: DateTime | null | undefined;
  kode_pembelian: string | null | undefined;
  product_id: string | null | undefined;
  id_customer: string | null | undefined;
  nama_product: string | undefined;
  hbeli: number;
  qty: number;
  total: number;
}
function ProductsCardEdit(props: iProps) {
  const {
    isOpen: producModal,
    onOpen: openPoroductModal,
    onClose: closeProductModal,
  } = useDisclosure();
  const {
    isOpen: confirmModalOpen,
    onOpen: openConfirmModal,
    onClose: closeConfirmModal,
  } = useDisclosure();
  const {
    isOpen: isOpenNotif,
    onOpen: openNotif,
    onClose: closeNotif,
  } = useDisclosure();
  const [dataPembelian, setDataPembelian] = useState<iKeranjang[]>(
    props.keranjang
  );
  const [totqty, setTotqty] = useState<number>(0);
  const [totalPembelian, setTotalpembelian] = useState<number>(0);
  const [query, setQuery] = useState("");
  const [messageNotif, setMessageNotif] = useState("");
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [kodePembelian, setKodePembelian] = useState(props.kodePembelian);

  const currentDate = new Date();
  function formatDate(date: Date) {
    // Format the date in Y-m-d H:i:s format
    const formattedDate = format(date, "yyyy-MM-dd HH:mm:ss");
    return formattedDate;
  }

  const formattedDate = formatDate(currentDate);
  const items: Product[] = props.items;
  const filterArray = (array: Product[]) => {
    return array.filter((el: Product) =>
      el.nama.toLowerCase().includes(query.toLowerCase())
    );
  };

  const filteredProduct: Product[] = filterArray(items);
  const handleChange = (e: any) => {
    console.log("on Search");
    setQuery(e.target.value);
  };
  useEffect(() => {
    openPoroductModal();
    setTotqty(dataPembelian.reduce((acc, curr) => acc + curr.qty, 0));
    setTotalpembelian(
      dataPembelian.reduce((acc, curr) => acc + curr.total * 1, 0)
    );
  }, [dataPembelian, openPoroductModal]);
  const handleModal = (product: Product) => {
    console.log("handle Modal");
    setDataPembelian([
      ...dataPembelian,
      {
        company: props.userInfo?.company,
        tanggal_transaksi: formattedDate,
        kode_pembelian: kodePembelian,
        product_id: product.id.toString(),
        id_customer: "",
        nama_product: product.nama,
        hbeli: product.hbeli,
        qty: 1,
        total: product.hjual,
      },
    ]);
    if (!producModal) {
      closeProductModal(); // Close modal if already open
      openPoroductModal();
    }
  };
  const handleQtyChange = (index: any, newValue: number, hbeli: number) => {
    setDataPembelian((prevData) => {
      const newData = [...prevData];
      newData[index].qty = newValue;
      newData[index].total = newValue * hbeli;
      return newData;
    });
  };
  const handleHbeliChange = (index: any, newValue: number, qty: number) => {
    setDataPembelian((prevData) => {
      const newData = [...prevData];
      newData[index].hbeli = newValue;
      newData[index].total = newValue * qty;
      return newData;
    });
  };

  const checkOutConfirm = () => {
    closeProductModal();
    if (!confirmModalOpen) {
      closeConfirmModal();
      openConfirmModal();
    }
    console.log("openConfirmModal");
    // console.log("confirm", confirm);
  };

  const onCloseConfirm = () => {
    closeConfirmModal();
  };

  const onCloseNotif = () => {
    closeNotif();
    revalidate("/dashboard/produksi", "page", true);
  };

  const checkOut = async () => {
    setIsProcessing(true);
    const { message } = await CheckoutUpdate(kodePembelian, dataPembelian);
    if (message.status === "ok") {
      setMessageNotif(message.message);
      openNotif();
      // setDataPenjualan([]);
      setIsProcessing(false);
      closeConfirmModal();
    } else {
      openNotif();
      setIsProcessing(false);
      closeConfirmModal();
      openNotif();
      setMessageNotif(message.error);
    }
  };

  const removeKeranjangProduct = async (id: string) => {
    const updateDataPenjualang: iKeranjang[] = await dataPembelian.filter(
      (obj) => obj.product_id !== id
    );
    setDataPembelian(updateDataPenjualang);
    return updateDataPenjualang;
  };
  return (
    <div>
      {/* confirm modal */}
      {!messageNotif ? (
        ""
      ) : (
        <NotificationModal
          message={messageNotif}
          isOpen={isOpenNotif}
          onClose={onCloseNotif}
        />
      )}
      {/* confirm modal */}
      <Modal size="5xl" isOpen={confirmModalOpen} onClose={onCloseConfirm}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader>
                <h1>Confirmasi</h1>
              </ModalHeader>
              <ModalBody>
                <div>Apakah anda yakin ingin melakukan check out ?</div>
              </ModalBody>
              <ModalFooter>
                <Button color="secondary" onPress={onCloseConfirm}>
                  Tidak
                </Button>
                <Button
                  color="primary"
                  onPress={checkOut}
                  isDisabled={isProcessing}
                >
                  {isProcessing ? "Processing..." : "Ya"}
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
      <div className="mb-2">
        <SearchInputComponent
          label="Search"
          placeholder="Type for serach product..."
          onChange={handleChange}
        />
      </div>

      <div className="grid  grid-cols-1 md:grid-cols-5  gap-1 z-10 overflow-scroll overflow-y-visible h-[85vh] pb-28">
        {filteredProduct.map((items) => {
          return (
            <CardInventory
              key={items.id}
              items={items}
              jenis="pembelian"
              onClick={() => handleModal(items)}
            />
          );
        })}
      </div>
      <Modal size="5xl" isOpen={producModal} onClose={closeProductModal}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader>Daftar Produksi</ModalHeader>
              <ModalBody>
                <div>
                  {dataPembelian &&
                    dataPembelian.map((items, index) => {
                      return (
                        <Card key={index} className="mb-2">
                          <CardBody>
                            <div className="grid grid-cols-10 gap-2 text-[10px] ">
                              <div className="flex flex-col col-span-5  ">
                                <div>{items.nama_product}</div>
                                <input
                                  type="number"
                                  className="bg-gray-200 rounded-lg px-2 "
                                  defaultValue={items.hbeli}
                                  onChange={(e) =>
                                    handleHbeliChange(
                                      index,
                                      parseInt(e.target.value),
                                      items.qty
                                    )
                                  }
                                />
                                {/* Rp {items.hjual} */}
                              </div>
                              <div className="flex items-center  col-span-2 space-x-1">
                                <input
                                  className="w-10"
                                  type="number"
                                  defaultValue={items.qty}
                                  onChange={(e) =>
                                    handleQtyChange(
                                      index,
                                      parseInt(e.target.value),
                                      items.hbeli
                                    )
                                  }
                                />
                              </div>
                              <div className="flex items-center col-span-2 justify-end">
                                {/* <div>Rp {items.qty * items.hjual}</div> */}
                                <div>Rp {items.total}</div>
                              </div>
                              <div
                                className="flex items-center col-span-1"
                                onClick={() =>
                                  removeKeranjangProduct(
                                    items.product_id as string
                                  )
                                }
                              >
                                <TrashIcon width={10} />
                              </div>
                            </div>
                          </CardBody>
                        </Card>
                      );
                    })}
                </div>
                <Card className="mb-2 w-full bg-primary">
                  <CardBody>
                    <div className="grid grid-cols-10 gap-2  text-gray-100 text-bold text-[12px] ">
                      <div className="flex flex-col col-span-5  ">
                        <div>{"Total"}</div>
                      </div>
                      <div className="flex items-center  col-span-2 space-x-1">
                        <div> {totqty} pcs</div>
                      </div>
                      <div className="flex items-center col-span-3 justify-end">
                        <div>Rp {totalPembelian}</div>
                      </div>
                    </div>
                  </CardBody>
                </Card>
              </ModalBody>
              <ModalFooter>
                <Button color="secondary" onPress={onClose}>
                  Close
                </Button>
                <Button color="primary" onPress={checkOutConfirm}>
                  Checkout
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
}

export default ProductsCardEdit;
