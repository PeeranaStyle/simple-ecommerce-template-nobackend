# TechStore - Modern Electronics E-commerce Template

A modern E-commerce template for IT and electronics online stores, built with React + TypeScript + Tailwind CSS.

## ✨ Features

- 🎨 **Modern UI/UX** - Designed with Tailwind CSS with Dark Mode support
- 📱 **Responsive Design** - Supports all screen sizes (Mobile, Tablet, Desktop)
- ⚡ **Performance** - Built with Vite for fast development and builds
- 🛒 **E-commerce Features** - Shopping cart, Checkout system, Product filtering
- 🎯 **TypeScript** - Type-safe code for easy and secure development
- 🌙 **Dark Mode** - Dark Mode support with settings persistence
- 🔍 **Search & Filter** - Comprehensive search and filtering system
- 📦 **Mock Data** - Includes Mock Data for testing

## 🚀 Installation

### System Requirements

- Node.js 18+
- npm or yarn

### Installation Steps

1. **Clone or Download the project**

```bash
git clone <repository-url>
cd ecommerce
```

2. **Install Dependencies**

```bash
npm install
```

or

```bash
yarn install
```

3. **Run the project in Development mode**

```bash
npm run dev
```

or

```bash
yarn dev
```

4. **Open Browser**

Open your browser and navigate to `http://localhost:5173`

## 📦 Build for Production

```bash
npm run build
```

or

```bash
yarn build
```

The built files will be in the `dist` folder

## 📁 Project Structure

```
ecommerce/
├── public/                 # Static files
├── src/
│   ├── components/        # React Components
│   │   ├── Header.tsx
│   │   ├── Footer.tsx
│   │   ├── ProductCard.tsx
│   │   ├── QuickViewModal.tsx
│   │   └── Layout.tsx
│   ├── context/           # React Context
│   │   ├── CartContext.tsx
│   │   └── ThemeContext.tsx
│   ├── data/              # Mock Data
│   │   └── mockData.ts
│   ├── pages/              # Page Components
│   │   ├── Home.tsx
│   │   ├── Products.tsx
│   │   ├── ProductDetail.tsx
│   │   ├── Cart.tsx
│   │   ├── Checkout.tsx
│   │   ├── About.tsx
│   │   └── Contact.tsx
│   ├── types/             # TypeScript Types
│   │   └── index.ts
│   ├── App.tsx            # Main App Component
│   ├── main.tsx           # Entry Point
│   └── index.css          # Global Styles
├── index.html
├── package.json
├── tsconfig.json
├── tailwind.config.js
├── vite.config.ts
└── README.md
```

## 🎨 Customization

### Primary Color

Edit the `tailwind.config.js` file:

```javascript
colors: {
  primary: {
    50: '#f0f9ff',
    100: '#e0f2fe',
    // ... customize colors as needed
    600: '#0284c7',  // Primary color
    // ...
  },
}
```

### Fonts

Edit the `tailwind.config.js` file:

```javascript
fontFamily: {
  sans: ['Inter', 'system-ui', 'sans-serif'],
}
```

And edit `index.html` to change Google Fonts

### Mock Data

Edit the `src/data/mockData.ts` file to add or edit products and categories

## 📄 Pages in the Template

### 1. Home Page
- Hero Banner with Carousel
- Product Categories
- Featured Products
- Latest Products
- Newsletter Subscription

### 2. Products Page
- Grid Layout displaying products
- Sidebar Filters (Category, Brand, Price, Rating)
- Sorting Options
- Search Functionality

### 3. Product Detail Page
- Product Image Gallery
- Product Information
- Quantity Selector
- Add to Cart
- Product Tabs (Description, Specifications, Reviews)
- Related Products

### 4. Shopping Cart Page
- Cart items list
- Update quantity
- Remove items
- Order Summary
- Proceed to Checkout

### 5. Checkout Page
- Billing Information Form
- Shipping Options
- Payment Method Selection
- Order Summary
- Form Validation

### 6. About Page
- Company Story
- Values
- Team Members
- Statistics

### 7. Contact Page
- Contact Form
- Contact Information
- Business Hours
- Map Placeholder

## 🛠️ Technologies Used

- **React 18** - UI Library
- **TypeScript** - Type Safety
- **Vite** - Build Tool
- **Tailwind CSS** - Utility-first CSS Framework
- **React Router** - Client-side Routing
- **Lucide React** - Icon Library

## 📝 Usage

### Add New Product

Edit the `src/data/mockData.ts` file:

```typescript
{
  id: '13',
  name: 'Product Name',
  slug: 'product-slug',
  price: 10000,
  // ... other data
}
```

### Add New Page

1. Create file in `src/pages/`
2. Add Route in `src/App.tsx`:

```typescript
<Route path="/new-page" element={<NewPage />} />
```

3. Add Link in Navigation (Header.tsx)

### Customize Theme

Edit the `src/context/ThemeContext.tsx` file to customize Dark Mode behavior

## 🎯 Available Features

- ✅ Product Listing & Filtering
- ✅ Product Detail Page
- ✅ Shopping Cart
- ✅ Checkout Process
- ✅ Search Functionality
- ✅ Dark Mode Toggle
- ✅ Responsive Design
- ✅ Quick View Modal
- ✅ Category Navigation
- ✅ Newsletter Subscription

## 📱 Responsive Breakpoints

- **Mobile**: < 640px
- **Tablet**: 640px - 1024px
- **Desktop**: > 1024px

## 🔧 Scripts

- `npm run dev` - Run Development Server
- `npm run build` - Build for Production
- `npm run preview` - Preview Production Build
- `npm run lint` - Run ESLint

## 📄 License

This template is ready for sale on ThemeForest or personal use

## 🤝 Support

For questions or issues, please contact through the channels specified in the template

## 🎉 Thank You

Thank you for choosing TechStore E-commerce Template!

---

**Note**: This is a Frontend template only, no real Backend. All data is Mock Data for testing and demonstration purposes.
