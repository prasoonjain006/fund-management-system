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
import { ToastContainer, toast } from 'react-toastify';

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
  "&:nth-of-type(odd)": {},
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

export default function CustomizedTables() {
  const [funds, setFunds] = useState("");
  const [totalAmount, setTotalAmount] = useState("");
  const [withdrawnAmount, setWithdrawnAmount] = useState("");
  const [donatedAmount, setDonatedAmount] = useState("");

  const navigate = useNavigate();
  const showSuccessToast = (msg) => {
    toast.success(msg, {
        data: {
            title: 'Success toast',
            text: 'This is a success message'
        }
    });
};
const showErrorToast = (msg) => {
    toast.error(msg, {
        data: {
            title: 'Error toast',
            text: 'This is an error message'
        }
    });
};
  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/auth/checkauth`, {
        headers: {
          "Content-Type": "application/json",
          "x-access-token": cookies.get("token"),
        },
      })
      .then((res) => {
        console.log(res.data);
        if (res?.data?.user[0].isAdmin == false) {
          showErrorToast("You are not authorize to view this page");
          navigate("/home");
        } else if (res?.data?.user[0].isAdmin) {
          getAllDonations();
        }
      })
      .catch((err) => {
        console.log(err);
        cookies.set("token", "");
        navigate("/login");
      });
  }, []);

  const getAllDonations = async (e) => {
    const allFunds = await SimpleContract.methods.getAll().call();
    setFunds(allFunds);
    let totalBalance = 0;
    let totalDonation = 0;
    let totalWithdrawal = 0;
    allFunds.forEach((element) => {
      totalBalance += Number(element.amount);
      if (Number(element.amount) < 0) {
        totalWithdrawal += Number(element.amount) * -1;
      } else {
        totalDonation += Number(element.amount);
      }
    });
    setTotalAmount(totalBalance);
    setWithdrawnAmount(totalWithdrawal);
    setDonatedAmount(totalDonation);
  };

  return (
    <>
       <ToastContainer 
          position="bottom-center"
          autoClose={2000}  />
    <div className="tbh wrapper fadeInDown pt-6">
      <div className="hd">
        <p> All Transactions</p>
      </div>
      <TableContainer width="80%" component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Payee Name</StyledTableCell>
              <StyledTableCell align="center">Amount</StyledTableCell>
              <StyledTableCell align="center">Transaction - Id</StyledTableCell>
              <StyledTableCell align="center">Date</StyledTableCell>
              <StyledTableCell align="center">Message</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {funds &&
              funds.map((row) => (
                <StyledTableRow
                  bgColor={row.amount < 0 ? "#FFCCCB" : "FFFFE0"}
                  key={row.name}
                >
                  <StyledTableCell component="th" scope="row">
                    {row.name}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    ₹ {row.amount}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {row.transactionId.slice(0, 16)}
                  </StyledTableCell>
                  <StyledTableCell align="center">{row.date}</StyledTableCell>
                  <StyledTableCell align="center">
                    {row.message}
                  </StyledTableCell>
                </StyledTableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <div
        style={{
          backgroundColor: "lightblue",
          marginTop: "20px",
          padding: "10px",
          borderRadius: "12px",
        }}
      >
        <span
          style={{
            fontSize: "25px",
            color: "black",
            fontWeight: "600",
            alignSelf: "flex-end",
            margin: "30px",
          }}
        >
          {" "}
          Amount Donated : ₹ {donatedAmount}{" "}
        </span>
        <span
          style={{
            fontSize: "25px",
            color: "black",
            fontWeight: "600",
            alignSelf: "flex-end",
            margin: "30px",
          }}
        >
          {" "}
          Amount Withdrawn : ₹ {withdrawnAmount}{" "}
        </span>
        <span
          style={{
            fontSize: "25px",
            color: "black",
            fontWeight: "600",
            alignSelf: "flex-end",
            margin: "30px",
          }}
        >
          {" "}
          Balance : ₹ {totalAmount}{" "}
        </span>
      </div>
    </div>
    </>
  );
}
