import React from "react";
import Navbar from "../Components/Navbar/navbar";
import CustomizedTables from "../Components/Funds/mydonations";

export default function MyDonations() {
  return (
    <>
      <Navbar page="MyDonations" />
      {/* <h1>Cart</h1> */}
      <CustomizedTables />
    </>
  );
}