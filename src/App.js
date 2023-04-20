import './App.css';
import LoginPage from './Pages/Login';
import Signup from './Pages/Signup';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ViewFunds from './Pages/ViewFunds';
import DonateFunds from './Pages/DonateFunds';
import MyDonations from './Pages/MyDonations';
import Home from './Pages/Home';
import UtilizeFunds from './Components/Funds/withdraw';
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
          <Route path="/withdraw" element={<UtilizeFunds />} />
          <Route path="/mydonations" element={<MyDonations />} />
          <Route path="/home" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
