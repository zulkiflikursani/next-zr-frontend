import { User } from "@nextui-org/react";
interface iProps {
  name: string;
  desc?: string;
  image?: string;
}
function UserInfoComponent(props: iProps) {
  return (
    <div className="mb-5">
      <User
        name={props.name}
        description={props.desc}
        avatarProps={{
          src: `${props.image}`,
        }}
      />
    </div>
  );
}

export default UserInfoComponent;
