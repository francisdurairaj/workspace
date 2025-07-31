# HR Interview Dashboard

A modern React dashboard for HR teams to manage HackerRank test invitations and track candidate progress.

## Features

- **Dashboard Overview**: View all sent invitations in a clean, organized table
- **Send Invites**: Easy-to-use form for sending new HackerRank test invitations
- **Track Status**: Monitor candidate test status (Attended / Not Attended / Pending)
- **Resend Functionality**: Quickly resend invitations to candidates
- **Real-time Updates**: Automatic refresh of invitation status
- **Responsive Design**: Works seamlessly on desktop and mobile devices

## Tech Stack

- **Frontend**: React 18 with Vite
- **UI Components**: ShadCN UI with Tailwind CSS
- **State Management**: React Query for server state
- **HTTP Client**: Axios
- **Icons**: Lucide React
- **Styling**: Tailwind CSS

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open your browser and navigate to `http://localhost:12000`

## Development

The application currently uses mock data for development. To switch to a real backend API:

1. Set the environment variable `VITE_USE_MOCK_DATA=false`
2. Configure `VITE_API_BASE_URL` to point to your backend API

### Environment Variables

Create a `.env` file in the root directory:

```env
VITE_API_BASE_URL=http://localhost:3000
VITE_USE_MOCK_DATA=true
```

## API Integration

The dashboard expects the following API endpoints:

- `GET /api/invites` - Get list of all invitations
- `POST /api/invites` - Send new invitation
- `POST /api/invites/{id}/resend` - Resend invitation
- `GET /api/tests` - Get available tests for dropdown

### API Data Structure

**Invite Object:**
```json
{
  "id": "string",
  "candidateName": "string",
  "candidateEmail": "string",
  "testName": "string",
  "testId": "string",
  "sentDate": "ISO date string",
  "status": "Attended | Not Attended | Pending",
  "deadline": "ISO date string"
}
```

**Test Object:**
```json
{
  "id": "string",
  "name": "string",
  "description": "string",
  "duration": "number (minutes)"
}
```

## Components

- **InviteTable**: Displays all invitations with status and actions
- **SendInviteForm**: Form for creating new invitations
- **UI Components**: Reusable ShadCN UI components (Button, Input, Table, etc.)

## Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

This project is licensed under the MIT License.