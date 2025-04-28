import React, { useEffect, useState } from "react";
import axios from "axios";

function Admin() {
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const isAdmin = sessionStorage.getItem("isAdmin") === "1";  

  useEffect(() => {
    const fetchListings = async () => {
      try {
        const res = await axios.get("http://localhost:3000/shop/browselistings");
        setListings(res.data);
      } catch (error) {
        console.error("Error fetching listings:", error);
        setError("Failed to load listings.");
      } finally {
        setLoading(false);
      }
    };

    fetchListings();
  }, []);

  const handleDelete = async (listingId) => {
    if (!window.confirm("Are you sure you want to delete this listing?")) return;

    try {
      await axios.delete(`http://localhost:3000/shop/deletelisting?id=${listingId}`);

      setListings(prev => prev.filter(listing => listing.listingid !== listingId));

      alert("Listing deleted successfully.");
    } catch (error) {
      console.error("Delete failed:", error);
      alert("Failed to delete listing.");
    }
  };

  if (!isAdmin) {
    return (
      <div className="p-6 mt-20 text-center">
        <h2 className="text-2xl font-bold">Access Denied</h2>
        <p>You must be an admin to view this page.</p>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="p-6 mt-20 text-center">
        <h2 className="text-2xl font-bold">Loading listings...</h2>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 mt-20 text-center">
        <h2 className="text-2xl font-bold">Error</h2>
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="p-6 mt-20">
      <h2 className="text-3xl font-bold text-center mb-8">Admin: Manage Listings</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {listings.map((listing) => (
          <div key={listing.listingid} className="border p-4 rounded shadow flex flex-col">
            <p><strong>Type:</strong> {listing.type}</p>
            <p><strong>Condition:</strong> {listing.condition}</p>
            <p><strong>Price:</strong> ${Number(listing.price).toFixed(2)}</p>
            <p><strong>Listing ID:</strong> {listing.listingid}</p>

            <button
              className="mt-4 bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded"
              onClick={() => handleDelete(listing.listingid)}
            >
              Delete Listing
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Admin;
