import logo from './logo.svg';
import './App.css';
import LoginPage from './Pages/Login';
import Signup from './Pages/Signup';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ViewFunds from './Pages/ViewFunds';
import DonateFunds from './Pages/DonateFunds';
import MyDonations from './Pages/MyDonations';
import Home from './Pages/Home';
// import Navbar from './Components/Navbar/navbar';
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" exact element={<LoginPage />} />
          <Route path="/login" exact element={<LoginPage />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/viewfunds" element={<ViewFunds />} />
          <Route path="/donatefunds" element={<DonateFunds />} />
          <Route path="/mydonations" element={<MyDonations />} />
          <Route path="/home" element={<Home />} />



          {/* <Route path="/navbar" element={<Navbar />} /> */}

          {/* <Route path="/users" element={<Users />} />
          <Route path="/products" element={<Products />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/orders" element={<Order />} />
          <Route path="/add-products" exact element={<AddProducts />} /> */}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
