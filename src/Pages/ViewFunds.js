import React from "react";
import Navbar from "../Components/Navbar/navbar";
import CustomizedTables from "../Components/Funds/viewfunds";

export default function ViewFunds() {
  return (
    <>
      <Navbar />
      {/* <h1>Cart</h1> */}
      <CustomizedTables />
    </>
  );
}