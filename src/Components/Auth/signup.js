import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Auth.css";
import Cookies from "universal-cookie";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Signup() {
  const cookies = new Cookies();
  const[number,setNumber] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [email, setEmail] = useState("");
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
        navigate("/products");
      })
      .catch((err) => {
        console.log(err);
        cookies.set("token", "");
      });
  }, []);
  let reg = /^\d+$/;
  function Updatesubmit(e) {
    e.preventDefault();

    if (password === "" || email === "" || confirmPassword === "" || name === "" || number === "") {
      showErrorToast("Enter all the fields");
    } else if (password != confirmPassword) {
      showErrorToast("Password do not match");
    } else if (password.length < 6) {
      showErrorToast("Password must be 6 digit long");
    } else if(!(number.length === 10 && reg.test(number))){
      showErrorToast("Enter Valid Number");
    }
    else {
      axios
        .post(`http://localhost:5000/api/auth/signup`, {
          email: email,
          password: password,
          name:name,
          mobile:number,

        })
        .then((res) => {
          console.log("response from submitting the form successful", res.data);
          showSuccessToast("Registered successfully, you can log in now");
          navigate('/login')
        })
        .catch((err) => {
          console.log(err);
          showSuccessToast("Check your email again, If already registered, Please login");
          console.log("ERROR  from update in form", err);
        });
    }
  }

  return (
    <>
    <ToastContainer 
          position="bottom-center"
          autoClose={2000}  />
    <div className="wrapper fadeInDown">
      <div id="formContent">
        <Link to="/login">
          <h2 className="inactive underlineHover"> Sign In </h2>
        </Link>
        <Link to="/signup">
          <h2 className="active ">Sign Up </h2>
        </Link>
        <form>
        <input
            onChange={(e) => setName(e.target.value)}
            type="text"
            id="login"
            className="fadeIn second"
            name="login"
            placeholder="Enter Name"
          />
          <input
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            id="login"
            className="fadeIn second"
            name="login"
            placeholder="Enter Email"
          />
          <input
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            id="password"
            className="fadeIn third"
            name="login"
            placeholder="password"
          />
          <input
            onChange={(e) => setConfirmPassword(e.target.value)}
            type="password"
            id="password"
            className="fadeIn third"
            name="login"
            placeholder=" Confirm password"
          />
          <input
            onChange={(e) => setNumber(e.target.value)}
            type="text"
            id="login"
            className="fadeIn second"
            name="login"
            placeholder="Enter your mobile number"
          />
          <button
            className="fadeIn fourth loginBtn mt-4"
            onClick={Updatesubmit}
          >
            {" "}
            Sign Up{" "}
          </button>
        </form>

        {/* Remind Passowrd */}
        <div id="formFooter">
          <Link style={{ textDecoration: "none" }} to="/login">
            <p>Already have account ?</p>
            <p> Login</p>
          </Link>
        </div>
      </div>
    </div>
    </>
  );
}