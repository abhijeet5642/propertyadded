// src/api/brokers.js
const BASE = import.meta.env.VITE_API_BASE || 'http://localhost:5000/api';

export async function getBrokerStats(id) {
  const res = await fetch(`${BASE}/brokers/${id}/stats`);
  if (!res.ok) throw new Error('Failed to fetch stats');
  return res.json();
}

export async function getBrokerListings(id) {
  const res = await fetch(`${BASE}/brokers/${id}/listings`);
  if (!res.ok) throw new Error('Failed to fetch listings');
  return res.json();
}

export async function getBrokerEnquiries(id) {
  const res = await fetch(`${BASE}/brokers/${id}/enquiries`);
  if (!res.ok) throw new Error('Failed to fetch enquiries');
  return res.json();
}

export async function getAllBrokers() {
  const res = await fetch(`${BASE}/brokers`);
  return res.json();
}

export async function approveBroker(id) {
  const res = await fetch(`${BASE}/brokers/${id}/approve`, { method: 'POST' });
  return res.json();
}
// src/api/brokers.js

// → Replace this stub with real fetch calls once your backend is ready.
//   For now it returns mock data so your component can render happily.

export async function getAll() {
  return Promise.resolve([
    { id: 1, name: 'Rohit Sharma', email: 'rohit@pnbw.in', listings: 12, active: true },
    { id: 2, name: 'Sara Khan',    email: 'sara@pnbw.in',  listings:  8, active: false }
  ]);
}
