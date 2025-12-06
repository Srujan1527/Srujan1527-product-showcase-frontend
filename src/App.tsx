import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./components/HomePage";
import EnquiryForm from "./components/EnquiryForm";
function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/:id/enquire" element={<EnquiryForm />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
