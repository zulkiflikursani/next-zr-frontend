import { DateTime } from "next-auth/providers/kakao";
import { z } from "zod";
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
  metode_bayar: string;
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
    kode_pembelian: z.string(),
    product_id: z.string(),
    id_customer: z.string().nullable(),
    nama_product: z.string(),
    hbeli: z.number(),
    qty: z.number(),
    metode_bayar: z.string(),
  })
);
export async function Checkout(request: iKeranjang[]) {
  const validate = jsonDataScame.safeParse(request);
  if (!validate.success) {
    const message = validate.error.flatten().fieldErrors;
    console.log(message);
    return message;
  }

  try {
    const res = await fetch("/api/produksi", {
      method: "POST",
      credentials: "include",
      body: JSON.stringify(request),
    });
    const response = await res.json();
    return response;
  } catch (error) {
    console.error("Post data error");
  }

  // return request;
}

export async function CheckoutUpdate(
  kodePembelian: string,
  request: iKeranjang[]
) {
  try {
    jsonDataScame.parse(request);
    try {
      const res = await fetch(`/api/produksi/${kodePembelian}`, {
        method: "PUT",
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
  } catch (error: any) {}
  return request;
}
