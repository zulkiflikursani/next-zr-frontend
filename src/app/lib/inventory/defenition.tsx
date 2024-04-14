import { DateTime } from "next-auth/providers/kakao";

export type Product = {
  id: number;
  company: string;
  nama: string;
  // image?: string;
  desc: string;
  kat: string;
  hjual: number;
  hbeli: number;
};

export type iKeranjangJual = {
  company: string | null | undefined;
  tanggal_transaksi: DateTime | null | undefined;
  kode_penjualan: string | null | undefined;
  product_id: string | null | undefined;
  id_customer: string | null | undefined;
  nama_product: string | undefined;
  hjual: number;
  qty: number;
  total: number;
};

export type iKeranjangBeli = {
  company: string | null | undefined;
  tanggal_transaksi: DateTime | null | undefined;
  kode_pembelian: string | null | undefined;
  product_id: string | null | undefined;
  id_customer: string | null | undefined;
  nama_product: string | undefined;
  hbeli: number;
  qty: number;
  total: number;
};
