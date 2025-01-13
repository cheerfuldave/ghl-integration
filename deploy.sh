#!/bin/bash
# Install dependencies
npm install

# Build the project
npm run build

# Deploy using Vercel CLI with environment variables
vercel deploy --prod \
  --env OPENAI_API_KEY=$OPENAI_API_KEY \
  --env PRIVATE_INTEGRATION_API_KEY=$PRIVATE_INTEGRATION_API_KEY \
  --env PRIVATE_INTEGRATION_API_URL=$PRIVATE_INTEGRATION_API_URL \
  --env GHL_LOCATION_ID=$GHL_LOCATION_ID
