import { options } from "@/app/api/auth/[...nextauth]/options";
import FormInventory from "@/app/component/inventory/FormInventory";
import { getServerSession } from "next-auth";
import React from "react";

async function page() {
  const session = await getServerSession(options);
  return (
    <div className="">
      <FormInventory company={session?.user.company as string} />
    </div>
  );
}

export default page;
