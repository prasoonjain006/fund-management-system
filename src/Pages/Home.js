import React from "react";
import Navbar from "../Components/Navbar/navbar";
import "../Components/Funds/funds.css";

export default function Home() {
  return (
    <>
      <Navbar page="Home" />
      <div className="home">
        Welcome to GO FUND!!
        <div className="im">
          <img src="/home.png" />
        </div>
      </div>
    </>
  );
}
