import { ArchiveBoxArrowDownIcon } from "@heroicons/react/24/solid";
import { Card, CardBody, CardHeader } from "@nextui-org/react";
import Link from "next/link";
interface iProps {
  menu: string;
  url: string;
}

function CardMenu(props: iProps) {
  return (
    <Link href={props.url}>
      <Card className="hover:bg-primary pointer-events-auto rounded-full border-1 shadow focus:bg-primary ">
        <CardBody>
          <div className="flex w-full h-full justify-center items-center space-x-3">
            <ArchiveBoxArrowDownIcon className="w-5 h-5" />
            <div>{props.menu}</div>
          </div>
        </CardBody>
      </Card>
    </Link>
  );
}
export default CardMenu;
