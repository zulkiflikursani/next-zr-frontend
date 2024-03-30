import { Product } from "@/app/lib/inventory/defenition";
import Inventory from "./Inventory";
import { Products } from "@/app/lib/inventory/data";

async function page() {
  const dataItems: Product[] = await Products();
  return <Inventory items={dataItems} />;
}

export default page;
