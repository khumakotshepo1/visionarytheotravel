import { getUsers } from "@/server/users";
import { UsersTable } from "./_components/users-table";
import { UsersColumns, UserType } from "./_components/users-columns";

const Users = async () => {
  const users = (await getUsers()) as UserType[];

  return (
    <>
      <UsersTable columns={UsersColumns} data={users} />
    </>
  );
};

export default Users;
