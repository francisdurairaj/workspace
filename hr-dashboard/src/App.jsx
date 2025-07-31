import React from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import InviteTable from './components/InviteTable'
import SendInviteForm from './components/SendInviteForm'
import { Toaster } from './components/Toaster'
import { Users, BarChart3 } from 'lucide-react'

// Create a client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
})

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <header className="bg-white shadow-sm border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center py-6">
              <div className="flex items-center">
                <BarChart3 className="h-8 w-8 text-blue-600 mr-3" />
                <h1 className="text-2xl font-bold text-gray-900">HR Interview Dashboard</h1>
              </div>
              <div className="flex items-center space-x-4 text-sm text-gray-600">
                <div className="flex items-center">
                  <Users className="h-4 w-4 mr-1" />
                  <span>HackerRank Integration</span>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="space-y-8">
            {/* Send Invite Form */}
            <SendInviteForm />
            
            {/* Invites Table */}
            <InviteTable />
          </div>
        </main>

        {/* Footer */}
        <footer className="bg-white border-t mt-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="text-center text-sm text-gray-500">
              <p>HR Interview Dashboard - Manage HackerRank test invitations</p>
            </div>
          </div>
        </footer>
      </div>
      
      {/* Toast notifications */}
      <Toaster />
    </QueryClientProvider>
  )
}

export default App
