import { DateTime } from "next-auth/providers/kakao";

export type iProduksi = {
  id: number;
  company: string;
  tanggal_transaksi: DateTime;
  kode_pembelian: string;
  product_id: string;
  id_customer: string | null;
  nama_product: string;
  hbeli: number;
  qty: number;
  created_at: string | null;
  updated_at: string | null;
};

export type iKeranjang = {
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
