import React from "react";

export default function DashboardPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">Dashboard</h1>
      <p>
        Welcome to your dashboard! Here you can manage your settings, view
        stats, and more.
      </p>

      {/* Example content cards */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded shadow p-4">
          <h2 className="font-semibold mb-2">Profile</h2>
          <p>Update your personal info and preferences.</p>
        </div>
        <div className="bg-white rounded shadow p-4">
          <h2 className="font-semibold mb-2">Billing</h2>
          <p>Manage your subscription and payment methods.</p>
        </div>
        <div className="bg-white rounded shadow p-4">
          <h2 className="font-semibold mb-2">Analytics</h2>
          <p>View your app usage and performance data.</p>
        </div>
      </div>
    </div>
  );
}
