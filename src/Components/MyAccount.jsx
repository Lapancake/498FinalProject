import React, { useEffect, useState } from "react";
import axios from "axios";

const MyAccount = () => {
  const [userData, setUserData] = useState({ username: "", balance: 0, listings: [] });
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    const fetchAccountData = async () => {
      try {
        const res = await axios.get(`http://localhost:3000/shop/userdashboard?id=${userId}`);
        setUserData(res.data);
      } catch (error) {
        console.error("Error fetching account data:", error);
      }
    };

    fetchAccountData();
  }, [userId]);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">My Account</h2>
      <p><strong>Username:</strong> {userData.username}</p>
      <p><strong>Balance:</strong> ${userData.balance.toFixed(2)}</p>

      <h3 className="text-xl mt-6 mb-2">Your Listings</h3>
      <ul className="space-y-2">
        {userData.listings.length > 0 ? (
          userData.listings.map((listing, index) => (
            <li key={index} className="border p-3 rounded">
              <p><strong>Type:</strong> {listing.type}</p>
              <p><strong>Condition:</strong> {listing.condition}</p>
              <p><strong>Price:</strong> ${listing.price}</p>
              {listing.image && <img src={listing.image} alt="Listing" className="w-32 mt-2" />}
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
