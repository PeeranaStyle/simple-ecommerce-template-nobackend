import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight } from 'lucide-react';
import { useCart } from '../context/CartContext';

const Cart: React.FC = () => {
  const { cart, removeFromCart, updateQuantity, getTotalPrice, getTotalItems } = useCart();
  const navigate = useNavigate();

  if (cart.length === 0) {
    return (
      <div className="min-h-screen py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-md mx-auto text-center">
            <ShoppingBag className="w-24 h-24 text-gray-300 dark:text-gray-600 mx-auto mb-6" />
            <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-4">
              Your cart is empty
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mb-8">
              Start shopping to add items to your cart
            </p>
            <Link
              to="/products"
              className="inline-flex items-center gap-2 bg-primary-600 hover:bg-primary-700 text-white font-semibold px-8 py-3 rounded-xl transition-all duration-300 hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl ripple"
            >
              Go Shopping
              <ArrowRight className="w-5 h-5 transition-transform duration-200 group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-8">
          Shopping Cart ({getTotalItems()} items)
        </h1>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {cart.map((item) => (
              <div
                key={item.product.id}
                className="bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-xl p-6 flex flex-col sm:flex-row gap-4 transition-all duration-300 border border-gray-100 dark:border-gray-700 hover:border-primary-200 dark:hover:border-primary-800 animate-fade-in"
              >
                {/* Product Image */}
                <Link
                  to={`/products/${item.product.slug}`}
                  className="flex-shrink-0 w-full sm:w-32 h-32 rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-700"
                >
                  <img
                    src={item.product.images[0]}
                    alt={item.product.name}
                    className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                  />
                </Link>

                {/* Product Info */}
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <Link
                      to={`/products/${item.product.slug}`}
                      className="text-lg font-semibold text-gray-900 dark:text-gray-100 hover:text-primary-600 dark:hover:text-primary-400 transition-colors mb-2"
                    >
                      {item.product.name}
                    </Link>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
                      {item.product.brand}
                    </p>
                    <p className="text-xl font-bold text-primary-600 dark:text-primary-400">
                      ${item.product.price.toLocaleString()}
                    </p>
                  </div>

                  {/* Quantity Controls */}
                  <div className="flex items-center justify-between mt-4">
                    <div className="flex items-center border-2 border-gray-300 dark:border-gray-700 rounded-xl overflow-hidden">
                      <button
                        onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                        className="p-3 hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-200 active:scale-95"
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <span className="px-6 py-3 min-w-[80px] text-center font-semibold text-gray-900 dark:text-gray-100">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                        className="p-3 hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-200 active:scale-95"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="text-right">
                      <p className="text-sm text-gray-500 dark:text-gray-400">Subtotal</p>
                      <p className="text-lg font-bold text-gray-900 dark:text-gray-100">
                        ${(item.product.price * item.quantity).toLocaleString()}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Remove Button */}
                <button
                  onClick={() => removeFromCart(item.product.id)}
                  className="self-start sm:self-center p-3 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-xl transition-all duration-200 hover:scale-110 active:scale-95"
                  aria-label="Remove item"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 sticky top-24 border border-gray-100 dark:border-gray-700 animate-fade-in">
              <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-6">
                Order Summary
              </h2>

              <div className="space-y-4 mb-6">
                <div className="flex justify-between text-gray-700 dark:text-gray-300">
                  <span>Items:</span>
                  <span className="font-semibold">{getTotalItems()} items</span>
                </div>
                <div className="flex justify-between text-gray-700 dark:text-gray-300">
                  <span>Subtotal:</span>
                  <span className="font-semibold">${getTotalPrice().toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-gray-700 dark:text-gray-300">
                  <span>Shipping:</span>
                  <span className="font-semibold">Free</span>
                </div>
                <div className="border-t border-gray-200 dark:border-gray-700 pt-4 flex justify-between text-lg font-bold text-gray-900 dark:text-gray-100">
                  <span>Total:</span>
                  <span className="text-primary-600 dark:text-primary-400">
                    ${getTotalPrice().toLocaleString()}
                  </span>
                </div>
              </div>

              <button
                onClick={() => navigate('/checkout')}
                className="w-full bg-primary-600 hover:bg-primary-700 text-white font-semibold py-4 px-6 rounded-xl transition-all duration-300 hover:scale-105 active:scale-95 mb-4 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl ripple"
              >
                Proceed to Checkout
                <ArrowRight className="w-5 h-5 transition-transform duration-200 group-hover:translate-x-1" />
              </button>

              <Link
                to="/products"
                className="block w-full text-center text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 font-semibold py-2 transition-colors"
              >
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
