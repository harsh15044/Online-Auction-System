import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Login from "./pages/login";
import Signup from "./pages/signup";
import CreateAuction from "./pages/CreateAuction";
import BrowseAuctions from "./pages/BrowseAuctions";
import BidPage from "./pages/BidPage";
import "./App.css";
import Dashboard from "./pages/dashboard";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/create-auction" element={<CreateAuction />} />
          <Route path="/browse-auctions" element={<BrowseAuctions />} />
          <Route path="/bid/:id" element={<BidPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
