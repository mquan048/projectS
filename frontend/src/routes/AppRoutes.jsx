import React from "react";
import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import Home from "../Screen/Home";
import Login from "../Screen/Login";
import Logout from "../Screen/Logout";
import NotFound from "../Screen/NotFound";
import Admin from "../Screen/Admin";
import User from "../Screen/User";
import Info_SPSO from "../../my-react-app/src/SPSO/Info/Info";
import Printer from "../../my-react-app/src/SPSO/Printer/Printer";
import Config from "../../my-react-app/src/SPSO/Config/Config";
import Statistic from "../../my-react-app/src/SPSO/Statistic/Statistic";
import ProtectedRoute from "./ProtectedRoute";
import History from "../../my-react-app/src/SPSO/History/History"
export default function AppRoutes() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/admin" element={<ProtectedRoute roleRequired="SPSO"> <Admin/></ProtectedRoute>}>
          <Route path="info" element={<Info_SPSO/>}/>
          <Route path="printer" element={<Printer />} />
          <Route path="config" element={<Config />} />
          <Route path="history" element={<History />} />
          <Route index path="statistic" element={<Statistic />} />
         

        </Route>
        <Route path="/user" element={<User />}></Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}
