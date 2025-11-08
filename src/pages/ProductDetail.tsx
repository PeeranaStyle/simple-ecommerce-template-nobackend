import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Star, ShoppingCart, Minus, Plus, ArrowLeft, Check } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { products } from '../data/mockData';

const ProductDetail: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const [isAdded, setIsAdded] = useState(false);
  const [activeTab, setActiveTab] = useState<'description' | 'specifications' | 'reviews'>(
    'description'
  );

  const product = products.find((p) => p.slug === slug);
  const { addToCart } = useCart();

  // Scroll to top when component mounts or slug changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [slug]);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center animate-fade-in">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-4">
            Product Not Found
          </h1>
          <Link
            to="/products"
            className="text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 font-semibold transition-colors"
          >
            Back to Products
          </Link>
        </div>
      </div>
    );
  }

  const handleAddToCart = () => {
    addToCart(product, quantity);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  const discountPercentage = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  const relatedProducts = products
    .filter((p) => p.categorySlug === product.categorySlug && p.id !== product.id)
    .slice(0, 4);

  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4">
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 mb-8 transition-all duration-200 hover:gap-3 group animate-fade-in"
        >
          <ArrowLeft className="w-5 h-5 transition-transform duration-200 group-hover:-translate-x-1" />
          <span className="font-medium">Back</span>
        </button>

        <div className="grid lg:grid-cols-2 gap-16 mb-20 animate-fade-in">
          {/* Images */}
          <div className="space-y-4">
            <div className="aspect-square rounded-2xl overflow-hidden bg-gray-50 dark:bg-gray-900 shadow-xl border border-gray-100 dark:border-gray-800">
              <img
                src={product.images[selectedImage]}
                alt={product.name}
                className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
              />
            </div>
            {product.images.length > 1 && (
              <div className="grid grid-cols-4 gap-4">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`aspect-square rounded-xl overflow-hidden border-2 transition-all duration-300 ${
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
              <div className="mb-4">
                <span className="text-sm text-primary-600 dark:text-primary-400 font-semibold uppercase tracking-wide">
                  {product.brand}
                </span>
              </div>

              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-gray-100 mb-6 leading-tight">
                {product.name}
              </h1>

              {/* Rating */}
              <div className="flex items-center gap-4 mb-6">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-6 h-6 transition-all duration-200 ${
                        i < Math.floor(product.rating)
                          ? 'fill-yellow-400 text-yellow-400'
                          : 'text-gray-300 dark:text-gray-600'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-gray-600 dark:text-gray-400 font-medium">
                  {product.rating} ({product.reviews} reviews)
                </span>
              </div>

              {/* Price */}
              <div className="mb-8">
                <div className="flex items-center gap-4 mb-3">
                  <span className="text-5xl font-bold text-primary-600 dark:text-primary-400">
                    ${product.price.toLocaleString()}
                  </span>
                  {product.originalPrice && (
                    <span className="text-2xl text-gray-500 dark:text-gray-400 line-through font-medium">
                      ${product.originalPrice.toLocaleString()}
                    </span>
                  )}
                  {discountPercentage > 0 && (
                    <span className="bg-red-500 text-white text-sm font-semibold px-4 py-2 rounded-full">
                      -{discountPercentage}%
                    </span>
                  )}
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400 font-medium">
                  {product.inStock ? (
                    <span className="text-green-600 dark:text-green-400 font-semibold">
                      ✓ In Stock
                    </span>
                  ) : (
                    <span className="text-red-600 dark:text-red-400 font-semibold">
                      ✗ Out of Stock
                    </span>
                  )}
                </p>
              </div>

              {/* Short Description */}
              <p className="text-gray-700 dark:text-gray-300 mb-10 text-lg leading-relaxed">
                {product.shortDescription}
              </p>
            </div>

            {/* Quantity Selector & Add to Cart */}
            <div className="space-y-6 pt-8 border-t border-gray-200 dark:border-gray-700">
              <div className="flex items-center gap-6">
                <span className="text-sm font-semibold text-gray-700 dark:text-gray-300 min-w-[100px]">
                  Quantity:
                </span>
                <div className="flex items-center border-2 border-gray-300 dark:border-gray-700 rounded-xl overflow-hidden">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="p-4 hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-200 active:scale-95"
                  >
                    <Minus className="w-5 h-5" />
                  </button>
                  <span className="px-8 py-4 min-w-[100px] text-center font-bold text-lg text-gray-900 dark:text-gray-100">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="p-4 hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-200 active:scale-95"
                  >
                    <Plus className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Add to Cart Button */}
              <button
                onClick={handleAddToCart}
                disabled={!product.inStock || isAdded}
                className={`w-full font-semibold py-5 px-8 rounded-xl transition-all duration-300 flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed ripple ${
                  isAdded
                    ? 'bg-green-500 text-white'
                    : 'bg-primary-600 hover:bg-primary-700 text-white active:scale-95 shadow-lg hover:shadow-xl'
                }`}
              >
                {isAdded ? (
                  <>
                    <Check className="w-6 h-6" />
                    <span className="text-lg">Added</span>
                  </>
                ) : (
                  <>
                    <ShoppingCart className="w-6 h-6" />
                    <span className="text-lg">Add to Cart</span>
                  </>
                )}
              </button>

              {/* Category Link */}
              <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Category:{' '}
                  <Link
                    to={`/products?category=${product.categorySlug}`}
                    className="text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 font-semibold transition-colors"
                  >
                    {product.category}
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="mb-12 animate-fade-in">
          <div className="border-b-2 border-gray-200 dark:border-gray-700">
            <div className="flex gap-8">
              {(['description', 'specifications', 'reviews'] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`pb-4 px-2 font-semibold transition-all duration-200 relative capitalize ${
                    activeTab === tab
                      ? 'text-primary-600 dark:text-primary-400'
                      : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100'
                  }`}
                >
                  {tab}
                  {activeTab === tab && (
                    <span className="absolute bottom-0 left-0 w-full h-0.5 bg-primary-600 dark:bg-primary-400 transition-all duration-300" />
                  )}
                </button>
              ))}
            </div>
          </div>

          <div className="py-10">
            {activeTab === 'description' && (
              <div className="prose dark:prose-invert max-w-none">
                <p className="text-gray-700 dark:text-gray-300 whitespace-pre-line leading-relaxed text-lg">
                  {product.description}
                </p>
              </div>
            )}

            {activeTab === 'specifications' && product.specifications && (
              <div className="grid md:grid-cols-2 gap-6">
                {Object.entries(product.specifications).map(([key, value], index) => (
                  <div
                    key={key}
                    className="flex border-b-2 border-gray-200 dark:border-gray-700 pb-4 animate-fade-in"
                    style={{ animationDelay: `${index * 50}ms` }}
                  >
                    <span className="font-semibold text-gray-900 dark:text-gray-100 w-1/3">
                      {key}:
                    </span>
                    <span className="text-gray-600 dark:text-gray-400 flex-1 font-medium">
                      {value}
                    </span>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'reviews' && (
              <div>
                <div className="text-center py-16 bg-gray-50 dark:bg-gray-800 rounded-2xl">
                  <p className="text-gray-600 dark:text-gray-400 text-lg">
                    Reviews feature coming soon
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="animate-fade-in">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-10">
              Related Products
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {relatedProducts.map((relatedProduct, index) => (
                <div
                  key={relatedProduct.id}
                  className="animate-fade-in"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <Link to={`/products/${relatedProduct.slug}`} className="block">
                    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-100 dark:border-gray-700 hover:border-primary-200 dark:hover:border-primary-800">
                      <div className="aspect-square overflow-hidden">
                        <img
                          src={relatedProduct.images[0]}
                          alt={relatedProduct.name}
                          className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                        />
                      </div>
                      <div className="p-5">
                        <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-2 line-clamp-2 hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
                          {relatedProduct.name}
                        </h3>
                        <p className="text-xl font-bold text-primary-600 dark:text-primary-400">
                          ${relatedProduct.price.toLocaleString()}
                        </p>
                      </div>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDetail;
