# Medical Marketplace Implementation Plan

## Goal Description
Create a marketplace for medical professionals to buy new and used equipment. The interface will be intuitive, visually appealing, and search-focused.

## User Review Required
> [!IMPORTANT]
> - Using **Vanilla CSS** with CSS Modules (no Tailwind as per system guidelines unless requested, and user didn't request it).
> - Using **Mock Data** for the initial prototype.
> - **Design**: Focusing on a clean, "medical-grade" aesthetic (whites, teals, soft grays) with high contrast and clear typography.

## Proposed Changes

### Configuration
#### [NEW] [next.config.js](file:///Users/moisesdelacruz/.gemini/antigravity/scratch/medical-marketplace/next.config.mjs)
- Ensure image domains are configured if using external placeholder images.

### Styles
#### [MODIFY] [globals.css](file:///Users/moisesdelacruz/.gemini/antigravity/scratch/medical-marketplace/src/app/globals.css)
- Define CSS variables for the color palette (Primary Teal, Secondary Blue, Neutral Grays).
- Reset standard elements.

### Components
#### [NEW] [Navbar](file:///Users/moisesdelacruz/.gemini/antigravity/scratch/medical-marketplace/src/components/Navbar.tsx)
- Logo, Navigation Links, Search Bar (global).

#### [NEW] [ProductCard](file:///Users/moisesdelacruz/.gemini/antigravity/scratch/medical-marketplace/src/components/ProductCard.tsx)
- Displays product image, title, price, condition (New/Used), and location.

#### [NEW] [Button](file:///Users/moisesdelacruz/.gemini/antigravity/scratch/medical-marketplace/src/components/Button.tsx)
- Reusable button component with variants (primary, secondary, outline).

### Pages
#### [MODIFY] [Home Page](file:///Users/moisesdelacruz/.gemini/antigravity/scratch/medical-marketplace/src/app/page.tsx)
- Hero section with a welcoming message and primary search bar.
- "Featured Categories" section.
- "Recent Listings" grid.

#### [NEW] [Search Page](file:///Users/moisesdelacruz/.gemini/antigravity/scratch/medical-marketplace/src/app/search/page.tsx)
- Filter sidebar (Category, Condition, Price).
- Results grid.

#### [NEW] [Product Detail](file:///Users/moisesdelacruz/.gemini/antigravity/scratch/medical-marketplace/src/app/products/[id]/page.tsx)
- Detailed view with gallery, description, specifications, and "Contact Seller" button.

### Dashboard & State
#### [MODIFY] [ProductContext](file:///Users/moisesdelacruz/.gemini/antigravity/scratch/medical-marketplace/src/context/ProductContext.tsx)
- Fetch products from `/api/products` on mount instead of using static mock data.
- `addProduct` will now send a POST request with `FormData`.

#### [MODIFY] [Add Product Page](file:///Users/moisesdelacruz/.gemini/antigravity/scratch/medical-marketplace/src/app/dashboard/add/page.tsx)
- Add `<input type="file" />` for image selection.
- Refactor submit handler to construct `FormData` (file + JSON fields) and send to API.

### Backend (Persistence)
#### [NEW] [Products API Route](file:///Users/moisesdelacruz/.gemini/antigravity/scratch/medical-marketplace/src/app/api/products/route.ts)
- **GET**: Read from `src/data/products.json` and return list.
- **POST**: 
    1. Parse `FormData`.
    2. Save uploaded image to `public/uploads/[filename]`.
    3. Read `products.json`, append new product with correct image URL, and write back to file.

### Data
#### [NEW] [products.json](file:///Users/moisesdelacruz/.gemini/antigravity/scratch/medical-marketplace/src/data/products.json)
- The persistent "database" file.


## Verification Plan

### Automated Tests
- Run `npm run lint` to ensure code quality.
- Run `npm run build` to verify no build errors.

### Manual Verification
- **Home Page**: Verify Hero section elements and Search bar navigation.
- **Search**: Test searching for "MRI" or "Ultrasound" and verify results filter.
- **Responsiveness**: Check mobile view (hamburger menu, stacked grids).
- **Dashboard**: Verify "Add Product" adds an item that appears on the Home/Search pages.
- **Persistence**: Verify data persists after server restart (simulated by refresh).
- **Images**: Verify uploaded image appears in listings.
