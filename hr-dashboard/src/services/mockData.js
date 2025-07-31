// Mock data for development
export const mockInvites = [
  {
    id: '1',
    candidateName: 'John Doe',
    candidateEmail: 'john.doe@example.com',
    testName: 'JavaScript Developer Assessment',
    testId: 'js-dev-001',
    sentDate: '2025-07-30T10:30:00Z',
    status: 'Attended',
    deadline: '2025-08-05T23:59:00Z'
  },
  {
    id: '2',
    candidateName: 'Jane Smith',
    candidateEmail: 'jane.smith@example.com',
    testName: 'React Frontend Challenge',
    testId: 'react-001',
    sentDate: '2025-07-29T14:15:00Z',
    status: 'Not Attended',
    deadline: '2025-08-03T23:59:00Z'
  },
  {
    id: '3',
    candidateName: 'Mike Johnson',
    candidateEmail: 'mike.johnson@example.com',
    testName: 'Full Stack Developer Test',
    testId: 'fullstack-001',
    sentDate: '2025-07-31T09:00:00Z',
    status: 'Pending',
    deadline: '2025-08-07T23:59:00Z'
  },
  {
    id: '4',
    candidateName: 'Sarah Wilson',
    candidateEmail: 'sarah.wilson@example.com',
    testName: 'Python Backend Assessment',
    testId: 'python-001',
    sentDate: '2025-07-28T16:45:00Z',
    status: 'Attended',
    deadline: '2025-08-02T23:59:00Z'
  }
]

export const mockTests = [
  {
    id: 'js-dev-001',
    name: 'JavaScript Developer Assessment',
    description: 'Comprehensive JavaScript skills test',
    duration: 120
  },
  {
    id: 'react-001',
    name: 'React Frontend Challenge',
    description: 'React and modern frontend development test',
    duration: 90
  },
  {
    id: 'fullstack-001',
    name: 'Full Stack Developer Test',
    description: 'Complete full stack development assessment',
    duration: 180
  },
  {
    id: 'python-001',
    name: 'Python Backend Assessment',
    description: 'Python backend development and API design',
    duration: 150
  },
  {
    id: 'node-001',
    name: 'Node.js Backend Test',
    description: 'Node.js and Express.js backend development',
    duration: 120
  }
]

// Simulate API delay
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms))

// Mock API functions
export const mockAPI = {
  getInvites: async () => {
    await delay(500) // Simulate network delay
    return { data: mockInvites }
  },
  
  sendInvite: async (inviteData) => {
    await delay(800)
    const newInvite = {
      id: Date.now().toString(),
      ...inviteData,
      sentDate: new Date().toISOString(),
      status: 'Pending'
    }
    mockInvites.unshift(newInvite)
    return { data: newInvite }
  },
  
  resendInvite: async (inviteId) => {
    await delay(600)
    const invite = mockInvites.find(inv => inv.id === inviteId)
    if (invite) {
      invite.sentDate = new Date().toISOString()
    }
    return { data: invite }
  },
  
  getTests: async () => {
    await delay(300)
    return { data: mockTests }
  }
}