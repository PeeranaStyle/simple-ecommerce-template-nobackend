import React, { useState, useEffect } from 'react';
import { X, Star, ShoppingCart, Minus, Plus, Check } from 'lucide-react';
import { Product } from '../types';
import { useCart } from '../context/CartContext';

interface QuickViewModalProps {
  product: Product;
  isOpen: boolean;
  onClose: () => void;
}

const QuickViewModal: React.FC<QuickViewModalProps> = ({ product, isOpen, onClose }) => {
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const [isAdded, setIsAdded] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const { addToCart } = useCart();

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const handleAddToCart = () => {
    addToCart(product, quantity);
    setIsAdded(true);
    setTimeout(() => {
      setIsAdded(false);
      onClose();
    }, 1000);
  };

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(() => onClose(), 300);
  };

  const discountPercentage = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  if (!isOpen) return null;

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center p-4 transition-all duration-300 ${
        isVisible
          ? 'bg-black/60 backdrop-blur-sm opacity-100'
          : 'bg-black/0 opacity-0'
      }`}
      onClick={handleClose}
    >
      <div
        className={`bg-white dark:bg-gray-800 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl transition-all duration-300 ${
          isVisible ? 'scale-100 opacity-100' : 'scale-95 opacity-0'
        }`}
        onClick={(e: React.MouseEvent) => e.stopPropagation()}
      >
        <div className="relative">
          <button
            onClick={handleClose}
            className="absolute top-4 right-4 z-10 p-2 bg-white/90 dark:bg-gray-800/90 backdrop-blur-md rounded-full shadow-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-200 hover:scale-110 active:scale-95"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="grid md:grid-cols-2 gap-8 p-8">
            {/* Images */}
            <div className="space-y-4">
              <div className="aspect-square rounded-xl overflow-hidden bg-gray-50 dark:bg-gray-900 shadow-inner">
                <img
                  src={product.images[selectedImage]}
                  alt={product.name}
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                />
              </div>
              {product.images.length > 1 && (
                <div className="grid grid-cols-4 gap-3">
                  {product.images.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImage(index)}
                      className={`aspect-square rounded-lg overflow-hidden border-2 transition-all duration-300 ${
                        selectedImage === index
                          ? 'border-primary-600 dark:border-primary-400 scale-105 shadow-lg'
                          : 'border-transparent hover:border-gray-300 dark:hover:border-gray-700 hover:scale-105'
                      }`}
                    >
                      <img
                        src={image}
                        alt={`${product.name} ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Product Info */}
            <div className="flex flex-col justify-between">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-3">
                  {product.name}
                </h2>
                
                <p className="text-gray-500 dark:text-gray-400 mb-6 font-medium">
                  {product.brand}
                </p>

                {/* Rating */}
                <div className="flex items-center gap-3 mb-6">
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-5 h-5 transition-all duration-200 ${
                          i < Math.floor(product.rating)
                            ? 'fill-yellow-400 text-yellow-400'
                            : 'text-gray-300 dark:text-gray-600'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-sm text-gray-500 dark:text-gray-400 font-medium">
                    {product.rating} ({product.reviews} reviews)
                  </span>
                </div>

                {/* Price */}
                <div className="mb-6">
                  <div className="flex items-center gap-4 mb-2">
                    <span className="text-4xl font-bold text-primary-600 dark:text-primary-400">
                      ${product.price.toLocaleString()}
                    </span>
                    {product.originalPrice && (
                      <span className="text-xl text-gray-500 dark:text-gray-400 line-through font-medium">
                        ${product.originalPrice.toLocaleString()}
                      </span>
                    )}
                    {discountPercentage > 0 && (
                      <span className="bg-red-500 text-white text-sm font-semibold px-3 py-1.5 rounded-full">
                        -{discountPercentage}%
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 font-medium">
                    {product.inStock ? (
                      <span className="text-green-600 dark:text-green-400">✓ In Stock</span>
                    ) : (
                      <span className="text-red-600 dark:text-red-400">✗ Out of Stock</span>
                    )}
                  </p>
                </div>

                {/* Description */}
                <p className="text-gray-700 dark:text-gray-300 mb-8 leading-relaxed">
                  {product.shortDescription}
                </p>
              </div>

              {/* Quantity Selector & Add to Cart */}
              <div className="space-y-4 pt-6 border-t border-gray-200 dark:border-gray-700">
                <div className="flex items-center gap-4">
                  <span className="text-sm font-semibold text-gray-700 dark:text-gray-300 min-w-[80px]">
                    Quantity:
                  </span>
                  <div className="flex items-center border-2 border-gray-300 dark:border-gray-700 rounded-xl overflow-hidden">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="p-3 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200 active:scale-95"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="px-6 py-3 min-w-[80px] text-center font-semibold text-gray-900 dark:text-gray-100">
                      {quantity}
                    </span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="p-3 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200 active:scale-95"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Add to Cart Button */}
                <button
                  onClick={handleAddToCart}
                  disabled={!product.inStock || isAdded}
                  className={`w-full font-semibold py-4 px-6 rounded-xl transition-all duration-300 flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed ripple ${
                    isAdded
                      ? 'bg-green-500 text-white'
                      : 'bg-primary-600 hover:bg-primary-700 text-white active:scale-95'
                  }`}
                >
                  {isAdded ? (
                    <>
                      <Check className="w-5 h-5" />
                      <span>Added</span>
                    </>
                  ) : (
                    <>
                      <ShoppingCart className="w-5 h-5" />
                      <span>Add to Cart</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuickViewModal;
