import React from "react";
import Donate from "../Components/Funds/donatefunds";
import Navbar from "../Components/Navbar/navbar";


export default function DonateFunds() {
  return (
    <>
      <Navbar page="DonateFunds" />
      {/* <h1>Cart</h1> */}
      <Donate />
    </>
  );
}