import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./components/HomePage";
import EnquiryForm from "./components/EnquiryForm";
import SignupPage from "./components/Signup";
import LoginPage from "./components/Login";
import Navbar from "./components/Navbar";
import AdminEnquiriesPage from "./components/AdminEnquiriesPage";

function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/enquire" element={<EnquiryForm />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/enquiries/admin" element={<AdminEnquiriesPage />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
