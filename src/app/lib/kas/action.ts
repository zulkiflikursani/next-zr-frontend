import { options } from "@/app/api/auth/[...nextauth]/options";
import { getServerSession } from "next-auth";
import { number, z } from "zod";
const schema = number().min(100000).max(10000000); // Example: String length between 3 and 20 characters

export async function setorKas(saldo: number) {
  const validateResult = schema.safeParse(saldo);
  if (!validateResult.success) {
    const errorMessage = validateResult.error.errors[0].message;
    return {
      message: errorMessage,
    };
  } else {
    try {
      const data = {
        saldo: saldo,
      };
      const res = await fetch(`/api/kas`, {
        method: "POST",
        credentials: "include",
        body: JSON.stringify(data),
      });
      if (res.status === 200) {
        return await res.json();
      } else {
        return await res.json();
      }
    } catch (error) {
      console.error(error);
      return error;
    }
  }
}
