# Vercel Deployment Guide for Lock and Load Sponsors

This guide provides step-by-step instructions for deploying the Lock and Load Sponsors application to Vercel.

## Prerequisites

- GitHub account with access to the repository
- Vercel account (free tier available)
- Node.js installed locally (for testing)

## Step-by-Step Deployment

### 1. Prepare the Repository

Ensure your code is pushed to GitHub:
```bash
git add .
git commit -m "Prepare for Vercel deployment"
git push origin main
```

### 2. Create Vercel Account

1. Go to [vercel.com](https://vercel.com)
2. Click "Sign Up" or "Log In"
3. Choose "Continue with GitHub" to link your GitHub account
4. Authorize Vercel to access your GitHub repositories

### 3. Import Project

1. In your Vercel dashboard, click "New Project"
2. Find and select "AidenClark1980/lock-and-load-sponsors" from your repositories
3. Click "Import"

### 4. Configure Build Settings

Vercel should auto-detect the project settings, but verify:

- **Framework Preset**: Vite
- **Root Directory**: `./` (leave as default)
- **Build Command**: `npm run build`
- **Output Directory**: `dist`
- **Install Command**: `npm install`

### 5. Environment Variables

Add the following environment variables in Vercel dashboard:

1. Go to Project Settings → Environment Variables
2. Add each variable:

```
NEXT_PUBLIC_CHAIN_ID=11155111
NEXT_PUBLIC_RPC_URL=your_rpc_endpoint_here
NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID=your_walletconnect_project_id_here
NEXT_PUBLIC_INFURA_API_KEY=your_infura_api_key_here
```

### 6. Deploy

1. Click "Deploy" button
2. Wait for the build process to complete (usually 2-3 minutes)
3. Your app will be available at the provided Vercel URL

### 7. Custom Domain (Optional)

1. Go to Project Settings → Domains
2. Add your custom domain
3. Configure DNS records as instructed by Vercel
4. Wait for SSL certificate to be issued

## Post-Deployment Configuration

### 1. Update Wallet Connect Project ID

If you want to use your own WalletConnect project:

1. Go to [cloud.walletconnect.com](https://cloud.walletconnect.com)
2. Create a new project
3. Copy the Project ID
4. Update the environment variable in Vercel

### 2. Configure RPC Endpoints

For production, consider using:
- Alchemy
- Infura
- QuickNode
- 1RPC

Update the `NEXT_PUBLIC_RPC_URL` environment variable accordingly.

### 3. Smart Contract Deployment

Deploy your smart contracts to Sepolia testnet:

```bash
# Set up environment variables
export PRIVATE_KEY="your_private_key_here"
export ETHERSCAN_API_KEY="your_etherscan_api_key"

# Deploy contracts
npm run deploy:sepolia
```

### 4. Update Contract Addresses

After deploying contracts, update the contract addresses in your frontend code.

## Environment Variables Reference

| Variable | Description | Required |
|----------|-------------|----------|
| `NEXT_PUBLIC_CHAIN_ID` | Ethereum chain ID (11155111 for Sepolia) | Yes |
| `NEXT_PUBLIC_RPC_URL` | RPC endpoint URL | Yes |
| `NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID` | WalletConnect project ID | Yes |
| `NEXT_PUBLIC_INFURA_API_KEY` | Infura API key (optional) | No |

## Build Configuration

The project uses the following build configuration:

```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "installCommand": "npm install",
  "framework": "vite"
}
```

## Troubleshooting

### Common Issues

1. **Build Fails**: Check that all dependencies are in `package.json`
2. **Environment Variables Not Working**: Ensure variables start with `NEXT_PUBLIC_`
3. **Wallet Connection Issues**: Verify WalletConnect Project ID
4. **RPC Errors**: Check RPC endpoint URL and rate limits

### Build Logs

To view build logs:
1. Go to your project in Vercel dashboard
2. Click on the deployment
3. Check the "Build Logs" tab

### Local Testing

Test the build locally:
```bash
npm run build
npm run preview
```

## Performance Optimization

### 1. Enable Edge Functions (Optional)

For better performance, consider using Vercel Edge Functions for API routes.

### 2. Image Optimization

Use Vercel's built-in image optimization for better performance.

### 3. Caching

Configure appropriate cache headers for static assets.

## Security Considerations

1. **Environment Variables**: Never commit sensitive keys to the repository
2. **API Keys**: Use environment variables for all API keys
3. **CORS**: Configure CORS settings if using external APIs
4. **Rate Limiting**: Implement rate limiting for API endpoints

## Monitoring and Analytics

1. **Vercel Analytics**: Enable in project settings
2. **Error Tracking**: Consider integrating Sentry or similar
3. **Performance Monitoring**: Use Vercel's built-in monitoring

## Updates and Maintenance

### Automatic Deployments

Vercel automatically deploys when you push to the main branch.

### Manual Deployments

1. Go to your project dashboard
2. Click "Deploy" → "Deploy from Git"
3. Select the branch and commit

### Rollbacks

1. Go to the deployment history
2. Click on a previous deployment
3. Click "Promote to Production"

## Support

- [Vercel Documentation](https://vercel.com/docs)
- [Vite Documentation](https://vitejs.dev/)
- [React Documentation](https://react.dev/)

## Cost Considerations

- **Free Tier**: 100GB bandwidth, 100GB-hours serverless function execution
- **Pro Tier**: $20/month for additional resources
- **Enterprise**: Custom pricing for large-scale deployments

Monitor your usage in the Vercel dashboard to avoid unexpected charges.
