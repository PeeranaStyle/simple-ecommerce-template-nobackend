import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Star, ShoppingCart, Eye, Check } from 'lucide-react';
import { Product } from '../types';
import { useCart } from '../context/CartContext';
import QuickViewModal from './QuickViewModal';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const [isQuickViewOpen, setIsQuickViewOpen] = useState(false);
  const [isAdded, setIsAdded] = useState(false);
  const { addToCart } = useCart();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, 1);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  const handleQuickView = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsQuickViewOpen(true);
  };

  const discountPercentage = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <>
      <div className="group relative bg-white dark:bg-gray-800 rounded-xl shadow-sm hover:shadow-2xl transition-all duration-500 ease-out overflow-hidden border border-gray-100 dark:border-gray-700 hover:border-primary-200 dark:hover:border-primary-800">
        {/* Image Container */}
        <div className="relative overflow-hidden aspect-square bg-gray-50 dark:bg-gray-900">
          <Link to={`/products/${product.slug}`} className="block h-full">
            <img
              src={product.images[0]}
              alt={product.name}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
            />
          </Link>
          
          {/* Gradient Overlay on Hover */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-black/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          
          {/* Badges */}
          <div className="absolute top-4 left-4 flex flex-col gap-2 z-10">
            {product.featured && (
              <span className="bg-primary-600 text-white text-xs font-semibold px-3 py-1.5 rounded-full shadow-lg animate-fade-in backdrop-blur-sm">
                Featured
              </span>
            )}
            {discountPercentage > 0 && (
              <span className="bg-red-500 text-white text-xs font-semibold px-3 py-1.5 rounded-full shadow-lg animate-fade-in backdrop-blur-sm">
                -{discountPercentage}%
              </span>
            )}
            {!product.inStock && (
              <span className="bg-gray-500 text-white text-xs font-semibold px-3 py-1.5 rounded-full shadow-lg backdrop-blur-sm">
                Out of Stock
              </span>
            )}
          </div>

          {/* Quick Actions */}
          <div className="absolute top-4 right-4 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0 z-10">
            <button
              onClick={handleQuickView}
              className="p-3 bg-white/90 dark:bg-gray-800/90 backdrop-blur-md rounded-full shadow-lg hover:bg-primary-50 dark:hover:bg-primary-900/50 hover:text-primary-600 dark:hover:text-primary-400 transition-all duration-300 hover:scale-110 active:scale-95"
              aria-label="Quick view"
            >
              <Eye className="w-4 h-4" />
            </button>
            <button
              onClick={handleAddToCart}
              disabled={!product.inStock}
              className={`p-3 bg-white/90 dark:bg-gray-800/90 backdrop-blur-md rounded-full shadow-lg transition-all duration-300 hover:scale-110 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed ${
                isAdded
                  ? 'bg-green-500 text-white'
                  : 'hover:bg-primary-50 dark:hover:bg-primary-900/50 hover:text-primary-600 dark:hover:text-primary-400'
              }`}
              aria-label="Add to cart"
            >
              {isAdded ? (
                <Check className="w-4 h-4" />
              ) : (
                <ShoppingCart className="w-4 h-4" />
              )}
            </button>
          </div>
        </div>

        {/* Product Info */}
        <div className="p-5 space-y-3">
          <Link to={`/products/${product.slug}`} className="block group/link">
            <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-1 line-clamp-2 group-hover/link:text-primary-600 dark:group-hover/link:text-primary-400 transition-colors duration-200 text-lg leading-tight">
              {product.name}
            </h3>
          </Link>
          
          <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">
            {product.brand}
          </p>

          {/* Rating */}
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-0.5">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-4 h-4 transition-all duration-200 ${
                    i < Math.floor(product.rating)
                      ? 'fill-yellow-400 text-yellow-400'
                      : 'text-gray-300 dark:text-gray-600'
                  }`}
                />
              ))}
            </div>
            <span className="text-xs text-gray-500 dark:text-gray-400 font-medium">
              ({product.reviews})
            </span>
          </div>

          {/* Price */}
          <div className="flex items-center gap-3 pt-1">
            <span className="text-xl font-bold text-primary-600 dark:text-primary-400">
              ${product.price.toLocaleString()}
            </span>
            {product.originalPrice && (
              <span className="text-sm text-gray-500 dark:text-gray-400 line-through font-medium">
                ${product.originalPrice.toLocaleString()}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Quick View Modal */}
      {isQuickViewOpen && (
        <QuickViewModal
          product={product}
          isOpen={isQuickViewOpen}
          onClose={() => setIsQuickViewOpen(false)}
        />
      )}
    </>
  );
};

export default ProductCard;
