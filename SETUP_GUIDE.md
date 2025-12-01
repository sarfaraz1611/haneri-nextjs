# Haneri Next.js Setup Guide

## Quick Start (3 Steps)

### 1. Copy Image Assets

From your original `public_html` folder, copy these folders to `haneri-nextjs/public/`:

```bash
# From the public_html directory
cp -r images haneri-nextjs/public/
cp -r Fonts haneri-nextjs/public/fonts
```

**Required Images:**
- `Haneri_Logo.png` - Main logo
- `logo_white.png` - Footer logo
- `Haneri_Favicon.jpg` - Favicon
- `Link.png` - Product logo
- `Fancraft.png` - Fancraft section image
- `why_home_1.png` through `why_home_5.png` - Why Choose icons
- `blog.jpg` - Blog placeholder image
- Product images (when integrated with API)

### 2. Install Dependencies

```bash
cd haneri-nextjs
npm install
```

### 3. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

---

## What's Included

### ✅ Fully Functional Sections

1. **Header** - Navigation, logo, mobile menu toggle
2. **Hero Video** - Full-width Vimeo video with skeleton loader
3. **Featured Products** - Grid layout with mock data (ready for API)
4. **Innovations** - 5 technology videos in responsive grid
5. **Steel Fan Slider** - Auto-rotating video carousel
6. **Why Choose** - 5 feature icons with descriptions
7. **Fancraft** - Bespoke service section with overlay text
8. **Blogs** - 3 blog cards with truncated content
9. **Footer** - Links, company info, copyright

### 🔄 Needs Integration

- **Products API** - Replace mock data in FeaturedProducts
- **Cart Functionality** - Add cart state management
- **User Authentication** - Login/logout system
- **Database Config** - Connect to your backend

---

## File Structure Overview

```
haneri-nextjs/
│
├── 📁 app/
│   ├── layout.tsx        # Root layout (Header + Footer wrapper)
│   ├── page.tsx          # Homepage (imports all sections)
│   └── globals.css       # Global styles & CSS variables
│
├── 📁 components/
│   ├── Header.tsx/.module.css
│   ├── Footer.tsx/.module.css
│   ├── HeroSlider.tsx/.module.css
│   ├── FeaturedProducts.tsx/.module.css
│   ├── InnovationsSection.tsx/.module.css
│   ├── SteelFanSlider.tsx/.module.css
│   ├── WhyChoose.tsx/.module.css
│   ├── Fancraft.tsx/.module.css
│   └── BlogsSection.tsx/.module.css
│
├── 📁 public/
│   ├── 📁 images/        # ⚠️ Copy from original project
│   └── 📁 fonts/         # ⚠️ Copy from original project
│
└── 📄 Configuration files
    ├── package.json
    ├── tsconfig.json
    ├── next.config.ts
    └── .gitignore
```

---

## CSS Variables Used

Located in `app/globals.css`:

```css
:root {
  --radius: 10px;
  --shadow: 0 6px 14px rgba(0, 0, 0, .12);
  --brand: #CA5D27;           /* Orange brand color */
  --primary-green: #315859;    /* Dark teal */
  --dark-green: #244a46;       /* Darker teal for buttons */
}
```

---

## Component Props & Customization

### FeaturedProducts

Edit mock data in the component:

```typescript
const mockProducts: Product[] = [
  {
    id: 1,
    name: "FENGSHUI PRO",
    description: "Product description...",
    mrp: 12500.00,
    image: "/images/product1.jpg",
    colors: [
      { label: "Matte Black", hex: "#21201E" },
    ]
  },
];
```

### BlogsSection

Edit blog data:

```typescript
const blogs = [
  {
    id: 1,
    image: "/images/blog.jpg",
    title: "Blog Title",
    content: "Blog content...",
    link: "/blog/slug",
  },
];
```

---

## Adding New Pages

### Example: Create a Shop Page

1. Create `app/shop/page.tsx`:

```typescript
export default function ShopPage() {
  return (
    <main className="main">
      <div className="container">
        <h1>Shop</h1>
        {/* Your shop content */}
      </div>
    </main>
  );
}
```

2. Access at: `http://localhost:3000/shop`

---

## Environment Variables

Create `.env.local` in root:

```env
# API Configuration
NEXT_PUBLIC_API_BASE_URL=http://your-api-url.com

# Optional: Analytics, etc.
NEXT_PUBLIC_GA_ID=your-google-analytics-id
```

Access in code:

```typescript
const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
```

---

## Common Issues & Solutions

### Issue: Images not showing

**Solution:** Ensure images are in `public/images/` folder

### Issue: Fonts not loading

**Solution:**
1. Copy `Ailerons-Typeface.woff2` to `public/fonts/`
2. Verify path in `globals.css`

### Issue: Videos not playing

**Solution:** Vimeo embeds require internet connection. Check network and Vimeo URLs.

### Issue: Port 3000 already in use

**Solution:**
```bash
# Use different port
npm run dev -- -p 3001
```

---

## Production Deployment

### Build for Production

```bash
npm run build
npm start
```

### Deploy to Vercel (Recommended)

1. Push code to GitHub
2. Import repository to Vercel
3. Configure environment variables
4. Deploy

### Deploy to Other Platforms

- **Netlify** - Supports Next.js
- **AWS** - Use Amplify or EC2
- **Custom Server** - Build and run with Node.js

---

## Next Steps

1. ✅ Copy image assets
2. ✅ Run development server
3. 🔄 Integrate products API
4. 🔄 Create additional pages (Shop, Product Detail, Cart)
5. 🔄 Implement authentication
6. 🔄 Add checkout functionality
7. 🔄 Setup analytics
8. 🔄 SEO optimization
9. 🔄 Production deployment

---

## Support

Need help? Check:
- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://react.dev)
- Project README.md

---

**Last Updated:** November 2025
