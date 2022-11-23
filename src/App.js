import logo from './logo.svg';
import './App.css';
import LoginPage from './Pages/Login';
import Signup from './Components/Auth/signup';
import { BrowserRouter, Route, Routes } from "react-router-dom";
// import Navbar from './Components/Navbar/navbar';
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" exact element={<LoginPage />} />
          <Route path="/login" exact element={<LoginPage />} />
          <Route path="/signup" element={<Signup />} />
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
