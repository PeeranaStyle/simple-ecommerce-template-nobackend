import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';
import ProductCard from '../components/ProductCard';
import { products, categories } from '../data/mockData';

const Home: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const heroRef = useRef<HTMLDivElement | null>(null);
  const [parallax, setParallax] = useState({ x: 0, y: 0 });
  const latestRef = useRef<HTMLDivElement | null>(null);
  const [timeLeft, setTimeLeft] = useState<{ days: number; hours: number; minutes: number; seconds: number }>({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const featuredProducts = products.filter((p) => p.featured);
  const latestProducts = products.slice(0, 8);

  // Hero Carousel
  const heroSlides = [
    {
      title: 'TerraBook Pro 16',
      description: 'Flagship 16-inch creator laptop with next‑gen performance',
      image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=1200',
      link: '/products/terrabook-pro-16',
    },
    {
      title: 'Nimbus Phone Pro',
      description: 'Precision-built smartphone with a pro camera system',
      image: 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=1200',
      link: '/products/nimbus-phone-pro',
    },
    {
      title: 'Zephyr ANC X5',
      description: 'Studio-grade wireless ANC headphones',
      image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=1200',
      link: '/products/zephyr-anc-x5',
    },
  ];

  // Image-based categories (images come from categories data)

  useEffect(() => {
    const heroSlidesLength = heroSlides.length;
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlidesLength);
    }, 5000);
    return () => clearInterval(timer);
  }, [heroSlides.length]);

  // Simple parallax on mouse move within hero
  useEffect(() => {
    const el = heroRef.current;
    if (!el) return;
    const onMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      setParallax({ x, y });
    };
    el.addEventListener('mousemove', onMove);
    return () => el.removeEventListener('mousemove', onMove);
  }, []);

  // Special offer countdown (e.g., ends in 7 days)
  useEffect(() => {
    const target = new Date();
    target.setDate(target.getDate() + 7);
    const tick = () => {
      const now = new Date().getTime();
      const diff = target.getTime() - now;
      const days = Math.max(0, Math.floor(diff / (1000 * 60 * 60 * 24)));
      const hours = Math.max(0, Math.floor((diff / (1000 * 60 * 60)) % 24));
      const minutes = Math.max(0, Math.floor((diff / (1000 * 60)) % 60));
      const seconds = Math.max(0, Math.floor((diff / 1000) % 60));
      setTimeLeft({ days, hours, minutes, seconds });
    };
    tick();
    const iv = setInterval(tick, 1000);
    return () => clearInterval(iv);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);
  };

  return (
    <div className="min-h-screen">
      {/* Hero Banner */}
      <section ref={heroRef} className="relative h-[640px] md:h-[760px] overflow-hidden">
        {heroSlides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-all duration-700 ease-in-out ${
              index === currentSlide
                ? 'opacity-100 scale-100'
                : 'opacity-0 scale-105'
            }`}
          >
            <div
              className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 will-change-transform"
              style={{
                backgroundImage: `url(${slide.image})`,
                transform: `translate3d(${parallax.x * -10}px, ${parallax.y * -10}px, 0)`,
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/40" />
              <div
                className="absolute -left-20 top-0 h-full w-[40%] bg-gradient-to-b from-primary-600/40 to-transparent skew-x-[-12deg] blur-2xl opacity-50"
                style={{ transform: `translate3d(${parallax.x * 20}px, ${parallax.y * 10}px, 0) skewX(-12deg)` }}
              />
              <div className="absolute right-10 top-10 h-32 w-32 rounded-full bg-white/5 blur-xl" />
            </div>
            <div className="relative h-full flex items-center">
              <div className="container mx-auto px-4">
                <div className={`max-w-2xl text-white transition-all duration-700 ${
                  index === currentSlide
                    ? 'translate-x-0 opacity-100'
                    : 'translate-x-10 opacity-0'
                }`}>
                  <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-[1.1] tracking-tight">
                    {slide.title}
                  </h1>
                  <p className="text-xl md:text-2xl mb-10 text-gray-200 font-light max-w-xl">
                    {slide.description}
                  </p>
                  <Link
                    to={slide.link}
                    className="inline-flex items-center gap-3 bg-primary-600 hover:bg-primary-700 text-white font-semibold px-10 py-4 rounded-xl transition-all duration-300 hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl ripple group"
                  >
                    Shop Now
                    <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* Navigation Arrows */}
        <button
          onClick={prevSlide}
          className="absolute left-6 top-1/2 -translate-y-1/2 p-4 bg-white/10 hover:bg-white/20 text-white rounded-full backdrop-blur-md transition-all duration-300 hover:scale-110 active:scale-95 shadow-lg z-10"
          aria-label="Previous slide"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-6 top-1/2 -translate-y-1/2 p-4 bg-white/10 hover:bg-white/20 text-white rounded-full backdrop-blur-md transition-all duration-300 hover:scale-110 active:scale-95 shadow-lg z-10"
          aria-label="Next slide"
        >
          <ChevronRight className="w-6 h-6" />
        </button>

        {/* Dots Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-3 z-10">
          {heroSlides.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                setCurrentSlide(index);
              }}
              className={`rounded-full transition-all duration-300 ${
                index === currentSlide
                  ? 'bg-white w-10 h-3'
                  : 'bg-white/40 w-3 h-3 hover:bg-white/60'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-20 bg-gray-50 dark:bg-gray-900/50">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-16 text-gray-900 dark:text-gray-100">
            Product Categories
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-6 [grid-auto-rows:160px] sm:[grid-auto-rows:200px] lg:[grid-auto-rows:180px]">
            {categories.filter((c) => c.slug !== 'accessories').map((category, index) => {
              const pattern = [
                'col-span-2 sm:col-span-2 lg:col-span-3 lg:row-span-2',
                'col-span-1 sm:col-span-1 lg:col-span-2 lg:row-span-1',
                'col-span-1 sm:col-span-1 lg:col-span-1 lg:row-span-1',
                'col-span-2 sm:col-span-1 lg:col-span-2 lg:row-span-1',
                'col-span-1 sm:col-span-1 lg:col-span-1 lg:row-span-1',
                'col-span-1 sm:col-span-1 lg:col-span-1 lg:row-span-1',
                'col-span-2 sm:col-span-2 lg:col-span-3 lg:row-span-2',
                'col-span-1 sm:col-span-1 lg:col-span-2 lg:row-span-1',
              ];
              const span = pattern[index % pattern.length];
              return (
                <Link
                  key={category.id}
                  to={`/products?category=${category.slug}`}
                  className={`group relative block overflow-hidden rounded-3xl bg-white dark:bg-gray-800 hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-gray-100 dark:border-gray-700 hover:border-primary-200 dark:hover:border-primary-800 ring-1 ring-transparent group-hover:ring-primary-300/30 dark:group-hover:ring-primary-700/30 animate-fade-in ${span}`}
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <div className="absolute inset-0">
                    <img
                      src={category.image || ''}
                      alt={category.name}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-80 transition-opacity duration-500 group-hover:opacity-100" />
                    <div className="absolute -bottom-10 right-0 w-40 h-40 bg-primary-600/20 rounded-full blur-2xl transition-all duration-500 group-hover:translate-y-6" />
                  </div>
                  <div className="absolute inset-x-0 bottom-0 p-4 sm:p-5">
                    <div className="px-4 py-2.5 sm:px-5 sm:py-3 rounded-xl bg-black/40 dark:bg-black/30 backdrop-blur-md inline-flex">
                      <h3 className="text-sm sm:text-base font-semibold text-white">
                        {category.name}
                      </h3>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-12">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-gray-100">
              Featured Products
            </h2>
            <Link
              to="/products?featured=true"
              className="text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 font-semibold flex items-center gap-2 transition-all duration-200 hover:gap-3 group"
            >
              View All
              <ArrowRight className="w-5 h-5 transition-transform duration-200 group-hover:translate-x-1" />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredProducts.slice(0, 4).map((product, index) => (
              <div
                key={product.id}
                className="relative animate-fade-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Latest Products */}
      <section className="py-20 bg-gray-50 dark:bg-gray-900/50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-12">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-gray-100">
              Latest Products
            </h2>
            <Link
              to="/products"
              className="text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 font-semibold flex items-center gap-2 transition-all duration-200 hover:gap-3 group"
            >
              View All
              <ArrowRight className="w-5 h-5 transition-transform duration-200 group-hover:translate-x-1" />
            </Link>
          </div>
          <div className="relative">
            <div className="pointer-events-none absolute -left-4 top-0 h-full w-8 bg-gradient-to-r from-gray-50 dark:from-gray-900/50 to-transparent z-10" />
            <div className="pointer-events-none absolute -right-4 top-0 h-full w-8 bg-gradient-to-l from-gray-50 dark:from-gray-900/50 to-transparent z-10" />
            <div ref={latestRef} className="flex gap-6 overflow-x-auto snap-x snap-mandatory scroll-smooth pb-2">
              {latestProducts.map((product, index) => (
                <div key={product.id} className="min-w-[280px] sm:min-w-[320px] lg:min-w-[340px] snap-start animate-fade-in" style={{ animationDelay: `${index * 60}ms` }}>
                  <ProductCard product={product} />
                </div>
              ))}
            </div>
            <div className="flex items-center gap-3 justify-end mt-6">
              <button
                onClick={() => latestRef.current?.scrollBy({ left: -320, behavior: 'smooth' })}
                className="p-3 rounded-full bg-white dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 shadow"
                aria-label="Scroll left"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={() => latestRef.current?.scrollBy({ left: 320, behavior: 'smooth' })}
                className="p-3 rounded-full bg-white dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 shadow"
                aria-label="Scroll right"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </section>
      <section className="relative py-28">
        <div
          className="absolute inset-0 -z-10 bg-[url('https://images.unsplash.com/photo-1527443154391-507e9dc6c5cc?w=1600')] bg-cover bg-center"
        >
          <div className="absolute inset-0 bg-black/70" />
          <div className="absolute inset-0 bg-gradient-to-r from-primary-700/30 to-transparent" />
        </div>
        <div className="container mx-auto px-4 text-white">
          <div className="max-w-3xl">
            <h3 className="text-sm uppercase tracking-[0.3em] text-white/70 mb-4">Limited Collection</h3>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">Experience the Art of Technology</h2>
            <p className="text-lg text-white/80 mb-10 max-w-xl">Curated devices and accessories crafted with precision. Elevate your everyday with premium performance and timeless design.</p>
            <Link to="/products?collection=luxe" className="inline-flex items-center gap-3 bg-white text-gray-900 font-semibold px-8 py-3.5 rounded-xl hover:bg-gray-100 transition-all duration-300 hover:scale-105 active:scale-95 shadow-lg group">
              Explore the Collection
              <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </section>
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-14 text-gray-900 dark:text-gray-100">What Clients Say</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1,2,3].map((i) => (
              <div key={i} className="relative rounded-3xl border border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900/60 backdrop-blur p-8 shadow-sm transition-all duration-300 hover:shadow-xl animate-fade-in">
                <div className="absolute -top-5 left-6 w-10 h-10 rounded-full bg-primary-600 text-white grid place-items-center shadow-lg">“</div>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-6">Exceptional quality and a delightful shopping experience. The product selection feels carefully curated and customer service is impeccable.</p>
                <div className="flex items-center gap-4">
                  <img src={`https://i.pravatar.cc/80?img=${i+10}`} alt="Client" className="w-12 h-12 rounded-full object-cover" />
                  <div>
                    <div className="font-semibold text-gray-900 dark:text-gray-100">Alex Morgan</div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">Creative Director, Avant Studio</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="py-16 bg-gray-50 dark:bg-gray-900/50">
        <div className="container mx-auto px-4">
          <h3 className="text-center text-sm uppercase tracking-[0.3em] text-gray-500 dark:text-gray-400 mb-8">Preferred by Leading Creators</h3>
          <div className="relative overflow-hidden">
            <div className="flex items-center gap-16 animate-[marquee_22s_linear_infinite] will-change-transform">
              {['Aelion','Nimbus','Solara','Zephyrus','Vertex','Nebula','Lumina','Chronos','Orion','Vellum'].map((name) => (
                <div key={name} className="shrink-0 opacity-80 hover:opacity-100 transition-opacity text-gray-700 dark:text-gray-300 text-2xl font-semibold">{name}</div>
              ))}
              {['Aelion','Nimbus','Solara','Zephyrus','Vertex','Nebula','Lumina','Chronos','Orion','Vellum'].map((name, idx) => (
                <div key={name+idx} className="shrink-0 opacity-80 hover:opacity-100 transition-opacity text-gray-700 dark:text-gray-300 text-2xl font-semibold">{name}</div>
              ))}
            </div>
          </div>
        </div>
      </section>
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <div className="order-2 lg:order-1">
              <h2 className="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">Limited Time Offer</h2>
              <p className="text-gray-600 dark:text-gray-300 mb-8 max-w-xl">Save on premium picks this week only. Luxurious design meets powerful performance across our curated selection.</p>
              <div className="flex gap-4">
                {[
                  { label: 'Days', value: timeLeft.days },
                  { label: 'Hours', value: timeLeft.hours },
                  { label: 'Minutes', value: timeLeft.minutes },
                  { label: 'Seconds', value: timeLeft.seconds },
                ].map((t) => (
                  <div key={t.label} className="w-24 rounded-2xl bg-gray-50 dark:bg-gray-800 border border-gray-100 dark:border-gray-700 p-4 text-center">
                    <div className="text-3xl font-bold text-gray-900 dark:text-gray-100 tabular-nums">{String(t.value).padStart(2,'0')}</div>
                    <div className="text-xs uppercase tracking-wide text-gray-500 mt-1">{t.label}</div>
                  </div>
                ))}
              </div>
              <Link to="/products?deal=limited" className="mt-8 inline-flex items-center gap-3 bg-primary-600 hover:bg-primary-700 text-white font-semibold px-8 py-3.5 rounded-xl transition-all duration-300 hover:scale-105 active:scale-95 shadow-lg group">
                Shop the Deals
                <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </div>
            <div className="order-1 lg:order-2 relative rounded-3xl overflow-hidden h-80 lg:h-[420px]">
              <img src="https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=1600" alt="Special Offer" className="absolute inset-0 h-full w-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-tr from-black/60 via-black/20 to-transparent" />
              <div className="absolute right-6 bottom-6 px-5 py-2.5 rounded-xl bg-white/90 dark:bg-gray-900/80 text-gray-900 dark:text-gray-100 text-sm font-semibold shadow">Up to 20% off</div>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="relative py-24 overflow-hidden bg-gradient-to-br from-primary-500 via-primary-600 to-primary-700 dark:from-primary-800 dark:via-primary-900 dark:to-primary-950">
        {/* Decorative elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -left-20 -top-20 w-64 h-64 bg-white/5 rounded-full filter blur-3xl animate-float" />
          <div className="absolute -right-20 -bottom-20 w-80 h-80 bg-white/5 rounded-full filter blur-3xl animate-float animation-delay-2000" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl h-64 bg-gradient-to-r from-primary-400/20 to-primary-600/20 rounded-full filter blur-[100px]" />
        </div>
        
        <div className="relative container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            {/* Animated title */}
            <div className="inline-block mb-3">
              <span className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md rounded-full px-4 py-1.5 text-sm font-medium text-white/90 mb-4 animate-fade-in">
                <svg className="w-4 h-4 animate-pulse" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path d="M10 2a8 8 0 100 16 8 8 0 000-16zm0 14a6 6 0 110-12 6 6 0 010 12zm-1-9v4a1 1 0 002 0V7a1 1 0 00-2 0zm0 6a1 1 0 102 0 1 1 0 00-2 0z" />
                </svg>
                Stay Updated
              </span>
            </div>
            
            <h2 className="text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-white/80 mb-6 leading-tight">
              Never Miss an Update
            </h2>
            
            <p className="text-lg text-white/80 max-w-2xl mx-auto mb-10 leading-relaxed">
              Subscribe to our newsletter and be the first to know about exclusive offers, new arrivals, and insider-only deals.
            </p>
            
            {/* Enhanced form with floating labels and animations */}
            <form className="group relative max-w-xl mx-auto transition-all duration-500 hover:scale-[1.02] focus-within:scale-[1.02]">
              <div className="relative">
                <input
                  type="email"
                  required
                  className="peer w-full px-6 py-5 pr-36 text-gray-900 bg-white/90 backdrop-blur-sm rounded-xl border-0 shadow-2xl shadow-primary-700/30 focus:ring-2 focus:ring-white/90 focus:ring-offset-2 focus:ring-offset-primary-500/50 transition-all duration-300 placeholder-transparent"
                  placeholder=" "
                />
                <label className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none transition-all duration-200 peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:top-3 peer-focus:text-xs peer-focus:text-gray-500 peer-focus:font-medium">
                  Enter your email
                </label>
                <button
                  type="submit"
                  className="absolute right-1.5 top-1/2 -translate-y-1/2 bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800 text-white font-semibold px-6 py-3.5 rounded-lg shadow-lg hover:shadow-xl active:shadow-md transition-all duration-300 transform hover:-translate-y-0.5 active:translate-y-0 flex items-center gap-2 group-hover:shadow-primary-500/30 group-focus-within:shadow-primary-500/30"
                >
                  <span>Subscribe</span>
                  <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </button>
              </div>
              <p className="mt-3 text-sm text-white/60 text-center opacity-0 group-focus-within:opacity-100 transition-opacity duration-300">
                We respect your privacy. Unsubscribe at any time.
              </p>
            </form>
            
            {/* Trust indicators */}
            <div className="mt-12 flex flex-wrap items-center justify-center gap-6 text-white/60 text-sm">
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-green-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                No spam, ever
              </div>
              <div className="h-4 w-px bg-white/20" />
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-green-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                </svg>
                Your data is secure
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
