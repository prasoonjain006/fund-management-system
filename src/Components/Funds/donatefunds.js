import React from "react";
import { Link } from "react-router-dom";
import "../Auth/Auth.css";
import axios from "axios";
import Cookies from "universal-cookie";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Donate() {
  const [amount, setAmount] = useState("");
  const [message, setMessage] = useState("");
  const [name, setName] = useState("");
  const [mode_of_payment, setModeOfPayment] = useState("");
  const cookies = new Cookies();
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
        console.log(res.data)
        // console.log(res.data);
        // navigate("/home");
      })
      .catch((err) => {
        console.log(err);
        cookies.set("token", "");
        navigate("/login");
      });
  }, []);

  
  function Updatesubmit(e) {
    e.preventDefault();

    console.log(amount, name, mode_of_payment, message);
    const data = {
      amount: amount,
      message: message,
      name: name,
      mode_of_payment: mode_of_payment,
      date: new Date().toJSON().slice(0, 10),
    };

    let token = cookies.get("token");
    const headers = {
      "Content-Type": "application/json",
      "x-access-token": token,
    };
    axios
      .post(`http://localhost:5000/funds/donate`, data, {
        headers: headers,
      })
      .then((res) => {
        alert("successfully Donated");

        // navigate("/home");
      })
      .catch((err) => {
        console.log(err);
        alert("Some error");
      });
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
