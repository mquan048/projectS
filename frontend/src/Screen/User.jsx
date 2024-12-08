import { React, useState } from "react";
import Nav from "../Components/User/Nav/Nav";
import { Outlet } from "react-router-dom";
import Footer from "./Footer";

/// Display # Position

export default function User() {
  return (
    <>
      <div className="bg-zinc-200 min-h-screen flex flex-col  ">
        <main className="flex-grow">
          <Nav />
          <Outlet />
        </main>
        <Footer />
      </div>
    </>
  );
}
