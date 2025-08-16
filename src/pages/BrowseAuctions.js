import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/layouts/navbar';
import '../styles/BrowseAuctions.css';

function BrowseAuctions() {
  const navigate = useNavigate();
  const [auctions, setAuctions] = useState([]);

  useEffect(() => {
    // Mock data for available auctions
    const mockAuctions = [
      {
        id: 1,
        title: 'Vintage Guitar',
        image: 'https://via.placeholder.com/300x200?text=Vintage+Guitar',
        description: 'Beautiful vintage acoustic guitar in excellent condition',
        startingBid: 250,
        currentBid: 450,
        endTime: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000), // 3 days from now
        seller: 'MusicLover123',
        category: 'Musical Instruments'
      },
      {
        id: 2,
        title: 'Antique Vase',
        image: 'https://via.placeholder.com/300x200?text=Antique+Vase',
        description: 'Rare 18th century ceramic vase with intricate designs',
        startingBid: 150,
        currentBid: 320,
        endTime: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000), // 2 days from now
        seller: 'AntiqueCollector',
        category: 'Antiques'
      },
      {
        id: 3,
        title: 'Limited Edition Watch',
        image: 'https://via.placeholder.com/300x200?text=Limited+Watch',
        description: 'Swiss-made limited edition watch with leather strap',
        startingBid: 500,
        currentBid: 750,
        endTime: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000), // 5 days from now
        seller: 'WatchEnthusiast',
        category: 'Accessories'
      },
      {
        id: 4,
        title: 'Rare Comic Book',
        image: 'https://via.placeholder.com/300x200?text=Comic+Book',
        description: 'First edition superhero comic book in mint condition',
        startingBid: 100,
        currentBid: 275,
        endTime: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000), // 1 day from now
        seller: 'ComicFan',
        category: 'Collectibles'
      }
    ];
    setAuctions(mockAuctions);
  }, []);

  const formatTimeRemaining = (endTime) => {
    const now = new Date();
    const timeLeft = endTime - now;
    const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
    
    if (days > 0) return `${days}d ${hours}h`;
    if (hours > 0) return `${hours}h ${minutes}m`;
    return `${minutes}m`;
  };

  const handleBidClick = (auctionId) => {
    navigate(`/bid/${auctionId}`);
  };

  return (
    <>
      <Navbar />
      <div className="browse-auctions">
        <div className="browse-header">
          <h1>Browse Active Auctions</h1>
          <p>Discover amazing items and place your bids</p>
        </div>
        
        <div className="auctions-grid">
          {auctions.map(auction => (
            <div key={auction.id} className="auction-card">
              <div className="auction-image">
                <img src={auction.image} alt={auction.title} />
                <div className="auction-category">{auction.category}</div>
              </div>
              
              <div className="auction-content">
                <h3 className="auction-title">{auction.title}</h3>
                <p className="auction-description">{auction.description}</p>
                
                <div className="auction-details">
                  <div className="bid-info">
                    <span className="starting-bid">Starting: ${auction.startingBid}</span>
                    <span className="current-bid">Current: ${auction.currentBid}</span>
                  </div>
                  
                  <div className="auction-meta">
                    <span className="time-remaining">
                      ⏰ {formatTimeRemaining(auction.endTime)} left
                    </span>
                    <span className="seller">👤 {auction.seller}</span>
                  </div>
                </div>
                
                <button 
                  className="bid-button"
                  onClick={() => handleBidClick(auction.id)}
                >
                  <span className="btn-icon">🏆</span>
                  Place Bid
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default BrowseAuctions;
