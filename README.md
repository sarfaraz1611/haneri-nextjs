# Haneri Next.js - Landing Page

This is a Next.js conversion of the Haneri ceiling fans landing page, featuring modern React architecture and improved performance.

## 🚀 Getting Started

### Prerequisites

- Node.js 18.x or higher
- npm or yarn

### Installation

1. Navigate to the project directory:
```bash
cd haneri-nextjs
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser to see the result.

## 📁 Project Structure

```
haneri-nextjs/
├── app/
│   ├── layout.tsx          # Root layout with Header & Footer
│   ├── page.tsx            # Homepage
│   └── globals.css         # Global styles
├── components/
│   ├── Header.tsx          # Navigation header
│   ├── Footer.tsx          # Footer with links and company info
│   ├── HeroSlider.tsx      # Top hero video slider
│   ├── FeaturedProducts.tsx # Featured products grid
│   ├── InnovationsSection.tsx # Technology innovations slider
│   ├── SteelFanSlider.tsx  # Steel fan video carousel
│   ├── WhyChoose.tsx       # Why choose Haneri section
│   ├── Fancraft.tsx        # Fancraft bespoke service section
│   └── BlogsSection.tsx    # Latest blog articles
├── public/
│   ├── images/             # Image assets (needs to be copied)
│   └── fonts/              # Font files (needs to be copied)
└── package.json
```

## 🎨 Features Implemented

### ✅ Completed Sections:

1. **Header Navigation**
   - Sticky header with transparent background
   - Mobile-responsive menu
   - Login and WhatsApp icons

2. **Hero Slider**
   - Full-width Vimeo video embed
   - Responsive video sizing
   - Loading skeleton

3. **Featured Products**
   - Grid layout (4 columns on desktop, responsive)
   - Product cards with image hover effects
   - Color swatches
   - Add to Cart buttons (ready for API integration)

4. **Innovations Section**
   - 5-column grid of innovation videos
   - Horizontal scroll on mobile
   - Intersection Observer for video performance

5. **Steel Fan Slider**
   - Auto-rotating video carousel
   - 6 Vimeo video slides
   - Navigation dots

6. **Why Choose Haneri**
   - 5-item responsive grid
   - Icon animations on hover
   - Fully responsive layout

7. **Fancraft Section**
   - Image with overlay text
   - Responsive positioning
   - CTA button

8. **Blogs Section**
   - 3-column blog grid
   - Card hover effects
   - Truncated content preview

9. **Footer**
   - 4-column layout
   - Company info and links
   - Fully responsive

## 🔧 Configuration

### Environment Variables

Create a `.env.local` file in the root directory for API endpoints:

```env
NEXT_PUBLIC_API_BASE_URL=your_api_url_here
```

### Image Assets

Copy the following folders from the original PHP project to the `public/` directory:

- `images/` - All product images, logos, icons
- `fonts/` - Ailerons font file
- `Videos/` - Any local video files (if used)

## 📝 To-Do / Future Enhancements

### API Integration

1. **Featured Products**
   - Connect to products API endpoint
   - Implement real product data fetching
   - Add cart functionality

2. **Authentication**
   - Implement user login/logout
   - LocalStorage token management
   - Protected routes

3. **Shopping Cart**
   - Cart page implementation
   - Add/remove items functionality
   - Checkout process

### Additional Pages Needed

- `/shop` - Products listing page
- `/product/[id]` - Product detail page
- `/login` - Login page
- `/register` - Registration page
- `/cart` - Shopping cart
- `/checkout` - Checkout page
- `/profile` - User profile
- `/about` - About us page
- `/contact` - Contact page
- `/blog/[slug]` - Individual blog pages
- Technology pages (Air Curve, BLDC, HASS, etc.)

### Performance Optimizations

- [ ] Add Image component from Next.js for optimized images
- [ ] Implement lazy loading for below-fold content
- [ ] Add skeleton loaders for all sections
- [ ] Optimize Vimeo embeds with lite-youtube-embed style approach

### Accessibility

- [ ] Add proper ARIA labels
- [ ] Keyboard navigation support
- [ ] Screen reader optimization
- [ ] Color contrast improvements

## 🛠 Technologies Used

- **Next.js 16** - React framework
- **TypeScript** - Type safety
- **React 19** - UI library
- **CSS Modules** - Scoped styling
- **Vimeo Player** - Video embeds
- **Font Awesome** - Icons

## 📦 Build for Production

```bash
npm run build
npm start
```

## 🎯 Key Differences from PHP Version

1. **Component-Based Architecture** - Reusable React components instead of PHP includes
2. **Client-Side Rendering** - Dynamic content loading with React hooks
3. **Type Safety** - TypeScript for better developer experience
4. **Modern CSS** - CSS Modules instead of global stylesheets
5. **Optimized Performance** - Next.js automatic code splitting and optimization
6. **SEO-Friendly** - Server-side rendering capabilities
7. **Developer Experience** - Hot reload, better debugging, modern tooling

## 📄 License

Copyright © 2025 Haneri

## 🤝 Support

For support, email info@haneri.com or contact the development team.

---

**Note:** This is the landing page conversion only. Additional pages and API integrations need to be implemented based on the original PHP codebase functionality.
