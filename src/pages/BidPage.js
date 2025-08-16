import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from '../components/layouts/navbar';
import '../styles/BidPage.css';

function BidPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [auction, setAuction] = useState(null);
  const [userBid, setUserBid] = useState('');
  const [automaticBid, setAutomaticBid] = useState('');
  const [bidHistory, setBidHistory] = useState([]);
  const [userStatus, setUserStatus] = useState({
    currentBid: 0,
    automaticBid: 0,
    status: 'Not Bidding'
  });

  useEffect(() => {
    // Mock data for the specific auction
    const mockAuction = {
      1: {
        id: 1,
        title: 'Vintage Guitar',
        image: 'https://via.placeholder.com/400x300?text=Vintage+Guitar',
        description: 'Beautiful vintage acoustic guitar in excellent condition. This guitar has been well-maintained and has a rich, warm sound perfect for both beginners and professionals.',
        startingBid: 250,
        currentBid: 450,
        seller: 'MusicLover123',
        startTime: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // Started 2 days ago
        endTime: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000), // Ends in 3 days
        category: 'Musical Instruments'
      },
      2: {
        id: 2,
        title: 'Antique Vase',
        image: 'https://via.placeholder.com/400x300?text=Antique+Vase',
        description: 'Rare 18th century ceramic vase with intricate designs and beautiful craftsmanship.',
        startingBid: 150,
        currentBid: 320,
        seller: 'AntiqueCollector',
        startTime: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
        endTime: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
        category: 'Antiques'
      },
      3: {
        id: 3,
        title: 'Limited Edition Watch',
        image: 'https://via.placeholder.com/400x300?text=Limited+Watch',
        description: 'Swiss-made limited edition watch with leather strap and premium materials.',
        startingBid: 500,
        currentBid: 750,
        seller: 'WatchEnthusiast',
        startTime: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
        endTime: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000),
        category: 'Accessories'
      },
      4: {
        id: 4,
        title: 'Rare Comic Book',
        image: 'https://via.placeholder.com/400x300?text=Comic+Book',
        description: 'First edition superhero comic book in mint condition, perfect for collectors.',
        startingBid: 100,
        currentBid: 275,
        seller: 'ComicFan',
        startTime: new Date(Date.now() - 6 * 60 * 60 * 1000),
        endTime: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000),
        category: 'Collectibles'
      }
    };

    const selectedAuction = mockAuction[parseInt(id)];
    if (selectedAuction) {
      setAuction(selectedAuction);
      // Mock user status
      setUserStatus({
        currentBid: 0,
        automaticBid: 0,
        status: 'Not Bidding'
      });
      
      // Mock bid history
      setBidHistory([
        { bidder: 'User123', amount: 450, time: new Date(Date.now() - 30 * 60 * 1000) },
        { bidder: 'Bidder456', amount: 420, time: new Date(Date.now() - 2 * 60 * 60 * 1000) },
        { bidder: 'AuctionLover', amount: 380, time: new Date(Date.now() - 4 * 60 * 60 * 1000) },
        { bidder: 'User789', amount: 350, time: new Date(Date.now() - 6 * 60 * 60 * 1000) },
        { bidder: 'StartingBid', amount: 250, time: selectedAuction.startTime }
      ]);
    }
  }, [id]);

  const formatDateTime = (date) => {
    return date.toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const formatTimeRemaining = (endTime) => {
    const now = new Date();
    const timeLeft = endTime - now;
    const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
    
    if (days > 0) return `${days}d ${hours}h ${minutes}m`;
    if (hours > 0) return `${hours}h ${minutes}m`;
    return `${minutes}m`;
  };

  const handlePlaceBid = () => {
    if (userBid && parseFloat(userBid) > auction.currentBid) {
      // Mock bid placement
      alert(`Bid of $${userBid} placed successfully!`);
      setUserStatus({
        ...userStatus,
        currentBid: parseFloat(userBid),
        status: 'Winning'
      });
      setUserBid('');
    } else {
      alert('Bid must be higher than current bid');
    }
  };

  const handleSetAutomaticBid = () => {
    if (automaticBid && parseFloat(automaticBid) > auction.currentBid) {
      // Mock automatic bid setup
      alert(`Automatic bid of $${automaticBid} set successfully!`);
      setUserStatus({
        ...userStatus,
        automaticBid: parseFloat(automaticBid),
        status: 'Auto Bidding'
      });
      setAutomaticBid('');
    } else {
      alert('Automatic bid must be higher than current bid');
    }
  };

  if (!auction) {
    return (
      <>
        <Navbar />
        <div className="loading">Loading auction details...</div>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="bid-page">
        <button className="back-button" onClick={() => navigate('/browse-auctions')}>
          ← Back to Auctions
        </button>
        
        <div className="bid-container">
          <div className="auction-details-section">
            <div className="auction-image-large">
              <img src={auction.image} alt={auction.title} />
            </div>
            
            <div className="auction-info">
              <h1 className="auction-title">{auction.title}</h1>
              <p className="auction-description">{auction.description}</p>
              <div className="auction-category-badge">{auction.category}</div>
            </div>
          </div>
          
          <div className="bidding-section">
            <div className="bid-information">
              <h2>Bid Information</h2>
              <div className="bid-info-grid">
                <div className="info-item">
                  <span className="label">Starting Bid:</span>
                  <span className="value">${auction.startingBid}</span>
                </div>
                <div className="info-item">
                  <span className="label">Current Highest Bid:</span>
                  <span className="value highlight">${auction.currentBid}</span>
                </div>
                <div className="info-item">
                  <span className="label">Your Current Bid:</span>
                  <span className="value">${userStatus.currentBid}</span>
                </div>
                <div className="info-item">
                  <span className="label">Your Automatic Bid:</span>
                  <span className="value">${userStatus.automaticBid}</span>
                </div>
                <div className="info-item">
                  <span className="label">Your Status:</span>
                  <span className={`value status ${userStatus.status.toLowerCase().replace(' ', '-')}`}>
                    {userStatus.status}
                  </span>
                </div>
              </div>
            </div>
            
            <div className="auction-status">
              <h2>Auction Status</h2>
              <div className="status-info-grid">
                <div className="info-item">
                  <span className="label">Seller:</span>
                  <span className="value">👤 {auction.seller}</span>
                </div>
                <div className="info-item">
                  <span className="label">Start Time:</span>
                  <span className="value">{formatDateTime(auction.startTime)}</span>
                </div>
                <div className="info-item">
                  <span className="label">End Time:</span>
                  <span className="value">{formatDateTime(auction.endTime)}</span>
                </div>
                <div className="info-item">
                  <span className="label">Time Remaining:</span>
                  <span className="value time-remaining">
                    ⏰ {formatTimeRemaining(auction.endTime)}
                  </span>
                </div>
              </div>
            </div>
            
            <div className="bidding-actions">
              <div className="bid-input-section">
                <h3>Place Your Bid</h3>
                <div className="bid-input-group">
                  <input
                    type="number"
                    value={userBid}
                    onChange={(e) => setUserBid(e.target.value)}
                    placeholder={`Minimum: $${auction.currentBid + 1}`}
                    min={auction.currentBid + 1}
                    className="bid-input"
                  />
                  <button 
                    onClick={handlePlaceBid}
                    className="bid-button primary"
                    disabled={!userBid || parseFloat(userBid) <= auction.currentBid}
                  >
                    Place Bid
                  </button>
                </div>
              </div>
              
              <div className="automatic-bid-section">
                <h3>Set Automatic Bid</h3>
                <div className="bid-input-group">
                  <input
                    type="number"
                    value={automaticBid}
                    onChange={(e) => setAutomaticBid(e.target.value)}
                    placeholder={`Maximum you're willing to pay`}
                    min={auction.currentBid + 1}
                    className="bid-input"
                  />
                  <button 
                    onClick={handleSetAutomaticBid}
                    className="bid-button secondary"
                    disabled={!automaticBid || parseFloat(automaticBid) <= auction.currentBid}
                  >
                    Set Auto Bid
                  </button>
                </div>
                <p className="auto-bid-info">
                  We'll automatically bid for you up to this amount
                </p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="bid-history">
          <h3>Bid History</h3>
          <div className="history-list">
            {bidHistory.map((bid, index) => (
              <div key={index} className="history-item">
                <span className="bidder">{bid.bidder}</span>
                <span className="amount">${bid.amount}</span>
                <span className="time">{formatDateTime(bid.time)}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default BidPage;
