import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import AddUser from "./pages/AddUser"

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/2projeto-fullstack/" element={<Dashboard />} />
        <Route path="/2projeto-fullstack/login" element={<Login />} />
        <Route path="/2projeto-fullstack/register" element={<AddUser />} />
      </Routes>
    </Router>
  );
};

export default App;
