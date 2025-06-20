import React, { useState } from 'react';
import axios from 'axios';

const AddVehicle = () => {
  const [form, setForm] = useState({ name: '', capacityKg: '', tyres: '' });
  const [message, setMessage] = useState('');
  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });
  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/vehicles', form);
      setMessage('Vehicle added successfully');
    } catch (err) {
      setMessage('Error adding vehicle');
    }
  };
  return (
    <form onSubmit={handleSubmit}>
      <input name="name" placeholder="Name" onChange={handleChange} />
      <input name="capacityKg" placeholder="Capacity" type="number" onChange={handleChange} />
      <input name="tyres" placeholder="Tyres" type="number" onChange={handleChange} />
      <button type="submit">Add Vehicle</button>
      <p>{message}</p>
    </form>
  );
};

export default AddVehicle;
