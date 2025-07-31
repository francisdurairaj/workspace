import axios from 'axios'
import { mockAPI } from './mockData'

const API_BASE_URL = process.env.VITE_API_BASE_URL || 'http://localhost:3000'
const USE_MOCK_DATA = process.env.VITE_USE_MOCK_DATA !== 'false' // Default to true for development

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

// API endpoints
export const inviteAPI = {
  // Get all invites
  getInvites: () => USE_MOCK_DATA ? mockAPI.getInvites() : api.get('/api/invites'),
  
  // Send new invite
  sendInvite: (inviteData) => USE_MOCK_DATA ? mockAPI.sendInvite(inviteData) : api.post('/api/invites', inviteData),
  
  // Resend invite
  resendInvite: (inviteId) => USE_MOCK_DATA ? mockAPI.resendInvite(inviteId) : api.post(`/api/invites/${inviteId}/resend`),
  
  // Get available tests (for dropdown)
  getTests: () => USE_MOCK_DATA ? mockAPI.getTests() : api.get('/api/tests'),
}

export default api