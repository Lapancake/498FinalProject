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
        console.log("Fetched account data:", res.data); // 🔵 Good for checking
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
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">My Account</h2>
      <p><strong>Username:</strong> {userData.username}</p>
      <p><strong>Balance:</strong> ${Number(userData.balance).toFixed(2)}</p> {/* ✅ SAFELY CONVERT to Number */}

      <h3 className="text-xl mt-6 mb-2">Your Listings</h3>
      <ul className="space-y-2">
        {userData.listings.length > 0 ? (
          userData.listings.map((listing, index) => (
            <li key={index} className="border p-3 rounded">
              <p><strong>Type:</strong> {listing.type}</p>
              <p><strong>Condition:</strong> {listing.condition}</p>
              <p><strong>Price:</strong> ${Number(listing.price).toFixed(2)}</p>
              {listing.image && (
                <img
                  src={listing.image}
                  alt="Listing"
                  style={{ width: "200px", height: "150px", objectFit: "cover" }} // Inline style for image size
                  className="mt-2"
                />
              )}
            </li>
          ))
        ) : (
          <p>No listings found.</p>
        )}
      </ul>
    </div>
  );
};

export default MyAccount;
