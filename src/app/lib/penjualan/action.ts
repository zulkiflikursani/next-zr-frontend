import { DateTime } from "next-auth/providers/kakao";
import { iPenjualan } from "./defenition";
import { z } from "zod";
interface iKeranjang {
  company: string | null | undefined;
  tanggal_transaksi: DateTime | null | undefined;
  kode_penjualan: string | null | undefined;
  product_id: string | null | undefined;
  id_customer: string | null | undefined;
  nama_product: string | undefined;
  hjual: number;
  qty: number;
  total: number;
}

const jsonDataScame = z.array(
  z.object({
    company: z.string(),
    tanggal_transaksi: z.string().refine(
      (value) => {
        // Regular expression to match the format "YYYY-MM-DD HH:MM:SS"
        const regex = /^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/;
        return regex.test(value);
      },
      {
        message:
          "Tanggal transaksi format. Expected format: YYYY-MM-DD HH:MM:SS",
      }
    ),
    kode_penjualan: z.string(),
    product_id: z.string(),
    id_customer: z.string().nullable(),
    nama_product: z.string(),
    hjual: z.number(),
    qty: z.number(),
  })
);
export async function Checkout(request: iKeranjang[]) {
  console.log(request);
  const validate = jsonDataScame.safeParse(request);
  if (!validate.success) {
    const errors: string[] = validate.error.errors.map((item) => item.message);
    const allerror = errors.join("\n");

    return {
      status: "gagal",
      message: "Invalid data format:\n" + allerror,
    };
  }
  try {
    const res = await fetch("/api/penjualan", {
      method: "POST",
      credentials: "include",
      body: JSON.stringify(request),
    });
    const response = await res.json();
    return response;
  } catch (error) {
    console.error("Post data error");
    //   return {
    //     error: error,
    //   };
  }
}

export async function CheckoutUpdate(
  kodePenjualan: string,
  request: iKeranjang[]
) {
  const validate = jsonDataScame.safeParse(request);
  if (!validate.success) {
    const errors: string[] = validate.error.errors.map((item) => item.message);
    const allerror = errors.join("\n");

    return {
      status: "gagal",
      message: "Invalid data format:\n" + allerror,
    };
  }
  try {
    const res = await fetch(`/api/penjualan/${kodePenjualan}`, {
      method: "PUT",
      credentials: "include",
      body: JSON.stringify(request),
    });
    const response = await res.json();
    return response;
  } catch (error) {
    console.error("Post data error");
  }
}
