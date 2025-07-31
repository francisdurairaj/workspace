import React from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { Button } from './ui/button'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { inviteAPI } from '../services/api'
import { useToast } from '../hooks/use-toast'
import { RefreshCw, Send } from 'lucide-react'

const InviteTable = () => {
  const { toast } = useToast()
  const queryClient = useQueryClient()

  // Fetch invites
  const { data: invites = [], isLoading, error, refetch } = useQuery({
    queryKey: ['invites'],
    queryFn: () => inviteAPI.getInvites().then(res => res.data),
    refetchInterval: 30000, // Refetch every 30 seconds
  })

  // Resend invite mutation
  const resendMutation = useMutation({
    mutationFn: (inviteId) => inviteAPI.resendInvite(inviteId),
    onSuccess: () => {
      toast({
        title: "Success",
        description: "Invite resent successfully!",
      })
      queryClient.invalidateQueries(['invites'])
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: error.response?.data?.message || "Failed to resend invite",
        variant: "destructive",
      })
    },
  })

  const handleResend = (inviteId) => {
    resendMutation.mutate(inviteId)
  }

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
      case 'pending':
        return `${baseClasses} bg-yellow-100 text-yellow-800`
      default:
        return `${baseClasses} bg-gray-100 text-gray-800`
    }
  }

  if (error) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="text-center text-red-600">
            <p>Error loading invites: {error.message}</p>
            <Button onClick={() => refetch()} className="mt-4">
              <RefreshCw className="w-4 h-4 mr-2" />
              Retry
            </Button>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>HackerRank Test Invitations</CardTitle>
        <Button onClick={() => refetch()} variant="outline" size="sm">
          <RefreshCw className="w-4 h-4 mr-2" />
          Refresh
        </Button>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="flex justify-center items-center py-8">
            <RefreshCw className="w-6 h-6 animate-spin" />
            <span className="ml-2">Loading invites...</span>
          </div>
        ) : invites.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            No invites found. Send your first invite to get started!
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Test Name</TableHead>
                <TableHead>Sent Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {invites.map((invite) => (
                <TableRow key={invite.id}>
                  <TableCell className="font-medium">{invite.candidateName}</TableCell>
                  <TableCell>{invite.candidateEmail}</TableCell>
                  <TableCell>{invite.testName}</TableCell>
                  <TableCell>{formatDate(invite.sentDate)}</TableCell>
                  <TableCell>
                    <span className={getStatusBadge(invite.status)}>
                      {invite.status || 'Pending'}
                    </span>
                  </TableCell>
                  <TableCell>
                    <Button
                      onClick={() => handleResend(invite.id)}
                      disabled={resendMutation.isPending}
                      size="sm"
                      variant="outline"
                    >
                      <Send className="w-4 h-4 mr-2" />
                      {resendMutation.isPending ? 'Sending...' : 'Resend'}
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </CardContent>
    </Card>
  )
}

export default InviteTable