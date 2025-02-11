import React from "react";
import { UserProvider } from "./context/UserContext";
import UserSearch from "./components/UserSearch";
import UserList from "./components/UserList";

const App = () => {
  return (
    <UserProvider>
      <div>
        <UserSearch />
        <UserList />
      </div>
    </UserProvider>
  );
};

export default App;
