import React, { useEffect } from "react";
import axios from "axios";
import Cookie from "js-cookie";
import { Routes, Route, useNavigate } from "react-router-dom";
// pages
import DataTable from "./OrdersTable";
import Graphs from "./Graphs";
// components
import Header from "../components/Header";

function AppRoutes() {
  const navigate = useNavigate();

  useEffect(() => {
    const token = Cookie.get("access_token");
    axios.defaults.headers.common.Authorization = `${token}`;
    if (token) {
    } else {
      navigate("login");
    }
  }, [navigate]);

  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<DataTable />} />
        <Route path="/graphs" element={<Graphs />} />
      </Routes>
    </>
  );
}

export default AppRoutes;
