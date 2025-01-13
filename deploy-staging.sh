#!/bin/bash
set -e

echo "Starting deployment to staging environment..."

# Install dependencies
npm install

# Run tests
echo "Running test suite..."
npm test

# Build the project
echo "Building project..."
npm run build

# Deploy to staging
echo "Deploying to staging environment..."
if [ "$CI" = "true" ]; then
    # CI/CD deployment commands
    aws s3 sync ./dist s3://staging-bucket/ghl-integration/
    aws cloudfront create-invalidation --distribution-id STAGING_DISTRIBUTION_ID --paths "/*"
else
    # Local deployment
    docker build -t ghl-integration:staging .
    docker tag ghl-integration:staging registry.staging/ghl-integration:latest
    docker push registry.staging/ghl-integration:latest
fi

echo "Deployment to staging complete!"
