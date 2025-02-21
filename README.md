
# Function Flow Visualizer

A modern web application for visualizing function call flows and managing mock configurations. Built with React, TypeScript, and React Flow.

## Features

### 1. Function Flow Visualization
- Interactive graph visualization of function calls and their relationships
- Smooth animated connections between nodes
- Zoomable and pannable canvas
- Minimap for easy navigation
- Copy function names with a single click
- Clear visualization of function parameters and return types

### 2. Mock Configuration
- Select specific functions to mock
- Visual dependency tree
- Persistent configuration storage
- Easy-to-use interface for managing mock settings

### 3. Database Configuration
- Toggle between real and mocked database
- Configure database credentials
- Secure credential management
- Automatic configuration persistence

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn package manager

### Installation

```bash
# Clone the repository
git clone https://github.com/Vikassinghrathor/potpie-flow-builder.git

# Navigate to project directory
cd flow-builder

# Install dependencies
npm install

# Start development server
npm run dev
```

### Environment Setup

The application requires the following environment variables:

```env
VITE_API_BASE_URL=your_api_base_url
```

## API Endpoints

The application interacts with the following API endpoints:

### GET /graph
Retrieves the function call graph data.

### GET /dependencies
Fetches the list of available dependencies that can be mocked.
Query Parameters:
- `flow`: The name of the flow to get dependencies for

### GET /configuration
Retrieves the current configuration for a specific flow.
Query Parameters:
- `flow`: The name of the flow to get configuration for

### POST /configuration
Saves the configuration settings.
Request Body:
```json
{
  "flow": "string",
  "entities_to_mock": ["string"],
  "is_db_mocked": boolean,
  "db_config": {
    "username": "string",
    "password": "string",
    "hostname": "string"
  }
}
```

## Technology Stack

- **React**: Frontend framework
- **TypeScript**: Type safety and better developer experience
- **React Flow**: Graph visualization
- **Tailwind CSS**: Styling
- **Axios**: API communication
- **Vite**: Build tool and development server

## Project Structure

```
src/
├── components/
│   ├── flows/
│   │   ├── FlowCanvas.tsx    # Graph visualization component
│   │   ├── FlowSidebar.tsx   # Configuration sidebar
│   │   └── ConfigPanel.tsx   # Configuration panel
├── services/
│   └── api.ts               # API integration
├── types/
│   └── graph.ts            # TypeScript type definitions
└── pages/
    └── Index.tsx           # Main page component
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

For support, please open an issue in the GitHub repository or contact the development team.
