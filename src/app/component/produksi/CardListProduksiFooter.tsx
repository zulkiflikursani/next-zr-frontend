import { Card, CardBody } from "@nextui-org/react";
interface iProps {
  tatalQty: number;
  totalProduksi: number;
}
const CardListProduksiFooter = (props: iProps) => {
  return (
    <Card className="bg-secondary">
      <CardBody>
        <div className="flex justify-between text-[10px]">
          <div className="flex flex-col w-full">
            <div className="w-full">Total Produksi</div>
            {/* <div className="flex ÷"> */}
            <div className="flex justify-around w-full">
              <p>Total</p>

              <p>{props.tatalQty} pcs</p>
              <p>Rp. {props.totalProduksi}</p>
            </div>
            {/* </div>÷ */}
          </div>
          <div className="flex flex-col space-y-2"></div>
        </div>
      </CardBody>
    </Card>
  );
};

export default CardListProduksiFooter;
