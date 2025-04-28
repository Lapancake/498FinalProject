import React, { useEffect, useState } from "react";
import axios from "axios";

const MyAccount = () => {
  const [userData, setUserData] = useState({ username: "", balance: 0, listings: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
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

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % userData.listings.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + userData.listings.length) % userData.listings.length);
  };

  const handleDelete = async (listingId) => {
    if (!window.confirm("Are you sure you want to delete this listing?")) return;

    try {
      await axios.delete(`http://localhost:3000/shop/deletelisting?id=${listingId}`);

      // Update local state: remove the deleted listing
      setUserData(prevData => {
        const updatedListings = prevData.listings.filter(listing => listing.listingid !== listingId);
        return {
          ...prevData,
          listings: updatedListings,
        };
      });

      setCurrentIndex(0); // Reset to first listing

      alert("Listing deleted successfully.");
    } catch (error) {
      console.error("Error deleting listing:", error);
      alert("Failed to delete listing.");
    }
  };

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

  const currentListing = userData.listings[currentIndex];

  return (
    <div className="p-6 space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-center bg-blue-600 text-white p-6 rounded-md shadow">
        <h2 className="text-2xl font-bold mb-2 md:mb-0">Hello, {userData.username}</h2>
        <div className="text-xl">
          <span className="font-semibold">Balance:</span> ${Number(userData.balance).toFixed(2)}
        </div>
      </div>

      <div>
        <h3 className="text-2xl font-semibold mb-4">Listings Overview</h3>
        {userData.listings.length > 0 ? (
          <div className="border p-4 rounded-md shadow-sm text-center">
            {currentListing?.image && (
              <img
                src={currentListing.image}
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
            <p><strong>Type:</strong> {currentListing?.type}</p>
            <p><strong>Condition:</strong> {currentListing?.condition}</p>
            <p><strong>Price:</strong> ${Number(currentListing?.price).toFixed(2)}</p>

            <div className="mt-4 flex flex-wrap justify-center space-x-4 space-y-4">
              <button
                onClick={handlePrev}
                className="bg-gray-300 hover:bg-gray-400 text-black font-semibold py-2 px-4 rounded"
              >
                Previous
              </button>
              <button
                onClick={handleNext}
                className="bg-gray-300 hover:bg-gray-400 text-black font-semibold py-2 px-4 rounded"
              >
                Next
              </button>
              <button
                onClick={() => handleDelete(currentListing.listingid)}
                className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded"
              >
                Delete Listing
              </button>
            </div>
          </div>
        ) : (
          <p className="text-center text-lg text-gray-600">You have no listings.</p>
        )}
      </div>
    </div>
  );
};

export default MyAccount;
