import { options } from "@/app/api/auth/[...nextauth]/options";
import FormEditInventory from "@/app/component/inventory/FormEditInventory";

import { ProdutById } from "@/app/lib/inventory/data";
import { Product } from "@/app/lib/inventory/defenition";
import { getServerSession } from "next-auth";
import React from "react";

async function page({ params }: { params: { id: string } }) {
  const productId = params.id;
  const session = await getServerSession(options);
  const dataProduct: Product[] = await ProdutById(productId);

  return (
    <div className="">
      <FormEditInventory
        product={dataProduct[0]}
        company={session?.user.company as string}
      />
    </div>
  );
}

export default page;
