import { Link } from "react-router-dom";
import Nav from "../Components/Home/Nav";
import Body_LandingPage from "../Components/Home/Body";
import React from "react";
import Footer from "./Footer";
export default function Home() {
  return (
    <>
      <Nav />
      <Body_LandingPage />
      <Footer />
    </>
  );
}
