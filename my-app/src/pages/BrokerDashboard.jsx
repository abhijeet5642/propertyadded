import React, { useEffect, useState } from 'react';
import { useAuthStore } from '../store/useAuthStore.js';
import * as api from '../api/brokers.js'; // make sure getBrokerEnquiries is exported here
import StatsCard from '../components/StatsCard.jsx';
import Loader from '../components/Loader.jsx';
import { Navigate, Link } from 'react-router-dom'; // Import Link for view property
// Corrected import: CheckCircle and XCircle are imported from lucide-react
import { DollarSign, Percent, Award, Home, Mail, MessageSquare, Calendar, Eye, Edit, Trash2, User, CheckCircle, XCircle } from 'lucide-react'; // Lucide icons

export default function BrokerDashboard() {
  const user = useAuthStore((s) => s.user);
  const [stats, setStats] = useState(null);
  const [listings, setListings] = useState([]);
  // Removed enquiries state as it's no longer shown here
  // const [enquiries, setEnquiries] = useState([]);
  const [loading, setLoading] = useState(user === undefined);

  // Redirect if user is not logged in
  if (user === null) {
    return <Navigate to="/login" replace />;
  }

  useEffect(() => {
    // Skip loading if user is undefined (still fetching from auth store)
    if (user === undefined) {
      setLoading(true);
      return;
    }
    // If user is null (not logged in), Navigate will handle it.
    if (!user?.id) {
      // This case should ideally be caught by Navigate, but good for safety
      setLoading(false);
      return;
    }

    async function load() {
      setLoading(true);
      try {
        // Mock data for demonstration
        const mockStats = {
          referrals: 25,
          code: 'PNBW-007',
          profit: 1500000, // 15 Lakhs
          totalListings: 30,
          activeListings: 12,
          totalEnquiries: 45,
        };
        const mockListings = [
          { id: 'p1', title: 'Luxury Apartment, Sector 18', price: 25000000, status: 'Published', views: 1200, createdAt: new Date('2023-01-15').getTime() },
          { id: 'p2', title: 'Spacious Villa, Greater Noida', price: 18000000, status: 'Draft', views: 500, createdAt: new Date('2023-03-01').getTime() },
          { id: 'p3', title: 'Commercial Plot, Yamuna Exp.', price: 50000000, status: 'Published', views: 2500, createdAt: new Date('2023-05-20').getTime() },
        ];
        // Removed mockEnquiries as it's no longer used here
        // const mockEnquiries = [
        //   { _id: 'e1', userId: { name: 'Client A' }, propertyId: { title: 'Luxury Apartment, Sector 18' }, message: 'Interested in a site visit next week.', createdAt: new Date('2024-07-20').toISOString() },
        //   { _id: 'e2', userId: { name: 'Client B' }, propertyId: { title: 'Spacious Villa, Greater Noida' }, message: 'Can I get more photos?', createdAt: new Date('2024-07-21').toISOString() },
        // ];

        // Replace with actual API calls:
        // const [s, l, e] = await Promise.all([ // Removed 'e' from destructuring
        //   api.getBrokerStats(user.id),
        //   api.getBrokerListings(user.id),
        //   // api.getBrokerEnquiries(user.id), // Removed this API call
        // ]);
        setStats(mockStats);
        setListings(mockListings);
        // Removed setEnquiries
        // setEnquiries(mockEnquiries);
      } catch (err) {
        console.error('Error loading broker dashboard data:', err);
      } finally {
        setLoading(false);
      }
    }

    load();
  }, [user]); // Depend on user to re-fetch if user object changes

  if (loading) return <Loader />;

  if (!stats) {
    return (
      <div className="p-8 text-center bg-white rounded-xl shadow-xl border border-gray-100">
        <p className="text-red-600 text-xl font-semibold">Couldn’t load dashboard data. Please try again.</p>
      </div>
    );
  }

  // Helper to format currency
  const formatCurrency = (amount) => {
    if (amount === null || amount === undefined) return '–';
    const lakhs = Math.round(amount / 100000);
    return `₹${lakhs} Lakh`;
  };

  return (
    <section className="mx-auto max-w-7xl px-6 lg:px-12 xl:px-24 py-8 space-y-10">
      <h1 className="text-4xl font-extrabold text-gray-900 text-center drop-shadow-md">
        Agent <span className="text-blue-600">Dashboard</span>
      </h1>

      {/* Top-line stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        <StatsCard label="Total Referrals" value={stats.referrals ?? '–'} />
        <StatsCard label="Referral Code" value={stats.code ?? '–'} />
        <StatsCard label="Profit Earned" value={formatCurrency(stats.profit)} />
        <StatsCard label="Active Listings" value={stats.activeListings ?? '–'} />
      </div>

      {/* Listings table */}
      <div className="bg-white p-6 rounded-xl shadow-xl border border-gray-100">
        <h2 className="text-2xl font-bold text-gray-900 border-b-4 border-blue-500 pb-4 mb-6 inline-block">Your Listings</h2>
        {listings.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="min-w-full text-left">
              <thead className="bg-blue-50 text-blue-800 text-sm uppercase tracking-wider">
                <tr>
                  <th className="px-4 py-3 rounded-tl-lg">Property</th>
                  <th className="px-4 py-3">Price</th>
                  <th className="px-4 py-3">Status</th>
                  <th className="px-4 py-3">Views</th>
                  <th className="px-4 py-3 rounded-tr-lg text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {listings.map((p) => (
                  <tr key={p.id} className="border-b border-gray-200 hover:bg-gray-50 transition-colors duration-150">
                    <td className="px-4 py-3 font-semibold text-lg text-gray-900 flex items-center gap-2">
                      <Home size={18} className="text-gray-500" /> {p.title}
                    </td>
                    <td className="px-4 py-3 text-gray-700">{formatCurrency(p.price)}</td>
                    <td className="px-4 py-3">
                      <span
                        className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                          p.status === 'Published'
                            ? 'bg-emerald-100 text-emerald-700'
                            : 'bg-amber-100 text-amber-700'
                        }`}
                      >
                        {p.status === 'Published' ? <CheckCircle size={14} className="mr-1" /> : <XCircle size={14} className="mr-1" />}
                        {p.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-gray-700 flex items-center gap-2">
                      <Eye size={16} className="text-gray-400" /> {p.views ?? 0}
                    </td>
                    <td className="px-4 py-3 text-center">
                      <div className="flex justify-center gap-2">
                        <Link
                          to={`/properties/${p.id}`}
                          className="p-2 rounded-full text-blue-600 hover:bg-blue-100 transition-colors"
                          title="View Property"
                        >
                          <Eye size={18} />
                        </Link>
                        {/* Removed Edit and Delete buttons as properties are only to be viewed */}
                        {/*
                        <button
                          onClick={() => console.log('Edit listing:', p.id)} // Placeholder for edit
                          className="p-2 rounded-full text-blue-600 hover:bg-blue-100 transition-colors"
                          title="Edit Listing"
                        >
                          <Edit size={18} />
                        </button>
                        <button
                          onClick={() => console.log('Delete listing:', p.id)} // Placeholder for delete
                          className="p-2 rounded-full text-red-600 hover:bg-red-100 transition-colors"
                          title="Delete Listing"
                        >
                          <Trash2 size={18} />
                        </button>
                        */}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="p-6 text-center text-gray-500 text-lg">You have no active listings.</p>
        )}
      </div>

      {/* Removed Enquiries table from Broker Dashboard */}
      {/*
      <div className="bg-white p-6 rounded-xl shadow-xl border border-gray-100">
        <h2 className="text-2xl font-bold text-gray-900 border-b-4 border-blue-500 pb-4 mb-6 inline-block">Your Enquiries</h2>
        {enquiries.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="min-w-full text-left">
              <thead className="bg-blue-50 text-blue-800 text-sm uppercase tracking-wider">
                <tr>
                  <th className="px-4 py-3 rounded-tl-lg">From</th>
                  <th className="px-4 py-3">Property</th>
                  <th className="px-4 py-3">Message</th>
                  <th className="px-4 py-3 rounded-tr-lg">Date</th>
                </tr>
              </thead>
              <tbody>
                {enquiries.map((e) => (
                  <tr key={e._id} className="border-b border-gray-200 hover:bg-gray-50 transition-colors duration-150">
                    <td className="px-4 py-3 text-gray-900 font-semibold flex items-center gap-2">
                      <User size={18} className="text-gray-500" /> {e.userId?.name || 'N/A'}
                    </td>
                    <td className="px-4 py-3 text-gray-700 flex items-center gap-2">
                      <Home size={16} className="text-gray-400" /> {e.propertyId?.title || 'N/A'}
                    </td>
                    <td className="px-4 py-3 text-gray-700 flex items-center gap-2">
                      <MessageSquare size={16} className="text-gray-400" /> {e.message}
                    </td>
                    <td className="px-4 py-3 text-gray-700 flex items-center gap-2">
                      <Calendar size={16} className="text-gray-400" /> {new Date(e.createdAt).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="p-6 text-center text-gray-500 text-lg">No enquiries yet.</p>
        )}
      </div>
      */}
    </section>
  );
}
