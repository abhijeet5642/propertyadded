import React from 'react';
import { Link } from 'react-router-dom';
import { Users, MapPin } from 'lucide-react'; // Only import the icons needed

export default function Dashboard() {
  return (
    <section className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-5xl mx-auto space-y-12">
        <div className="text-center">
          <h1 className="text-5xl font-extrabold text-gray-900 leading-tight">
            Admin <span className="text-indigo-600">Dashboard</span>
          </h1>
          <p className="mt-4 text-xl text-gray-600">
            Streamline your workflow with essential management tools.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Manage Brokers Card */}
          <Link
            to="users"
            className="group flex flex-col items-center justify-center p-10 bg-white rounded-3xl shadow-lg border border-gray-200
                       hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1
                       focus:outline-none focus:ring-4 focus:ring-indigo-500 focus:ring-opacity-50"
          >
            <div className="text-indigo-600 mb-6 transition-all duration-300 group-hover:scale-110">
              <Users size={80} strokeWidth={1.5} />
            </div>
            <span className="text-3xl font-bold text-gray-900 mb-2">Manage Brokers</span>
            <p className="text-gray-600 text-center text-lg">
              View, edit, and approve broker accounts and manage their activities.
            </p>
          </Link>

          {/* Manage Sites Card */}
          <Link
            to="properties"
            className="group flex flex-col items-center justify-center p-10 bg-white rounded-3xl shadow-lg border border-gray-200
                       hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1
                       focus:outline-none focus:ring-4 focus:ring-indigo-500 focus:ring-opacity-50"
          >
            <div className="text-indigo-600 mb-6 transition-all duration-300 group-hover:scale-110">
              <MapPin size={80} strokeWidth={1.5} />
            </div>
            <span className="text-3xl font-bold text-gray-900 mb-2">Manage Sites</span>
            <p className="text-gray-600 text-center text-lg">
              Add new properties, update existing listings, and manage locations.
            </p>
          </Link>
        </div>
      </div>
    </section>
  );
}