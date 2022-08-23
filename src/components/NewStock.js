import axios from "axios";

import { useState } from "react";

function NewStock({ orgId, setStockState }) {
  const url = `http://localhost:8000/api/v1/stocks/${orgId}`;
  const [basePrice, setBasePrice] = useState("");
  const [duration, setDuration] = useState("");
  const [error, setError] = useState("");

  const newStock = async () => {
    try {
      if (basePrice && duration) {
        const now = new Date().getTime();
        const { data } = await axios.patch(url, {
          winner: "",
          basePrice: basePrice,
          startTimeStamp: now,
          endTimeStamp: now + duration * 60000,
          bidPrice: 0,
        });
        setBasePrice("");
        setDuration("");
        setStockState(0);
      }
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="newStock">
      <h4>New Stock</h4>
      <div className="Input">
        <input
          type="number"
          id="basePrice"
          className="Input-text"
          placeholder="Base Price"
          value={basePrice}
          onChange={(e) => setBasePrice(e.target.value)}
        />
        <label htmlFor="input" className="Input-label">
          Base Price
        </label>
      </div>
      <div className="Input">
        <input
          type="number"
          id="duration"
          className="Input-text"
          placeholder="Duration"
          value={duration}
          onChange={(e) => setDuration(e.target.value)}
        />
        <label htmlFor="input" className="Input-label">
          Duration in minutes
        </label>
      </div>

      <button type="submit" className="btn" onClick={newStock}>
        Start
      </button>
    </div>
  );
}

export default NewStock;
