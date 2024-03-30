import React from "react";
interface iProps {
  name: string;
  id: string;
}
const login = ({ id, name }: iProps) => {
  return (
    <div className="flex w-screen h-screen justify-center items-center">
      <div className="flex-col space-x-3"></div>
    </div>
  );
};

export default login;
