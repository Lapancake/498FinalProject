import React, { useState } from "react";
import axios from "axios";

const SellPart = () => {
  const [form, setForm] = useState({
    condition: "",
    price: "",
    type: "",
    image: "",
  });

  const userId = localStorage.getItem("userId"); // or however you're storing it

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:3000/shop/sell", {
        ...form,
        userId: Number(userId),
      });
      alert("Listing submitted!");
    } catch (error) {
      console.error("Error submitting listing:", error);
      alert("Submission failed.");
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Sell a Part</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-3 max-w-md">
        <input
          name="condition"
          placeholder="Condition"
          value={form.condition}
          onChange={handleChange}
          className="p-2 border"
        />
        <input
          name="price"
          type="number"
          placeholder="Price"
          value={form.price}
          onChange={handleChange}
          className="p-2 border"
        />
        <input
          name="type"
          placeholder="Type"
          value={form.type}
          onChange={handleChange}
          className="p-2 border"
        />
        <input
          name="image"
          placeholder="Image URL"
          value={form.image}
          onChange={handleChange}
          className="p-2 border"
        />
        <button type="submit" className="bg-blue-500 text-white p-2 rounded">
          Submit Listing
        </button>
      </form>
    </div>
  );
};

export default SellPart;
