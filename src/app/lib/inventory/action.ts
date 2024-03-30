import { revalidatePath, revalidateTag } from "next/cache";
import { z } from "zod";

const FormScheme = z.object({
  id: z.string(),
  nama: z.string(),
  desc: z.string(),
  company: z.string(),
  kat: z.string(),
  hjual: z.coerce.number(),
  hbeli: z.coerce.number(),
});
const InsertProduct = FormScheme.omit({ id: true });
const UpdateProduct = FormScheme.omit({ id: true });

export type State = {
  errors?: {
    nama?: string[];
    company?: string[];
    desc?: string[];
    kat?: string[];
    hjual?: string[];
    hbeli?: string[];
  };
  message?: string | null;
};

export async function createProduct(prevState: State, formData: FormData) {
  const validateFields = InsertProduct.safeParse({
    nama: formData.get("nama"),
    company: formData.get("company"),
    kat: formData.get("kat"),
    desc: formData.get("desc"),
    hjual: formData.get("hjual"),
    hbeli: formData.get("hbeli"),
  });
  if (!validateFields.success) {
    return {
      errors: validateFields.error.flatten().fieldErrors,
      message: "Data tidak lengkap untuk menambahkan produk",
    };
  }
  const { nama, company, desc, kat, hbeli, hjual } = validateFields.data;
  try {
    const res = await fetch("/api/inventory", {
      method: "POST",
      credentials: "include",
      body: JSON.stringify({
        nama: nama,
        company: company,
        desc: desc,
        kat: kat,
        hbeli: hbeli,
        hjual: hjual,
      }),
    })
      .then(async (response) => {
        return await response.json();
      })
      .then((error) => {
        return {
          message: error,
        };
      });
    const { message } = res.message;
    // console.log("res action", message);
    return {
      message: message,
    };
  } catch (error) {
    console.error("Database Error:", error);
    return {
      message: "gagal",
    };
    throw new Error("Failed to create invoice.");
  }
}

export async function updateProduct(id: string, formData: FormData) {
  const validateFields = UpdateProduct.safeParse({
    nama: formData.get("nama"),
    company: formData.get("company"),
    kat: formData.get("kat"),
    desc: formData.get("desc"),
    hjual: formData.get("hjual"),
    hbeli: formData.get("hbeli"),
  });

  if (!validateFields.success) {
    return {
      errors: validateFields.error.flatten().fieldErrors,
      message: "Data tidak lengkap untuk menambahkan produk",
    };
  }
  const { nama, company, desc, kat, hbeli, hjual } = validateFields.data;
  try {
    const res = await fetch(`/api/inventory/${id}`, {
      method: "PUT",
      credentials: "include",
      body: JSON.stringify({
        nama: nama,
        company: company,
        desc: desc,
        kat: kat,
        hbeli: hbeli,
        hjual: hjual,
      }),
    })
      .then(async (response) => {
        return await response.json();
      })
      .catch((error) => {
        console.error(error);
        return {
          message: error,
        };
      });

    const { message } = res;
    return {
      message: message,
    };
  } catch (error) {}
}

export async function deleteProduct(id: number) {
  try {
    const res = await fetch(`../api/inventory/${id}`, {
      method: "DELETE",
      credentials: "include",
    });
    const response = await res.json();
    console.log(response);
    return {
      message: response.message,
      status: response.status,
    };
  } catch (error) {
    return {
      message: "Deleted Error " + error,
    };
  }
}
