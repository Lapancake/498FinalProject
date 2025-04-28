import React, { useEffect, useState } from "react";
import axios from "axios";

const Browse = () => {
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [balance, setBalance] = useState(0); 
  const userId = sessionStorage.getItem("userId");

  useEffect(() => {
    const fetchListingsAndBalance = async () => {
      try {
        const [listingsRes, balanceRes] = await Promise.all([
          axios.get("http://localhost:3000/shop/browselistings"),
          axios.get(`http://localhost:3000/shop/getbalance?id=${userId}`),
        ]);
    
        const otherListings = listingsRes.data.filter(listing => listing.userid !== Number(userId));
        setListings(otherListings);
    
        setBalance(Number(balanceRes.data.balance)); 
      } catch (error) {
        console.error("Error fetching data:", error);
        setError("Failed to load listings or balance.");
      } finally {
        setLoading(false);
      }
    };
    

    fetchListingsAndBalance();
  }, [userId]);

  const handleBuy = async (listingId, price) => {
    if (balance < price) {
      alert("You do not have enough balance to buy this item.");
      return;
    }

    try {
      await axios.post("http://localhost:3000/shop/buy", {
        userId: Number(userId),
        listingId,
        price: Number(price)
      });

      setListings(prev => prev.filter(listing => listing.listingid !== listingId));
      setBalance(prev => prev - price); 
      alert("Purchase successful!");
    } catch (error) {
      console.error("Purchase failed:", error);
      alert("Purchase failed. Please try again.");
    }
  };

  if (loading) {
    return (
      <div className="p-6">
        <h2 className="text-2xl font-bold mb-4">Loading listings...</h2>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6">
        <h2 className="text-2xl font-bold mb-4">Error</h2>
        <p>{error}</p>
      </div>
    );
  }

  if (listings.length === 0) {
    return (
      <div className="p-6">
        <h2 className="text-2xl font-bold mb-4">No Listings Available</h2>
        <p>There are no listings from other users at the moment.</p>
      </div>
    );
  }

  return (
    <div className="p-6 min-h-screen mt-20">
      <h2 className="text-3xl font-bold text-center mb-4">Browse Listings</h2>
      <div className="text-center mb-8 text-xl">
        Your Balance: <strong>${balance.toFixed(2)}</strong>
      </div>

      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {listings.map((listing, index) => (
          <div key={index} className="border p-4 rounded-md shadow-md text-center">
            {listing.image && (
              <img
                src={listing.image}
                alt="Listing"
                style={{
                  width: "100%",
                  height: "200px",
                  objectFit: "cover",
                  borderRadius: "8px",
                  marginBottom: "16px"
                }}
              />
            )}
            <p><strong>Type:</strong> {listing.type}</p>
            <p><strong>Condition:</strong> {listing.condition}</p>
            <p><strong>Price:</strong> ${Number(listing.price).toFixed(2)}</p>
            <button
              className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              onClick={() => handleBuy(listing.listingid, listing.price)}
            >
              Buy
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Browse;
