import React from "react";
import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import Home from "../Screen/Home";
import Login from "../Screen/Login";
import Logout from "../Screen/Logout";
import NotFound from "../Screen/NotFound";
import Admin from "../Screen/Admin";
import Info_SPSO from "../../my-react-app/src/SPSO/Info/Info";
import Printer from "../../my-react-app/src/SPSO/Printer/Printer";
import Config from "../../my-react-app/src/SPSO/Config/Config";
import Statistic from "../../my-react-app/src/SPSO/Statistic/Statistic";
import ProtectedRoute from "./ProtectedRoute";
import History from "../../my-react-app/src/SPSO/History/History";

/// User
import User from "../Screen/User";
import IndexUser from "../Components/User/Index/Index";
import InforUser from "../Components/User/Infor";
import HistoryUser from "../Components/User/History";
import BuyPage from "../Components/User/BuyPage";
import Print from "../Components/User/Print/Print";
export default function AppRoutes() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/admin"
          element={
            <ProtectedRoute roleRequired="ADMIN">
              {" "}
              <Admin />{" "}
            </ProtectedRoute>
          }
        >
          <Route
            path="info"
            element={
              <ProtectedRoute roleRequired="ADMIN">
                {" "}
                <Info_SPSO />{" "}
              </ProtectedRoute>
            }
          />
          <Route
            path="printer"
            element={
              <ProtectedRoute roleRequired="ADMIN">
                {" "}
                <Printer />{" "}
              </ProtectedRoute>
            }
          />
          <Route
            path="config"
            element={
              <ProtectedRoute roleRequired="ADMIN">
                {" "}
                <Config />{" "}
              </ProtectedRoute>
            }
          />
          <Route
            path="history"
            element={
              <ProtectedRoute roleRequired="ADMIN">
                {" "}
                <History />{" "}
              </ProtectedRoute>
            }
          />
          <Route
            index
            path="statistic"
            element={
              <ProtectedRoute roleRequired="ADMIN">
                {" "}
                <Statistic />{" "}
              </ProtectedRoute>
            }
          />
        </Route>
        <Route
          path="/user"
          element={
            <ProtectedRoute roleRequired="USER">
              {" "}
              <User />{" "}
            </ProtectedRoute>
          }
        >
          <Route index element={<IndexUser />} />
          <Route
            path="infor"
            element={
              <ProtectedRoute roleRequired="USER">
                {" "}
                <InforUser />{" "}
              </ProtectedRoute>
            }
          />
          <Route
            path="history"
            element={
              <ProtectedRoute roleRequired="USER">
                {" "}
                <HistoryUser />{" "}
              </ProtectedRoute>
            }
          />
          <Route
            path="buypage"
            element={
              <ProtectedRoute roleRequired="USER">
                {" "}
                <BuyPage />{" "}
              </ProtectedRoute>
            }
          />
          <Route
            path="print"
            element={
              <ProtectedRoute roleRequired="USER">
                {" "}
                <Print />{" "}
              </ProtectedRoute>
            }
          />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}
