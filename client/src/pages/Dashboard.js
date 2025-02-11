import React from "react";
import { UserProvider } from "..UserContext/context/UserContext";
import UserSearch from "..UserSearch/components/UserSearch";
import UserList from "..UserList/components/UserList";

const Dashboard = () => {
  return (
    <UserProvider>
      <div>
        <UserSearch />
        <UserList />
      </div>
    </UserProvider>
  );
};

export default Dashboard;
