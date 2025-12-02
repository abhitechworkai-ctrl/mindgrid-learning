# MindGrid Learning Solutions - Deployment Guide

## Routing Fix Applied

### Changes Made

1. **Created `vercel.json`** - Configures Vercel to serve `index.html` for all routes (enables client-side routing)
2. **Created `public/_redirects`** - Netlify configuration for SPA routing
3. **Fixed Subject URL Handling** - Made subject parameter case-insensitive in `SubjectDetails.tsx`
4. **Database Queries** - Updated to use `.ilike()` for case-insensitive subject matching

### How Routing Works

**URL Pattern:**
```
/exam-preparation/mathematics
/exam-preparation/science
/exam-preparation/social-science
/exam-preparation/english
```

**Flow:**
1. User clicks subject link on homepage or exam-preparation page
2. React Router matches URL pattern `/exam-preparation/:subject`
3. `SubjectDetails` component extracts subject parameter
4. Converts URL slug (e.g., "mathematics") to proper case ("Mathematics")
5. Queries Supabase products table with case-insensitive search
6. Displays 3 product cards: Basic, Standard, Premium

**Database Query:**
```typescript
const { data } = await supabase
  .from('products')
  .select('*')
  .ilike('subject', 'Mathematics')
  .eq('is_active', true)
  .order('price', { ascending: true });
```

## Deployment to Vercel

### Prerequisites
- GitHub account
- Vercel account (free)
- GoDaddy domain

### Steps

1. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Add routing fixes and deployment configs"
   git push origin main
   ```

2. **Deploy to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Click "Import Project"
   - Select your GitHub repository
   - Vercel auto-detects Vite configuration
   - Add environment variables:
     - `VITE_SUPABASE_URL`
     - `VITE_SUPABASE_ANON_KEY`
     - `VITE_MAKE_LEAD_WEBHOOK_URL`
     - `VITE_MAKE_ORDER_WEBHOOK_URL`
     - `VITE_RAZORPAY_KEY_ID`
   - Click "Deploy"

3. **Configure Custom Domain**
   - In Vercel dashboard → Settings → Domains
   - Add your GoDaddy domain: `mindgridlearning.com`
   - Add www subdomain: `www.mindgridlearning.com`
   - Copy DNS configuration

4. **Update GoDaddy DNS**
   - Log into GoDaddy
   - Go to DNS Management
   - Add A Record:
     - Type: A
     - Name: @
     - Value: (Vercel IP from dashboard)
   - Add CNAME Record:
     - Type: CNAME
     - Name: www
     - Value: cname.vercel-dns.com

5. **Wait for DNS Propagation**
   - Usually takes 1-24 hours
   - Check at [whatsmydns.net](https://www.whatsmydns.net)

6. **Verify SSL**
   - Vercel automatically provisions SSL certificate
   - Site should load with https://

## Testing Checklist

### Local Testing
- ✅ Homepage loads
- ✅ Click "Mathematics" → redirects to `/exam-preparation/mathematics`
- ✅ Subject page displays 3 product cards
- ✅ Cards show: name, pack_type, price, features, description
- ✅ "Buy Now" button redirects to checkout
- ✅ Back navigation works
- ✅ All 4 subjects work (Math, Science, Social Science, English)

### Production Testing (After Vercel Deployment)
- [ ] Direct URL access works: `https://yourdomain.com/exam-preparation/mathematics`
- [ ] Refresh page doesn't show 404
- [ ] All subject routes work
- [ ] Products load from Supabase
- [ ] SSL certificate is active (https)
- [ ] Mobile responsive design
- [ ] Payment flow works (Razorpay test mode)

## Troubleshooting

### 404 on Direct URL Access
- **Cause:** Missing `vercel.json` configuration
- **Fix:** Ensure `vercel.json` is committed and deployed
- **Verify:** Check Vercel deployment logs

### Products Not Loading
- **Cause:** Environment variables not set
- **Fix:** Add `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` in Vercel
- **Verify:** Check Vercel Environment Variables section

### Subject Not Found Error
- **Cause:** URL slug doesn't match expected format
- **Fix:** Ensure URLs use lowercase with hyphens: `social-science`
- **Verify:** Check `subjectNames` mapping in `SubjectDetails.tsx`

### Database Query Returns Empty
- **Cause:** Subject name mismatch in database
- **Fix:** Verify database has subjects with exact names:
  - "Mathematics"
  - "Science"
  - "Social Science"
  - "English"
- **Verify:** Run SQL query: `SELECT DISTINCT subject FROM products;`

## File Structure

```
project/
├── vercel.json              # Vercel routing config (NEW)
├── public/
│   └── _redirects          # Netlify routing config (NEW)
├── src/
│   ├── App.tsx             # Main routing configuration
│   └── pages/
│       └── SubjectDetails.tsx  # Dynamic subject page (UPDATED)
```

## Environment Variables Required

```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
VITE_MAKE_LEAD_WEBHOOK_URL=https://hook.make.com/...
VITE_MAKE_ORDER_WEBHOOK_URL=https://hook.make.com/...
VITE_RAZORPAY_KEY_ID=rzp_test_...
```

## Support

For deployment issues:
- Vercel Docs: https://vercel.com/docs
- Supabase Docs: https://supabase.com/docs
- React Router Docs: https://reactrouter.com

## Next Steps After Deployment

1. Test all subject pages in production
2. Verify Razorpay test payments
3. Check Make.com webhooks receive data
4. Monitor Vercel Analytics for errors
5. Set up custom 404 page if needed
6. Configure domain email (support@mindgridlearning.com)
7. Add Google Analytics tracking
8. Submit sitemap to Google Search Console
