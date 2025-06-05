import React, { useState } from 'react';
import UserManagement from './UserManagement';
import JobModeration from './JobModeration';

function Dashboard() {
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
      
      <div className="mb-6">
        <nav className="flex space-x-4">
          <button
            className={`px-4 py-2 rounded-lg ${activeTab === 'overview' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
            onClick={() => setActiveTab('overview')}
          >
            Overview
          </button>
          <button
            className={`px-4 py-2 rounded-lg ${activeTab === 'users' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
            onClick={() => setActiveTab('users')}
          >
            Users
          </button>
          <button
            className={`px-4 py-2 rounded-lg ${activeTab === 'jobs' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
            onClick={() => setActiveTab('jobs')}
          >
            Jobs
          </button>
        </nav>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-blue-50 p-6 rounded-lg">
              <h2 className="text-xl font-semibold mb-2">Users</h2>
              <p className="text-gray-600">Total Users: 150</p>
              <p className="text-gray-600">New Today: 5</p>
            </div>
            <div className="bg-green-50 p-6 rounded-lg">
              <h2 className="text-xl font-semibold mb-2">Jobs</h2>
              <p className="text-gray-600">Active Jobs: 45</p>
              <p className="text-gray-600">Pending Review: 3</p>
            </div>
            <div className="bg-purple-50 p-6 rounded-lg">
              <h2 className="text-xl font-semibold mb-2">Applications</h2>
              <p className="text-gray-600">Total Applications: 320</p>
              <p className="text-gray-600">This Week: 28</p>
            </div>
          </div>
        )}
        {activeTab === 'users' && <UserManagement />}
        {activeTab === 'jobs' && <JobModeration />}
      </div>
    </div>
  );
}

export default Dashboard;