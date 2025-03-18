"use client";
import SearchInputComponent from "@/app/component/SearchInputComponent";
import CardInventory from "@/app/component/penjualan/CardInventoryPenjualan";
import { Product, iKeranjangJual } from "@/app/lib/inventory/defenition";
import { CheckoutUpdate } from "../../../../../lib/penjualan/action";
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
  Select,
  SelectItem,
  useDisclosure,
} from "@nextui-org/react";

import React, { useEffect, useState } from "react";
import { TrashIcon } from "@heroicons/react/24/solid";
import NotificationModal from "@/app/component/NotificationModal";

import { revalidate } from "@/app/lib/inventory/revalidate";
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
  keranjang: iKeranjangJual[];
  kodePenjualan: string;
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
  const [dataPenjualan, setDataPenjualan] = useState<iKeranjangJual[]>(
    props.keranjang
  );
  const [totqty, setTotqty] = useState<number>(0);
  const [totalpenjualan, setTotalpenjualan] = useState<number>(0);
  const [query, setQuery] = useState("");
  const [messageNotif, setMessageNotif] = useState("");

  const [kodePenjualan, setKodePenjualan] = useState(props.kodePenjualan);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [methodBayar, setMethodBayar] = useState(
    dataPenjualan[0]?.metode_bayar
  );
  const [methodError, setMethodError] = useState("");
  const methode_bayar_items = [
    {
      value: "1",
      label: "Tunai",
    },
    {
      value: "2",
      label: "Non tunai",
    },
  ];

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
    setTotqty(dataPenjualan.reduce((acc, curr) => acc + curr.qty * 1, 0));
    setTotalpenjualan(
      dataPenjualan.reduce((acc, curr) => acc + curr.total * 1, 0)
    );
  }, [dataPenjualan, openPoroductModal]);
  const handleModal = (product: Product) => {
    console.log("handle Modal");
    setDataPenjualan([
      ...dataPenjualan,
      {
        company: props.userInfo?.company,
        tanggal_transaksi: formattedDate,
        kode_penjualan: kodePenjualan,
        product_id: product.id.toString(),
        id_customer: "",
        nama_product: product.nama,
        hjual: product.hjual,
        qty: 1,
        total: product.hjual,
        metode_bayar: methodBayar,
      },
    ]);
    if (!producModal) {
      closeProductModal(); // Close modal if already open
      openPoroductModal();
    }
  };
  const handleQtyChange = (index: any, newValue: number, hjual: number) => {
    setDataPenjualan((prevData) => {
      const newData = [...prevData];
      newData[index].qty = newValue;
      newData[index].total = newValue * hjual;
      return newData;
    });
  };

  const handleHjualChange = (index: any, newValue: number, qty: number) => {
    setDataPenjualan((prevData) => {
      const newData = [...prevData];
      newData[index].hjual = newValue;
      newData[index].total = newValue * qty;
      return newData;
    });
  };

  const checkOutConfirm = () => {
    if (methodBayar === "") {
      setMethodError("Silahkan isi metode pembayaran");
    } else {
      closeProductModal();
      if (!confirmModalOpen) {
        console.log(dataPenjualan);
        closeConfirmModal();
        openConfirmModal();
      }
    }
  };

  const onCloseConfirm = () => {
    closeConfirmModal();
  };

  const onCloseNotif = () => {
    closeNotif();
    revalidate("/dashboard/penjualan", "page", true);
  };

  const checkOut = async () => {
    setIsProcessing(true);
    const message = await CheckoutUpdate(kodePenjualan, dataPenjualan);
    console.log(message);

    if (message.status === "ok") {
      setMessageNotif(message.message);
      openNotif();
      // setDataPenjualan([]);
      closeConfirmModal();
      setIsProcessing(false);
    } else {
      openNotif();
      closeConfirmModal();
      setIsProcessing(false);

      openNotif();
      setMessageNotif(message.message);
    }
  };

  const handleMethodBayar = async (e: any) => {
    setMethodError("");
    const newMethodBayar = e.target.value;
    setMethodBayar(newMethodBayar);
    setDataPenjualan((prevData: iKeranjangJual[]) => {
      const updateData = prevData.map((item: iKeranjangJual) => ({
        ...item,
        metode_bayar: newMethodBayar,
      }));
      return updateData;
    });
  };
  const removeKeranjangProduct = async (id: string) => {
    const updateDataPenjualang: iKeranjangJual[] = await dataPenjualan.filter(
      (obj) => obj.product_id !== id
    );
    setDataPenjualan(updateDataPenjualang);
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
              jenis="penjualan"
              onClick={() => handleModal(items)}
            />
          );
        })}
      </div>
      <Modal size="5xl" isOpen={producModal} onClose={closeProductModal}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader>Daftar Penjualan</ModalHeader>
              <ModalBody>
                <div>
                  {dataPenjualan &&
                    dataPenjualan.map((items, index) => {
                      return (
                        <Card key={index} className="mb-2">
                          <CardBody>
                            <div className="grid grid-cols-10 gap-2 text-[10px] ">
                              <div className="flex flex-col col-span-5  ">
                                <div>{items.nama_product}</div>
                                <input
                                  type="number"
                                  className="bg-gray-200 rounded-lg px-2 "
                                  defaultValue={items.hjual}
                                  onChange={(e) =>
                                    handleHjualChange(
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
                                      items.hjual
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
                        <div>Rp {totalpenjualan}</div>
                      </div>
                    </div>
                  </CardBody>
                </Card>
              </ModalBody>
              <ModalFooter>
                <div className="min-w-40 flex flex-col">
                  {methodError ? (
                    <p className="text-red-400 text-[10px]">{methodError}</p>
                  ) : (
                    ""
                  )}
                  <Select
                    size="sm"
                    label="Metode pembayaran"
                    placeholder="Pilih metode"
                    className="max-w-xs"
                    name="method_bayar"
                    defaultSelectedKeys={[methodBayar]}
                    selectedKeys={methodBayar}
                    onChange={handleMethodBayar}
                  >
                    {methode_bayar_items.map((item) => (
                      <SelectItem key={item.value} value={item.value}>
                        {item.label}
                      </SelectItem>
                    ))}
                  </Select>
                </div>
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
