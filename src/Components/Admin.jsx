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

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300">
          <thead>
            <tr className="bg-gray-200 text-gray-700">
              <th className="py-3 px-6 text-left">Type</th>
              <th className="py-3 px-6 text-left">Condition</th>
              <th className="py-3 px-6 text-left">Price</th>
              <th className="py-3 px-6 text-left">Listing ID</th>
              <th className="py-3 px-6 text-left">Action</th>
            </tr>
          </thead>
          <tbody>
            {listings.map((listing) => (
              <tr key={listing.listingid} className="border-t hover:bg-gray-50">
                <td className="py-3 px-6">{listing.type}</td>
                <td className="py-3 px-6">{listing.condition}</td>
                <td className="py-3 px-6">${Number(listing.price).toFixed(2)}</td>
                <td className="py-3 px-6">{listing.listingid}</td>
                <td className="py-3 px-6">
                  <button
                    onClick={() => handleDelete(listing.listingid)}
                    className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Admin;
