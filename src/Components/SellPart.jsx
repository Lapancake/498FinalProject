import React, { useState } from "react";
import axios from "axios";

const SellPart = () => {
  const [form, setForm] = useState({
    condition: "",
    type: "",
    image: "",
    price: "",
  });

  const userId = sessionStorage.getItem("userId");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:3000/shop/sell", {
        condition: form.condition,
        type: form.type,
        image: form.image,
        price: parseFloat(form.price),
        userId: userId,
      });
      alert("Listing submitted!");
      setForm({ condition: "", type: "", image: "", price: "" });
    } catch (error) {
      if (error.response) {
        console.error("Server responded with an error:", error.response.data);
        alert(`Server error: ${error.response.data.error || "Unknown server error."}`);
      } else if (error.request) {
        console.error("No response received:", error.request);
        alert("No response from server.");
      } else {
        console.error("Error setting up request:", error.message);
        alert("Error setting up request.");
      }
    }
  };
  

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Sell a Part</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-3 max-w-md">

        <select
          name="condition"
          value={form.condition}
          onChange={handleChange}
          className="p-2 border"
          required
        >
          <option value="">Select Condition</option>
          <option value="Brand New">Brand New</option>
          <option value="Lightly Used">Lightly Used</option>
          <option value="Poorly Used">Poorly Used</option>
          <option value="Damaged">Damaged</option>
        </select>

        <select
          name="type"
          value={form.type}
          onChange={handleChange}
          className="p-2 border"
          required
        >
          <option value="">Select Type</option>
          <option value="CPU">CPU</option>
          <option value="GPU">GPU</option>
          <option value="RAM">RAM</option>
          <option value="Hard Drive">Hard Drive</option>
        </select>

        <input
          name="price"
          type="number"
          step="0.01"
          placeholder="Price in USD"
          value={form.price}
          onChange={handleChange}
          className="p-2 border"
          required
        />

        <input
          name="image"
          placeholder="Image URL"
          value={form.image}
          onChange={handleChange}
          className="p-2 border"
          required
        />

        <button type="submit" className="bg-blue-500 text-white p-2 rounded">
          Submit Listing
        </button>
      </form>
    </div>
  );
};

export default SellPart;
