
# Deployment Instructions

1. Install Vercel CLI:
   ```bash
   npm i -g vercel
   ```

2. Login to Vercel:
   ```bash
   vercel login
   ```

3. Set up environment variables in Vercel:
   - OPENAI_API_KEY
   - GHL_API_KEY
   - Any other required API keys

4. Deploy to Vercel:
   ```bash
   vercel
   ```

5. For production deployment:
   ```bash
   vercel --prod
   ```

Note: Make sure all environment variables are properly set in the Vercel dashboard.
