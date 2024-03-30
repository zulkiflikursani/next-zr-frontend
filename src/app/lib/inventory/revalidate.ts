"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function revalidate(
  path: string,
  type: "layout" | "page" | undefined,
  isRedirect: boolean
) {
  revalidatePath(path, type);
  if (isRedirect) {
    redirect(path);
  }
}
