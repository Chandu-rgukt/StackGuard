import React, { useState } from 'react'
import { CheckCircle } from 'lucide-react'
import LoaderButton from '../common/LoaderButton'
import Logo from '../common/Logo'

const ConfigPage = ({ onConfigSuccess, onSignOut }) => {
  const [key, setKey] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [verified, setVerified] = useState(false)

  const handleVerify = async () => {
    setIsLoading(true)
    await new Promise((r) => setTimeout(r, 800))
    if (key.trim()) {
      setVerified(true)
      setTimeout(onConfigSuccess, 1000)
    }
    setIsLoading(false)
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
      <div className="w-full max-w-md p-8 bg-white rounded-2xl shadow-md text-center">
        <Logo />
        <h2 className="text-2xl font-bold text-gray-900 mt-6 mb-2">Enter Config Key</h2>
        <p className="text-gray-600 mb-6">Set your Stackguard configuration to proceed.</p>

        <input
          type="text"
          placeholder="Enter API key"
          value={key}
          onChange={(e) => setKey(e.target.value)}
          className="w-full px-4 py-3 mb-6 rounded-lg bg-gray-100 border border-transparent focus:outline-none focus:ring-2 focus:ring-purple-500 focus:bg-white"
        />

        {verified && (
          <div className="text-green-600 flex justify-center items-center mb-4">
            <CheckCircle className="w-5 h-5 mr-2" /> Key verified successfully
          </div>
        )}

        <LoaderButton
          isLoading={isLoading}
          text="Verify Key"
          loadingText="Verifying..."
          onClick={handleVerify}
          className="bg-purple-700 hover:bg-purple-800 text-white"
        />

        <button onClick={onSignOut} className="mt-4 text-sm text-gray-600 hover:text-gray-800 underline">
          Sign out
        </button>
      </div>
    </div>
  )
}

export default ConfigPage
