import { DateTime } from "next-auth/providers/kakao";

export type iPenjualan = {
  id: number;
  company: string;
  tanggal_transaksi: DateTime;
  kode_penjualan: string;
  product_id: string;
  id_customer: string | null;
  nama_product: string;
  hjual: number;
  qty: number;
  created_at: string | null;
  updated_at: string | null;
};
