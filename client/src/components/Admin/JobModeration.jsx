import React, { useState } from 'react';

function JobModeration() {
  const [jobs] = useState([
    {
      id: 1,
      title: 'Senior Developer',
      company: 'Tech Corp',
      status: 'pending',
      postedDate: '2023-12-20',
    },
    {
      id: 2,
      title: 'Product Manager',
      company: 'Innovation Inc',
      status: 'approved',
      postedDate: '2023-12-19',
    },
    {
      id: 3,
      title: 'UI/UX Designer',
      company: 'Design Studio',
      status: 'rejected',
      postedDate: '2023-12-18',
    },
  ]);

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">Job Moderation</h2>
        <div className="flex space-x-4">
          <select className="border rounded px-3 py-2">
            <option value="all">All Status</option>
            <option value="pending">Pending</option>
            <option value="approved">Approved</option>
            <option value="rejected">Rejected</option>
          </select>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white">
          <thead>
            <tr className="bg-gray-100">
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Job Title</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Company</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Posted Date</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {jobs.map(job => (
              <tr key={job.id}>
                <td className="px-6 py-4 whitespace-nowrap">{job.title}</td>
                <td className="px-6 py-4 whitespace-nowrap">{job.company}</td>
                <td className="px-6 py-4 whitespace-nowrap">{job.postedDate}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    job.status === 'approved' ? 'bg-green-100 text-green-800' :
                    job.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {job.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <button className="text-blue-600 hover:text-blue-900 mr-4">View</button>
                  <button className="text-green-600 hover:text-green-900 mr-4">Approve</button>
                  <button className="text-red-600 hover:text-red-900">Reject</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default JobModeration;