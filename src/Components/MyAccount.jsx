import React, { useEffect, useState } from "react";
import axios from "axios";

const MyAccount = () => {
  const [userData, setUserData] = useState({ username: "", balance: 0, listings: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const userId = sessionStorage.getItem("userId");

  useEffect(() => {
    const fetchAccountData = async () => {
      if (!userId) {
        console.error("No userId found in sessionStorage");
        setError("User not logged in.");
        setLoading(false);
        return;
      }

      try {
        const res = await axios.get(`http://localhost:3000/shop/userdashboard?id=${userId}`);
        console.log("Fetched account data:", res.data);
        setUserData(res.data);
      } catch (error) {
        console.error("Error fetching account data:", error);
        setError("Failed to load account information.");
      } finally {
        setLoading(false);
      }
    };

    fetchAccountData();
  }, [userId]);

  if (loading) {
    return (
      <div className="p-6">
        <h2 className="text-2xl font-bold mb-4">Loading your account...</h2>
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

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold mb-6 text-center">My Account</h2>
      <div className="mb-6 text-center">
        <p><strong>Username:</strong> {userData.username}</p>
        <p><strong>Balance:</strong> ${Number(userData.balance).toFixed(2)}</p>
      </div>

      <h3 className="text-2xl font-semibold mb-4">Your Listings</h3>
      <ul className="space-y-6">
        {userData.listings.length > 0 ? (
          userData.listings.map((listing, index) => (
            <li key={index} className="border rounded-lg p-4 flex items-center gap-6 shadow-md">
              {listing.image && (
                <img
                  src={listing.image}
                  alt="Listing"
                  className="w-32 h-32 object-cover rounded-md flex-shrink-0"
                />
              )}
              <div className="text-left">
                <p><strong>Type:</strong> {listing.type}</p>
                <p><strong>Condition:</strong> {listing.condition}</p>
                <p><strong>Price:</strong> ${Number(listing.price).toFixed(2)}</p>
              </div>
            </li>
          ))
        ) : (
          <p className="text-center">No listings found.</p>
        )}
      </ul>
    </div>
  );
};

export default MyAccount;
