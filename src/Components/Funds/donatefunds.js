import React from "react";
import { Link } from "react-router-dom";
import "../Auth/Auth.css";
import axios from "axios";
import Cookies from "universal-cookie";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Web3 from "web3";
import { simpleStorageAbi } from "../../Utils/abis";
import { contractAddress } from "../../Utils/db";

export default function Donate() {
  const [amount, setAmount] = useState("");
  const [message, setMessage] = useState("");
  const [name, setName] = useState("");
  const [mode_of_payment, setModeOfPayment] = useState("");
  const cookies = new Cookies();
  const navigate = useNavigate();

  const web3 = new Web3(Web3.givenProvider);

  const contractAddr = contractAddress;
  const SimpleContract = new web3.eth.Contract(simpleStorageAbi, contractAddr);

  const handleSubmitByBlockchain = async (e) => {
    const accounts = await window.ethereum.enable();
    const account = accounts[0];
    const userId = cookies.get("id");
    const date = new Date().toDateString();
    let reg = /^\d+$/;
    let isValid = reg.test(amount);
    if(!isValid || amount === 0){
      alert("Please enter a valid amount")
      return false;
    }
    console.log(date);
    const gas = await SimpleContract.methods
      .registerFunds(name, amount, mode_of_payment, date, message, userId)
      .estimateGas();

    const result =  await SimpleContract.methods
      .registerFunds(name, amount, mode_of_payment, date, message, userId)
      .send({
        from: account,
        gas: 10 * gas,
      });

    console.log(result);
    // const transactionDetail = await web3.eth.getTransaction(result.transactionHash);
    if (result) {
      alert(
        `Successfully added the transaction in blockchain with \n  transactionHash = ${result.transactionHash} \n blockNumber = ${result.blockNumber} `
      );
    }
    console.log(result)
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
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
        cookies.set("token", "");
        navigate("/login");
      });
  }, []);

  function Updatesubmit(e) {
    e.preventDefault();
    handleSubmitByBlockchain();
  }

  return (
    <div className="wrapper fadeInDown pt-6">
      <div id="formContent">
        {/* Tabs Titles */}
        <h2 className="active" style={{ fontSize: "30px" }}>
          {" "}
          Donate Funds Here{" "}
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
    </div>
  );
}
