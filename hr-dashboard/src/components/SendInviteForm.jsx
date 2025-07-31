import React, { useState } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { Label } from './ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { inviteAPI } from '../services/api'
import { useToast } from '../hooks/use-toast'
import { Send, Loader2 } from 'lucide-react'

const SendInviteForm = () => {
  const { toast } = useToast()
  const queryClient = useQueryClient()
  
  const [formData, setFormData] = useState({
    candidateName: '',
    candidateEmail: '',
    testId: '',
    deadline: '',
  })

  // Fetch available tests
  const { data: tests = [], isLoading: testsLoading } = useQuery({
    queryKey: ['tests'],
    queryFn: () => inviteAPI.getTests().then(res => res.data),
  })

  // Send invite mutation
  const sendInviteMutation = useMutation({
    mutationFn: (inviteData) => inviteAPI.sendInvite(inviteData),
    onSuccess: () => {
      toast({
        title: "Success",
        description: "Invite sent successfully!",
      })
      // Reset form
      setFormData({
        candidateName: '',
        candidateEmail: '',
        testId: '',
        deadline: '',
      })
      // Refresh invites list
      queryClient.invalidateQueries(['invites'])
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: error.response?.data?.message || "Failed to send invite",
        variant: "destructive",
      })
    },
  })

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    
    // Basic validation
    if (!formData.candidateName || !formData.candidateEmail || !formData.testId || !formData.deadline) {
      toast({
        title: "Validation Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      })
      return
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(formData.candidateEmail)) {
      toast({
        title: "Validation Error",
        description: "Please enter a valid email address",
        variant: "destructive",
      })
      return
    }

    // Date validation (deadline should be in the future)
    const deadlineDate = new Date(formData.deadline)
    const now = new Date()
    if (deadlineDate <= now) {
      toast({
        title: "Validation Error",
        description: "Deadline must be in the future",
        variant: "destructive",
      })
      return
    }

    sendInviteMutation.mutate(formData)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Send New Invite</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="candidateName">Candidate Name *</Label>
              <Input
                id="candidateName"
                type="text"
                placeholder="Enter candidate name"
                value={formData.candidateName}
                onChange={(e) => handleInputChange('candidateName', e.target.value)}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="candidateEmail">Email Address *</Label>
              <Input
                id="candidateEmail"
                type="email"
                placeholder="candidate@example.com"
                value={formData.candidateEmail}
                onChange={(e) => handleInputChange('candidateEmail', e.target.value)}
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="testId">Test *</Label>
              <Select
                value={formData.testId}
                onValueChange={(value) => handleInputChange('testId', value)}
                required
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select a test" />
                </SelectTrigger>
                <SelectContent>
                  {testsLoading ? (
                    <SelectItem value="" disabled>
                      <Loader2 className="w-4 h-4 animate-spin mr-2" />
                      Loading tests...
                    </SelectItem>
                  ) : tests.length === 0 ? (
                    <SelectItem value="" disabled>
                      No tests available
                    </SelectItem>
                  ) : (
                    tests.map((test) => (
                      <SelectItem key={test.id} value={test.id}>
                        {test.name}
                      </SelectItem>
                    ))
                  )}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="deadline">Deadline *</Label>
              <Input
                id="deadline"
                type="datetime-local"
                value={formData.deadline}
                onChange={(e) => handleInputChange('deadline', e.target.value)}
                min={new Date().toISOString().slice(0, 16)}
                required
              />
            </div>
          </div>

          <div className="flex justify-end">
            <Button
              type="submit"
              disabled={sendInviteMutation.isPending}
              className="min-w-[120px]"
            >
              {sendInviteMutation.isPending ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Sending...
                </>
              ) : (
                <>
                  <Send className="w-4 h-4 mr-2" />
                  Send Invite
                </>
              )}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}

export default SendInviteForm