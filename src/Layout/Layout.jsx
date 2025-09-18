import React from "react";

import { Outlet } from "react-router";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";

const LayOut = () => {
  return (
    <div>
      <header>
        <Navbar></Navbar>
      </header>
      <main className="min-h-[calc(100vh-138px)]">
        <Outlet></Outlet>
      </main>
      <footer>
        <Footer> </Footer>
      </footer>
    </div>
  );
};

export default LayOut;
