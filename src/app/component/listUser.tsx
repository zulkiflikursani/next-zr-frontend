import React from "react";

async function ListUser(user: any) {
  console.log(user);

  return (
    <div>
      <h1>list user</h1>
      <div>
        {/* {listUser.map((list: any) => {
          <li key={list.id}>{list.name}</li>;
        })} */}
      </div>
    </div>
  );
}

export default ListUser;
