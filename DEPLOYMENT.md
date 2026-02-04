# Deployment Instructions

This project is optimized for deployment on the **Vercel Hobby plan**. Follow these steps to deploy your site.

## Prerequisites
- A [GitHub](https://github.com/) account with the project repository pushed to a public repo.
- A [Vercel](https://vercel.com/) account.

## Deployment Steps

1. **Import Project**:
   - Log in to your Vercel dashboard.
   - Click **"Add New..."** and select **"Project"**.
   - Find your GitHub repository and click **"Import"**.

2. **Configure Project**:
   - **Framework Preset**: Vercel should automatically detect **Next.js**.
   - **Root Directory**: Leave as `./` (default).
   - **Build and Output Settings**: Default settings are sufficient for this static-first project.
   - **Environment Variables**: No environment variables are required for this project.

3. **Deploy**:
   - Click **"Deploy"**. Vercel will build the project and provide a production URL.

## Post-Deploy Validation

Once the deployment is complete, verify the following:

### 1. Homepage Teaser
- Navigate to your production URL.
- Ensure the "Private Art Institute" hero section and "Featured Collections" grid are visible.
- Verify that no more than 6 images are displayed in the teaser.

### 2. Gallery Routing
- Click on a teaser image or a "View Collection" link.
- Ensure the URL updates to `/galleries/[slug]` and the correct gallery content loads.
- Confirm that the page title and description match the JSON metadata.

### 3. Image Optimization
- Open Browser Developer Tools (Network tab).
- Refresh the gallery page.
- Select an image request and check the **Content-Type** header.
- **Validation**: The type should be `image/avif` or `image/webp`.
- Verify that images are lazy-loaded as you scroll.

### 4. Static Performance
- Check that pages load instantly. This project uses `generateStaticParams` for full static site generation (SSG).
