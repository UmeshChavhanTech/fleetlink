import React, { useState } from "react";
import axios from "axios";

const SearchBook = () => {
  const [query, setQuery] = useState({
    capacityRequired: '',
    fromPincode: '',
    toPincode: '',
    startTime: ''
  });
  const [results, setResults] = useState([]);
  const [message, setMessage] = useState('');

  const search = async () => {
  try {
    const { data } = await axios.get('http://localhost:5000/api/vehicles/available', { params: query });

    
    const exactMatch = data.vehicles.filter(v => v.capacityKg === parseInt(query.capacityRequired));
    setResults(exactMatch);

    setMessage(exactMatch.length === 0 ? "No vehicle found with exact capacity" : "");
  } catch (e) {
    console.error(e);
    setMessage('Error searching');
  }
};


  const book = async (vehicleId) => {
    try {
      await axios.post('http://localhost:5000/api/bookings', {
        vehicleId,
        ...query,
        customerId: 'test-customer-123'
      });
      setMessage('Booking successful');
    } catch (e) {
      setMessage('Booking failed');
    }
  };

  return (
  <div className="search-container">
    <h2>Search & Book Vehicle</h2>

    <label>
      Capacity Required (kg):
      <input
        name="capacityRequired"
        placeholder="e.g. 800"
        type="number"
        onChange={e => setQuery({ ...query, capacityRequired: e.target.value })}
      />
    </label>

    <label>
      From Pincode:
      <input
        name="fromPincode"
        placeholder="e.g. 400001"
        type="number"
        onChange={e => setQuery({ ...query, fromPincode: e.target.value })}
      />
    </label>

    <label>
      To Pincode:
      <input
        name="toPincode"
        placeholder="e.g. 400021"
        type="number"
        onChange={e => setQuery({ ...query, toPincode: e.target.value })}
      />
    </label>

    <label>
      Start Time:
      <input
        name="startTime"
        type="datetime-local"
        onChange={e => {
          const raw = e.target.value;
          const withSeconds = raw.length === 16 ? raw + ":00" : raw;
          setQuery({ ...query, startTime: withSeconds });
        }}
      />
    </label>

    <button onClick={search}>Search</button>

    {results.map(v => (
      <div key={v._id} className="vehicle-card">
        <p><strong>{v.name}</strong> - {v.capacityKg} kg - {v.tyres} tyres</p>
        <button onClick={() => book(v._id)}>Book Now</button>
      </div>
    ))}

    {message && <p>{message}</p>}
  </div>
);

};

export default SearchBook;
