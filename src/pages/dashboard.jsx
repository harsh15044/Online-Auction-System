import Navbar from "../components/layouts/navbar"
import "../styles/dashboard.css"

function Dashboard() {
  return (
    <>
        <Navbar/>
        <div className="hero-section">
            <div className="hero-content">
                <h1 className="hero-title">Welcome to AuctionApp</h1>
                <p className="hero-subtitle">Discover amazing deals and sell your items with absoulte ease.</p>

                <div className="hero-buttons">
                  <button className="hero-btn primary">
                    <span className="btn-icon">🔍</span>
                    Start Bidding
                  </button>

                  <button className="hero-btn secondary">
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