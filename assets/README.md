# Write English. Get Commands.

A modern React app that converts plain English descriptions into executable shell commands using AI inference.

## Features

- **Simple Interface**: Clean, minimal design for focused command generation
- **Multi-OS Support**: Choose between Linux, macOS, and Windows (PowerShell)
- **Copy to Clipboard**: One-click command copying with visual feedback
- **Real-time Feedback**: Loading states, error handling, and success indicators
- **Accessible & Responsive**: Works seamlessly on desktop and mobile
- **Keyboard Shortcuts**: Press Enter to generate commands
- **Dark Theme**: Easy on the eyes with a modern gradient background

## Setup

### Prerequisites
- Node.js 18+
- A backend server running on `http://localhost:8000` with the `/api/infer` endpoint

### Installation

1. Clone the repository and install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

The app will be available at `http://localhost:5173`

### Building for Production

```bash
npm run build
npm run preview
```

## API Integration

The app communicates with a backend `/api/infer` endpoint expecting:

**Request:**
```json
{
  "prompt": "description of what to do",
  "os": "linux|macos|windows"
}
```

**Response:**
```json
{
  "command": "executable command here"
}
```

### Configuring API Endpoint

If your backend runs on a different port or domain, update the proxy in `vite.config.js`:
```javascript
server: {
  proxy: {
    '/api': 'http://your-backend:port'
  }
}
```

## Project Structure

```
.
├── index.html           # Entry HTML
├── vite.config.js       # Vite configuration
├── package.json         # Dependencies
├── src/
│   ├── App.jsx         # Main component
│   ├── index.css       # Global styles
│   └── main.jsx        # React entry point
```

## Development

- The app uses React 18 with Vite for fast development
- CSS is organized with CSS variables for easy theming
- All interactive elements are fully accessible with ARIA labels
- Mobile-first responsive design

## Security Notes

Always review the generated commands before execution. The app includes a reminder in the footer about mandatory review and risk checks before running any commands.
