import React, { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Filter, X, SlidersHorizontal, Star } from 'lucide-react';
import ProductCard from '../components/ProductCard';
import { products, categories } from '../data/mockData';

type SortOption = 'default' | 'price-low' | 'price-high' | 'rating' | 'newest';

const Products: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(
    searchParams.get('category') || 'all'
  );
  const [selectedBrand, setSelectedBrand] = useState('all');
  const [priceRange, setPriceRange] = useState([0, 200000]);
  const [minRating, setMinRating] = useState(0);
  const [sortBy, setSortBy] = useState<SortOption>('default');
  const [searchQuery, setSearchQuery] = useState(searchParams.get('search') || '');

  // Get unique brands
  const brands = useMemo(() => {
    const uniqueBrands = Array.from(new Set(products.map((p) => p.brand)));
    return uniqueBrands.sort();
  }, []);

  // Filter products
  const filteredProducts = useMemo(() => {
    let filtered = products;

    // Search filter
    if (searchQuery) {
      filtered = filtered.filter(
        (p) =>
          p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.brand.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Category filter
    if (selectedCategory !== 'all') {
      filtered = filtered.filter((p) => p.categorySlug === selectedCategory);
    }

    // Brand filter
    if (selectedBrand !== 'all') {
      filtered = filtered.filter((p) => p.brand === selectedBrand);
    }

    // Price range filter
    filtered = filtered.filter(
      (p) => p.price >= priceRange[0] && p.price <= priceRange[1]
    );

    // Rating filter
    if (minRating > 0) {
      filtered = filtered.filter((p) => p.rating >= minRating);
    }

    // Sort
    switch (sortBy) {
      case 'price-low':
        filtered = [...filtered].sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        filtered = [...filtered].sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        filtered = [...filtered].sort((a, b) => b.rating - a.rating);
        break;
      case 'newest':
        filtered = [...filtered].reverse();
        break;
      default:
        break;
    }

    return filtered;
  }, [selectedCategory, selectedBrand, priceRange, minRating, sortBy, searchQuery]);

  const handleResetFilters = () => {
    setSelectedCategory('all');
    setSelectedBrand('all');
    setPriceRange([0, 200000]);
    setMinRating(0);
    setSortBy('default');
    setSearchQuery('');
    setSearchParams({});
  };

  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4">
        <div className="mb-10 animate-fade-in">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-3">
            All Products
          </h1>
          <p className="text-gray-600 dark:text-gray-400 text-lg">
            Found {filteredProducts.length} products
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Filters */}
          <aside
            className={`lg:w-72 ${
              isFilterOpen ? 'block' : 'hidden lg:block'
            } bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 h-fit lg:sticky lg:top-24 border border-gray-100 dark:border-gray-700 animate-fade-in`}
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 flex items-center gap-2">
                <SlidersHorizontal className="w-5 h-5 text-primary-600 dark:text-primary-400" />
                Filters
              </h2>
              <button
                onClick={() => setIsFilterOpen(false)}
                className="lg:hidden p-2 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-all duration-200"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Search */}
            <div className="mb-6">
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                Search
              </label>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search products..."
                className="w-full px-4 py-3 border-2 border-gray-200 dark:border-gray-700 rounded-xl bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-all duration-200 focus:outline-none focus:border-primary-400 dark:focus:border-primary-500 focus:ring-0 focus:shadow-[0_0_0_3px_rgba(14,165,233,0.1)] dark:focus:shadow-[0_0_0_3px_rgba(56,189,248,0.1)]"
              />
            </div>

            {/* Category Filter */}
            <div className="mb-6">
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                Category
              </label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full px-4 py-3 border-2 border-gray-300 dark:border-gray-700 rounded-xl bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all duration-200 cursor-pointer"
              >
                <option value="all">All</option>
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.slug}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Brand Filter */}
            <div className="mb-6">
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                Brand
              </label>
              <select
                value={selectedBrand}
                onChange={(e) => setSelectedBrand(e.target.value)}
                className="w-full px-4 py-3 border-2 border-gray-300 dark:border-gray-700 rounded-xl bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all duration-200 cursor-pointer"
              >
                <option value="all">All</option>
                {brands.map((brand) => (
                  <option key={brand} value={brand}>
                    {brand}
                  </option>
                ))}
              </select>
            </div>

            {/* Price Range */}
            <div className="mb-6">
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
                Price: ${priceRange[0].toLocaleString()} - ${priceRange[1].toLocaleString()}
              </label>
              <div className="flex gap-3">
                <input
                  type="number"
                  value={priceRange[0]}
                  onChange={(e) =>
                    setPriceRange([Number(e.target.value), priceRange[1]])
                  }
                  min="0"
                  className="w-full px-4 py-2 border-2 border-gray-300 dark:border-gray-700 rounded-xl bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all duration-200"
                />
                <input
                  type="number"
                  value={priceRange[1]}
                  onChange={(e) =>
                    setPriceRange([priceRange[0], Number(e.target.value)])
                  }
                  min="0"
                  className="w-full px-4 py-2 border-2 border-gray-300 dark:border-gray-700 rounded-xl bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all duration-200"
                />
              </div>
            </div>

            {/* Rating Filter */}
            <div className="mb-6">
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
                Minimum Rating: {minRating > 0 ? `${minRating}+` : 'All'}
              </label>
              <div className="flex items-center gap-2 mb-2">
                <input
                  type="range"
                  min="0"
                  max="5"
                  step="0.5"
                  value={minRating}
                  onChange={(e) => setMinRating(Number(e.target.value))}
                  className="flex-1 h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-primary-600"
                />
                {minRating > 0 && (
                  <div className="flex items-center gap-0.5">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                      {minRating}
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* Reset Button */}
            <button
              onClick={handleResetFilters}
              className="w-full bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-900 dark:text-gray-100 font-semibold py-3 px-4 rounded-xl transition-all duration-200 active:scale-95"
            >
              Reset Filters
            </button>
          </aside>

          {/* Main Content */}
          <div className="flex-1">
            {/* Toolbar */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
              <button
                onClick={() => setIsFilterOpen(true)}
                className="lg:hidden flex items-center gap-2 bg-white dark:bg-gray-800 px-5 py-3 rounded-xl shadow-md hover:shadow-lg transition-all duration-200 border border-gray-200 dark:border-gray-700 hover:border-primary-300 dark:hover:border-primary-700"
              >
                <Filter className="w-5 h-5" />
                <span className="font-semibold">Filters</span>
              </button>

              <div className="flex items-center gap-4">
                <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                  Sort by:
                </label>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as SortOption)}
                  className="px-5 py-3 border-2 border-gray-300 dark:border-gray-700 rounded-xl bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all duration-200 cursor-pointer font-medium"
                >
                  <option value="default">Default</option>
                  <option value="price-low">Price: Low → High</option>
                  <option value="price-high">Price: High → Low</option>
                  <option value="rating">Highest Rated</option>
                  <option value="newest">Newest</option>
                </select>
              </div>
            </div>

            {/* Products Grid */}
            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredProducts.map((product, index) => (
                  <div
                    key={product.id}
                    className="animate-fade-in"
                    style={{ animationDelay: `${index * 50}ms` }}
                  >
                    <ProductCard product={product} />
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-20 animate-fade-in">
                <div className="max-w-md mx-auto">
                  <p className="text-2xl font-semibold text-gray-500 dark:text-gray-400 mb-4">
                    No products found
                  </p>
                  <button
                    onClick={handleResetFilters}
                    className="text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 font-semibold px-6 py-3 rounded-xl hover:bg-primary-50 dark:hover:bg-primary-900/20 transition-all duration-200"
                  >
                    Clear all filters
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Products;
