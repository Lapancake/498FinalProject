import React, { useEffect, useState } from "react";
import axios from "axios";

const Browse = () => {
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const userId = sessionStorage.getItem("userId");

  useEffect(() => {
    const fetchListings = async () => {
      try {
        const res = await axios.get("http://localhost:3000/shop/browselistings");
        console.log("Fetched listings:", res.data);

        const otherListings = res.data.filter(listing => listing.userid !== Number(userId));

        setListings(otherListings);
      } catch (error) {
        console.error("Error fetching listings:", error);
        setError("Failed to load listings.");
      } finally {
        setLoading(false);
      }
    };

    fetchListings();
  }, [userId]);

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
      <h2 className="text-3xl font-bold text-center mb-8">Browse Listings</h2>

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
          </div>
        ))}
      </div>
    </div>
  );
};

export default Browse;
