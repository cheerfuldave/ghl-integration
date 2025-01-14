# Integration Instructions for Vercel AI SDK

## Overview
This guide provides step-by-step instructions to integrate the GoHighLevel API into the Vercel AI SDK. The integration allows seamless interaction with the GHL API for managing contacts, tasks, opportunities, and more.

## Prerequisites
1. A valid GoHighLevel API token with appropriate permissions.
2. A Vercel account and the Vercel CLI installed.
3. Node.js installed on your local machine.

## Steps to Integrate

### 1. Clone the Repository
Clone your Vercel AI SDK project repository or create a new one.

```bash
git clone <your-repo-url>
cd <your-repo-directory>
```

### 2. Add the GHL API Integration
Copy the `ghl-api.js` file into your project directory. This file contains the GHL API integration logic.

### 3. Update Environment Variables
Add the following environment variables to your `.env` file:

```
PRIVATE_INTEGRATION_API_KEY=<your-api-token>
GHL_LOCATION_ID=<your-location-id>
```

### 4. Update Vercel Configuration
Replace the `vercel.json` file in your project with the provided one. This file ensures the correct environment variables are used during deployment.

### 5. Test the Integration
Run the following command to test the integration locally:

```bash
vercel dev
```

### 6. Deploy to Production
Deploy the project to Vercel:

```bash
vercel --prod
```

## Example Usage
Here is an example of how to use the GHL API integration in your project:

```javascript
import { GHLIntegration } from './ghl-api';

const ghl = new GHLIntegration();

ghl.getContacts().then(contacts => {
    console.log('Contacts:', contacts);
}).catch(error => {
    console.error('Error fetching contacts:', error);
});
```

## Support
For any issues or questions, contact support at team@julius.ai.
