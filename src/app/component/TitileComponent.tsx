import { Divider } from "@nextui-org/react";
import UserInfoComponent from "./UserInfoComponent";

type Iprops = {
  name: string;
  title: string;
  company: string;
};
function TitileComponent(props: Iprops) {
  //   console.log("name-props", name);
  return (
    <div className="mb-5">
      <div className="flex flex-col w-full justify-start bg-tertiary rounded-xl p-5">
        <UserInfoComponent name={props.name} desc="user description" />
        {/* <h1>{props.name}</h1> */}
        <Divider />
        <h1>{props.company}</h1>
        <h1>{props.title}</h1>
      </div>
    </div>
  );
}

export default TitileComponent;
