import React from "react";
// import Login from "../Components/Auth/login";
import Navbar from "../Components/Navbar/navbar";
import "../Components/Funds/funds.css"


export default function Home() {
  return (
    <>
      <Navbar page="Home" />
      <div className="home">
        Welcome to GO FUND!!
        <div className="im">
            <img src="/home.png"/>
        </div>
        
      </div>
      {/* <h1>Cart</h1> */}
      {/* <Login /> */}
    </>
  );
}