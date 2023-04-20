import React from "react";
import { Link } from "react-router-dom";
import "../Auth/Auth.css";
import axios from "axios";
import Cookies from "universal-cookie";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Web3 from "web3";
import { simpleStorageAbi } from "../../Utils/abis";
import Navbar from "../Navbar/navbar";
import { contractAddress } from "../../Utils/db";

export default function UtilizeFunds() {
  const [amount, setAmount] = useState("");
  const [message, setMessage] = useState("");
  const [name, setName] = useState("");
  const [mode_of_payment, setModeOfPayment] = useState("");
  const [funds, setFunds] = useState("");
  const [totalAmount, setTotalAmount] = useState("");
  const [withdrawnAmount, setWithdrawnAmount] = useState("")
  const [donatedAmount, setDonatedAmount] = useState("")
  const cookies = new Cookies();
  const navigate = useNavigate();

  const web3 = new Web3(Web3.givenProvider);

  const contractAddr = contractAddress;
  const SimpleContract = new web3.eth.Contract(simpleStorageAbi, contractAddr);
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
  const handleSubmitByBlockchain = async (e) => {
    const accounts = await window.ethereum.enable();
    const account = accounts[0];
    const userId = cookies.get("id");
    const date = new Date().toDateString();
 
    console.log(date);
    console.log(amount);
    let reg = /^\d+$/;
    let isValid = reg.test(amount);
    if (!isValid || amount === 0) {
      showErrorToast("Please enter a valid amount");
      return false;
    }
    let amountToWithdraw = amount;

    amountToWithdraw = "-" + amount;
    console.log(amountToWithdraw);
    const gas = await SimpleContract.methods
      .registerFunds(
        name,
        amountToWithdraw,
        mode_of_payment,
        date,
        message,
        userId
      )
      .estimateGas();

    const result = await SimpleContract.methods
      .registerFunds(
        name,
        amountToWithdraw,
        mode_of_payment,
        date,
        message,
        userId
      )
      .send({
        from: account,
        gas: 10 * gas,
      });

    console.log(amountToWithdraw);

    console.log(result);
    // const transactionDetail = await web3.eth.getTransaction(result.transactionHash);
    if (result) {
      showSuccessToast(
        `Successfully added the transaction in blockchain with \n  transactionHash = ${result.transactionHash} \n blockNumber = ${result.blockNumber} `
      );
    }
    console.log(result);
  };

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/auth/checkauth`, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          "x-access-token": cookies.get("token"),
        },
      })
      .then((res) => {
        if (res?.data?.user[0].isAdmin == false) {
          showErrorToast("You are not authorize to view this page");
          navigate("/home");
        }
        getAllDonations();
        
      })
      .catch((err) => {
        console.log(err);
        cookies.set("token", "");
        navigate("/login");
      });
  }, []);

  const getAllDonations = async (e) => {
    const allFunds = await SimpleContract.methods.getAll().call();
    let totalBalance = 0;
    let totalDonation = 0;
    let totalWithdrawal = 0;
    allFunds.forEach(element => {
      totalBalance += Number(element.amount);
      if(Number(element.amount) < 0){
        totalWithdrawal += (Number(element.amount)*-1);
      }
      else{
        totalDonation += Number(element.amount);
      }
    });
    setTotalAmount(totalBalance);
    setWithdrawnAmount(totalWithdrawal);
    setDonatedAmount(totalDonation);
  };

  function Updatesubmit(e) {
    if(amount > totalAmount){
      showErrorToast("Cannot withdraw more than balance amount")
      return false;
    }
    e.preventDefault();
    handleSubmitByBlockchain();
  }

  return (
    <>
      <ToastContainer 
          position="bottom-center"
          autoClose={2000}  />
      <Navbar page="withdraw" />
      <div className="wrapper fadeInDown pt-6">
        <div id="formContent">
          {/* Tabs Titles */}
          <h2 className="active" style={{ fontSize: "30px" }}>
            {" "}
            Enter a amount to withdraw{" "}
          </h2>

          {/* <Link to="/signup">
          <h2 className="inactive underlineHover">Sign Up </h2> */}
          {/* </Link> */}
          {/* Icon */}
          <div className="fadeIn first">
            {/* <img src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse4.mm.bing.net%2Fth%3Fid%3DOIP.uwzHgxlvqbIRmGT_kOtXAgHaFj%26pid%3DApi&f=1" id="icon" alt="User Icon" /> */}
          </div>
          {/* Login Form */}
          <form>
            <input
              onChange={(e) => setName(e.target.value)}
              type="text"
              id="login"
              className="fadeIn second mt-4"
              name="login"
              placeholder="Enter your Name"
            />
            <input
              onChange={(e) => setAmount(e.target.value)}
              type="text"
              id="login"
              className="fadeIn third mt-4"
              name="login"
              placeholder="Enter Amount"
            />
            <select
              onChange={(e) => setModeOfPayment(e.target.value)}
              type="text"
              area="pra"
              id="login"
              className="fadeIn third mt-4"
              name="login"
              // placeholder="Message"
            >
              <option value="upi">UPI</option>
              <option value="credit">Credit/Debit Card</option>
              <option value="wallet">Wallet(Paytm, PhonPe)</option>
            </select>
            <input
              onChange={(e) => setMessage(e.target.value)}
              type="text"
              area="pra"
              id="login"
              className="fadeIn third mt-4"
              name="login"
              placeholder="Message"
            />
            <button
              onClick={Updatesubmit}
              className="fadeIn fourth loginBtn mt-4"
            >
              {" "}
              Submit
            </button>
          </form>
          {/* Remind Passowrd */}
        </div>
        <div style={{backgroundColor:"lightblue", marginTop:"20px", padding:"10px", borderRadius:"12px"}} >
      <span style={{fontSize:"25px", color:"black", fontWeight:"600", alignSelf:"flex-end", margin:"30px"}} > Amount Donated : ₹ {donatedAmount} </span>
      <span style={{fontSize:"25px", color:"black", fontWeight:"600", alignSelf:"flex-end", margin:"30px"}} > Amount Withdrawn : ₹ {withdrawnAmount} </span>
      <span style={{fontSize:"25px", color:"black", fontWeight:"600", alignSelf:"flex-end", margin:"30px"}} > Balance : ₹ {totalAmount} </span>
    </div>
      </div>
     
    </>
  );
}
