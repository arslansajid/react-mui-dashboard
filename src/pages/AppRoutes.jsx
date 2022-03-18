import React, { useEffect, useState } from "react";
import axios from "axios";
import Cookie from "js-cookie";
import { Routes, Route, useNavigate } from "react-router-dom";
// pages
import DataTable from "./OrdersTable";
import Graphs from "./Graphs";
// components
import Header from "../components/Header";

import { fetchOrders } from "../helpers/api";

const AppRoutes = () => {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);

  const getOrders = () => {
    fetchOrders()
      .then((res) => {
        setOrders(res.items);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    const token = Cookie.get("access_token");
    axios.defaults.headers.common.Authorization = `${token}`;
    if (token) {
      getOrders();
    } else {
      navigate("login");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Header />
      <Routes>
        <Route
          path="/"
          element={<DataTable orders={orders} reloadOrders={getOrders} />}
        />
        <Route path="/graphs" element={<Graphs orders={orders} />} />
      </Routes>
    </>
  );
};

export default AppRoutes;
