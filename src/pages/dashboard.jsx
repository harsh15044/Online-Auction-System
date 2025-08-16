import Navbar from "../components/layouts/navbar"
import "../styles/dashboard.css"
import { useNavigate } from "react-router-dom"

function Dashboard() {
  const navigate = useNavigate();

  const handleStartBidding = () => {
    navigate("/browse-auctions");
  };

  const handleCreateAuction = () => {
    navigate("/create-auction");
  };

  return (
    <>
        <Navbar/>
        <div className="hero-section">
            <div className="hero-content">
                <h1 className="hero-title">Welcome to AuctionApp</h1>
                <p className="hero-subtitle">Discover amazing deals and sell your items with absoulte ease.</p>

                <div className="hero-buttons">
                  <button className="hero-btn primary" onClick={handleStartBidding}>
                    <span className="btn-icon">🔍</span>
                    Start Bidding
                  </button>

                  <button className="hero-btn secondary" onClick={handleCreateAuction}>
                    <span className="btn-icon">📦</span>
                    Create an Auction
                  </button>
                </div>
            </div>
        </div>
    </>
  )
}

export default Dashboard