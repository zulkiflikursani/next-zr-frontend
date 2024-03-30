import { Divider } from "@nextui-org/react";
import React from "react";

function TittlePageComponent({ title }: { title: string }) {
  return (
    <div className=" md:w-10/12 md:mx-auto">
      <div>
        <h1>{title}</h1>
      </div>
      <Divider className="my-2" />
    </div>
  );
}

export default TittlePageComponent;
