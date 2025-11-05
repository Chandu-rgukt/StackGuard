import React from 'react'
import Logo from '../common/Logo'

const DashboardPage = ({ onSignOut }) => {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b shadow-sm flex items-center justify-between px-8 py-4">
        <Logo />
        <button
          onClick={onSignOut}
          className="text-sm text-gray-700 font-medium hover:text-purple-700 transition-colors"
        >
          Sign out
        </button>
      </header>

      <main className="p-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Welcome to Stackguard</h1>
        <p className="text-gray-600 mb-6">
          Your repositories are secure. Start scanning or view security reports.
        </p>

        <div className="bg-white p-6 rounded-xl shadow-sm border">
          <h2 className="text-xl font-semibold text-gray-800 mb-2">Recent Activity</h2>
          <p className="text-gray-600">No recent scans yet — run your first one soon!</p>
        </div>
      </main>
    </div>
  )
}

export default DashboardPage
