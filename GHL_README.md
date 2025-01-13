## GHL Integration

This project includes integration with GoHighLevel (GHL) API for enhanced chat functionality. The integration provides:

- Real-time contact information
- Task management
- Context-aware responses

### Setup

1. Copy `.env.local` to your project root
2. Update the environment variables with your GHL credentials
3. Install dependencies:
   ```bash
   npm install axios
   ```

### Usage

The GHL integration is automatically loaded with the chat component. It provides:

- Contact information context
- Task management integration
- Enhanced AI responses with GHL context

### API Endpoints

All GHL API calls use the base URL: https://services.leadconnectorhq.com

### Testing

Run the integration tests:
```bash
npm test ghl-integration.test.ts
```
