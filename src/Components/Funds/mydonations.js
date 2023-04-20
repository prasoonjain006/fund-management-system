import * as React from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import "./funds.css";

import { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "universal-cookie";
import { useNavigate } from "react-router-dom";

import Web3 from "web3";
import { simpleStorageAbi } from "../../Utils/abis";
import { contractAddress } from "../../Utils/db";

const cookies = new Cookies();

const web3 = new Web3(Web3.givenProvider);
const contractAddr = contractAddress;
const SimpleContract = new web3.eth.Contract(simpleStorageAbi, contractAddr);

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

export default function CustomizedTables() {
  const [funds, setFunds] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/auth/checkauth`, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          "x-access-token": cookies.get("token"),
        },
      })
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
        cookies.set("token", "");
        navigate("/login");
      });
    getMyDonations();
  }, []);

  const getMyDonations = async (e) => {
    const userId = cookies.get("id");
    // const result = await SimpleContract.methods.getAll().call();
    const myDonation = await SimpleContract.methods.getMyFunds(userId).call();
    setFunds(myDonation);
  };

  return (
    <div className="tbh tbh wrapper fadeInDown pt-6">
      <div className="hd">
        <p> My Donations</p>
      </div>
      <TableContainer width="80%" component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Amount</StyledTableCell>
              <StyledTableCell align="center">Transaction - Id</StyledTableCell>
              <StyledTableCell align="center">Date</StyledTableCell>
              <StyledTableCell align="center">Mode of Payment</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {funds &&
              funds.map((row) => (
                <StyledTableRow bgColor={row.amount < 0 ? "#FFCCCB" : "FFFFE0"}  key={row._id}>
                  <StyledTableCell component="th" scope="row">
                  ₹ {row.amount}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {row.transactionId?.slice(0,16)}
                  </StyledTableCell>
                  <StyledTableCell align="center">{row.date}</StyledTableCell>
                  <StyledTableCell align="center">
                    {row.mode_of_payment}
                  </StyledTableCell>
                </StyledTableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
