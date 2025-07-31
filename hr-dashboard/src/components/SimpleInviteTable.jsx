import React from 'react'

const SimpleInviteTable = () => {
  const mockInvites = [
    {
      id: '1',
      candidateName: 'John Doe',
      candidateEmail: 'john.doe@example.com',
      testName: 'JavaScript Developer Assessment',
      sentDate: '2025-07-30T10:30:00Z',
      status: 'Attended'
    },
    {
      id: '2',
      candidateName: 'Jane Smith',
      candidateEmail: 'jane.smith@example.com',
      testName: 'React Frontend Challenge',
      sentDate: '2025-07-29T14:15:00Z',
      status: 'Not Attended'
    }
  ]

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    })
  }

  const getStatusBadge = (status) => {
    const baseClasses = "px-2 py-1 rounded-full text-xs font-medium"
    switch (status?.toLowerCase()) {
      case 'attended':
        return `${baseClasses} bg-green-100 text-green-800`
      case 'not attended':
        return `${baseClasses} bg-red-100 text-red-800`
      default:
        return `${baseClasses} bg-yellow-100 text-yellow-800`
    }
  }

  return (
    <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
      <div className="flex flex-row items-center justify-between p-6">
        <h3 className="text-2xl font-semibold leading-none tracking-tight">
          HackerRank Test Invitations
        </h3>
        <button className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-gray-300 bg-white hover:bg-gray-50 hover:text-gray-900 h-9 px-3">
          Refresh
        </button>
      </div>
      <div className="p-6 pt-0">
        <div className="w-full">
          <table className="w-full caption-bottom text-sm">
            <thead className="[&_tr]:border-b">
              <tr className="border-b transition-colors hover:bg-gray-50/50 data-[state=selected]:bg-gray-50">
                <th className="h-12 px-4 text-left align-middle font-medium text-gray-500 [&:has([role=checkbox])]:pr-0">
                  Name
                </th>
                <th className="h-12 px-4 text-left align-middle font-medium text-gray-500 [&:has([role=checkbox])]:pr-0">
                  Email
                </th>
                <th className="h-12 px-4 text-left align-middle font-medium text-gray-500 [&:has([role=checkbox])]:pr-0">
                  Test Name
                </th>
                <th className="h-12 px-4 text-left align-middle font-medium text-gray-500 [&:has([role=checkbox])]:pr-0">
                  Sent Date
                </th>
                <th className="h-12 px-4 text-left align-middle font-medium text-gray-500 [&:has([role=checkbox])]:pr-0">
                  Status
                </th>
                <th className="h-12 px-4 text-left align-middle font-medium text-gray-500 [&:has([role=checkbox])]:pr-0">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="[&_tr:last-child]:border-0">
              {mockInvites.map((invite) => (
                <tr key={invite.id} className="border-b transition-colors hover:bg-gray-50/50 data-[state=selected]:bg-gray-50">
                  <td className="p-4 align-middle [&:has([role=checkbox])]:pr-0 font-medium">
                    {invite.candidateName}
                  </td>
                  <td className="p-4 align-middle [&:has([role=checkbox])]:pr-0">
                    {invite.candidateEmail}
                  </td>
                  <td className="p-4 align-middle [&:has([role=checkbox])]:pr-0">
                    {invite.testName}
                  </td>
                  <td className="p-4 align-middle [&:has([role=checkbox])]:pr-0">
                    {formatDate(invite.sentDate)}
                  </td>
                  <td className="p-4 align-middle [&:has([role=checkbox])]:pr-0">
                    <span className={getStatusBadge(invite.status)}>
                      {invite.status}
                    </span>
                  </td>
                  <td className="p-4 align-middle [&:has([role=checkbox])]:pr-0">
                    <button className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-gray-300 bg-white hover:bg-gray-50 hover:text-gray-900 h-9 px-3">
                      Resend
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default SimpleInviteTable