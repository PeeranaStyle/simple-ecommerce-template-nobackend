# TechStore Template Customization Guide

This guide will help you customize the TechStore template according to your needs.

## 🎨 Changing Primary Colors

### 1. Change Primary Color

Edit the `tailwind.config.js` file:

```javascript
theme: {
  extend: {
    colors: {
      primary: {
        50: '#f0f9ff',   // Lightest shade
        100: '#e0f2fe',
        200: '#bae6fd',
        300: '#7dd3fc',
        400: '#38bdf8',
        500: '#0ea5e9',   // Medium shade
        600: '#0284c7',   // Primary color (most used)
        700: '#0369a1',
        800: '#075985',
        900: '#0c4a6e',   // Darkest shade
      },
    },
  },
}
```

**Example**: Change to green color

```javascript
primary: {
  600: '#16a34a',  // Green
  700: '#15803d',
  // ...
}
```

### 2. Change Other Colors

You can add new colors in `tailwind.config.js`:

```javascript
colors: {
  primary: { /* ... */ },
  secondary: {
    600: '#9333ea',  // Purple
  },
  accent: {
    600: '#f59e0b',  // Orange
  },
}
```

## 🔤 Changing Fonts

### 1. Change Google Fonts

Edit the `index.html` file:

```html
<link href="https://fonts.googleapis.com/css2?family=YourFont:wght@300;400;500;600;700;800&display=swap" rel="stylesheet">
```

### 2. Update Tailwind Config

Edit the `tailwind.config.js` file:

```javascript
fontFamily: {
  sans: ['YourFont', 'system-ui', 'sans-serif'],
}
```

## 📦 Adding/Editing Products

### Add New Product

Edit the `src/data/mockData.ts` file:

```typescript
{
  id: '13',
  name: 'Product Name',
  slug: 'product-slug',
  price: 10000,
  originalPrice: 12000,  // Original price (if available)
  description: 'Long product description',
  shortDescription: 'Short description',
  images: [
    'https://images.unsplash.com/photo-xxx?w=800',
    'https://images.unsplash.com/photo-xxx?w=800',
  ],
  category: 'Laptops',
  categorySlug: 'laptops',
  brand: 'Brand Name',
  rating: 4.5,
  reviews: 100,
  inStock: true,
  featured: false,
  specifications: {
    'Processor': 'Intel Core i7',
    'RAM': '16GB',
    // ... other data
  },
}
```

### Edit Categories

Edit the `src/data/mockData.ts` file:

```typescript
export const categories: Category[] = [
  { id: '1', name: 'Laptops', slug: 'laptops' },
  { id: '2', name: 'Smartphones', slug: 'smartphones' },
  // Add new category
];
```

## 🏗️ Adding New Pages

### 1. Create New Page Component

Create file `src/pages/NewPage.tsx`:

```typescript
import React from 'react';

const NewPage: React.FC = () => {
  return (
    <div className="min-h-screen py-16">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold">New Page</h1>
      </div>
    </div>
  );
};

export default NewPage;
```

### 2. Add Route

Edit the `src/App.tsx` file:

```typescript
import NewPage from './pages/NewPage';

// In Routes
<Route path="/new-page" element={<NewPage />} />
```

### 3. Add Link in Navigation

Edit the `src/components/Header.tsx` file:

```typescript
<Link
  to="/new-page"
  className="text-gray-700 dark:text-gray-300 hover:text-primary-600"
>
  New Page
</Link>
```

## 🎯 Customizing Components

### Header

Edit the `src/components/Header.tsx` file:

- Change Logo: Edit the `<Link to="/">` section
- Add/Remove Menu Items: Edit the Navigation section
- Change Search Behavior: Edit the `handleSearch` function

### Footer

Edit the `src/components/Footer.tsx` file:

- Change contact information
- Add/Remove Social Media Links
- Edit Footer Links

### ProductCard

Edit the `src/components/ProductCard.tsx` file:

- Change Card Layout
- Add/Remove Badges
- Customize Hover Effects

## 🌙 Customizing Dark Mode

### Change Dark Mode Colors

Edit the `tailwind.config.js` file:

```javascript
// Use class strategy
darkMode: 'class',
```

### Customize Colors in Dark Mode

In CSS file or Component:

```css
.dark .your-class {
  background-color: #1a1a1a;
}
```

## 📱 Customizing Responsive Design

### Change Breakpoints

Edit the `tailwind.config.js` file:

```javascript
theme: {
  extend: {
    screens: {
      'xs': '475px',
      'sm': '640px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1280px',
      '2xl': '1536px',
    },
  },
}
```

## 🎨 Customizing Styles

### Global Styles

Edit the `src/index.css` file:

```css
@layer base {
  body {
    @apply bg-white dark:bg-gray-900;
    /* Add other styles */
  }
}
```

### Custom Utilities

Add in `src/index.css`:

```css
@layer utilities {
  .custom-gradient {
    background: linear-gradient(to right, #primary-600, #primary-400);
  }
}
```

## 🔧 Adding Features

### Add Wishlist

1. Create `WishlistContext.tsx` (similar to CartContext)
2. Add Heart Icon in ProductCard
3. Create Wishlist Page

### Add Product Reviews

1. Add Review Type in `src/types/index.ts`
2. Add Mock Reviews in `mockData.ts`
3. Display Reviews in ProductDetail Page

### Add User Authentication

1. Create AuthContext
2. Add Login/Register Pages
3. Add Protected Routes

## 📦 Connecting to Backend

### 1. Create API Service

Create file `src/services/api.ts`:

```typescript
const API_URL = 'https://your-api.com';

export const fetchProducts = async () => {
  const response = await fetch(`${API_URL}/products`);
  return response.json();
};
```

### 2. Replace Mock Data

In `Products.tsx`:

```typescript
import { fetchProducts } from '../services/api';

const [products, setProducts] = useState<Product[]>([]);

useEffect(() => {
  fetchProducts().then(setProducts);
}, []);
```

## 🎯 Tips & Best Practices

1. **Type Safety**: Use TypeScript types comprehensively
2. **Component Reusability**: Separate reusable Components
3. **Performance**: Use React.memo for frequently rendered Components
4. **Accessibility**: Add aria-labels and semantic HTML
5. **SEO**: Add Meta Tags in `index.html`

## 🐛 Troubleshooting

### Issue: Tailwind Classes Not Working

**Solution**: Check that `tailwind.config.js` has correct content paths

### Issue: Dark Mode Not Working

**Solution**: Check that `darkMode: 'class'` is in `tailwind.config.js`

### Issue: Images Not Displaying

**Solution**: Check Image URLs and CORS Settings

## 📚 Resources

- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [React Documentation](https://react.dev)
- [TypeScript Documentation](https://www.typescriptlang.org/docs)
- [Vite Documentation](https://vitejs.dev)

---

**Note**: For additional questions, please contact Support
