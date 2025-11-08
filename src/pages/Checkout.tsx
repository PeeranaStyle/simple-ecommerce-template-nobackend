import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle, CreditCard, Truck, MapPin } from 'lucide-react';
import { useCart } from '../context/CartContext';

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  postalCode: string;
  shippingMethod: 'standard' | 'express';
  paymentMethod: 'credit' | 'debit' | 'cod';
}

interface FormErrors {
  [key: string]: string;
}

const Checkout: React.FC = () => {
  const { cart, getTotalPrice, getTotalItems, clearCart } = useCart();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    postalCode: '',
    shippingMethod: 'standard',
    paymentMethod: 'credit',
  });
  const [errors, setErrors] = useState<FormErrors>({});

  if (cart.length === 0 && !isSuccess) {
    navigate('/cart');
    return null;
  }

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.firstName.trim()) {
      newErrors.firstName = 'Please enter your first name';
    }
    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Please enter your last name';
    }
    if (!formData.email.trim()) {
      newErrors.email = 'Please enter your email';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Invalid email format';
    }
    if (!formData.phone.trim()) {
      newErrors.phone = 'Please enter your phone number';
    } else if (!/^[0-9]{10}$/.test(formData.phone.replace(/-/g, ''))) {
      newErrors.phone = 'Phone number must be 10 digits';
    }
    if (!formData.address.trim()) {
      newErrors.address = 'Please enter your address';
    }
    if (!formData.city.trim()) {
      newErrors.city = 'Please enter your city';
    }
    if (!formData.postalCode.trim()) {
      newErrors.postalCode = 'Please enter your postal code';
    } else if (!/^[0-9]{5}$/.test(formData.postalCode)) {
      newErrors.postalCode = 'Postal code must be 5 digits';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setIsSubmitting(false);
    setIsSuccess(true);
    clearCart();
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  if (isSuccess) {
    return (
      <div className="min-h-screen py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <div className="mb-8">
              <CheckCircle className="w-24 h-24 text-green-500 mx-auto mb-6 animate-scale-in" />
              <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-4">
                Order Placed Successfully!
              </h1>
              <p className="text-gray-600 dark:text-gray-400 mb-8">
                Thank you for your order. We will send you a confirmation email shortly.
              </p>
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 mb-8 text-left border border-gray-100 dark:border-gray-700 animate-scale-in">
                <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-4">
                  Order Details
                </h2>
                <div className="space-y-2 text-gray-700 dark:text-gray-300">
                  <p>
                    <span className="font-semibold">Name:</span> {formData.firstName}{' '}
                    {formData.lastName}
                  </p>
                  <p>
                    <span className="font-semibold">Email:</span> {formData.email}
                  </p>
                  <p>
                    <span className="font-semibold">Phone:</span> {formData.phone}
                  </p>
                  <p>
                    <span className="font-semibold">Address:</span> {formData.address},{' '}
                    {formData.city} {formData.postalCode}
                  </p>
                  <p>
                    <span className="font-semibold">Shipping Method:</span>{' '}
                    {formData.shippingMethod === 'standard' ? 'Standard Shipping' : 'Express Shipping'}
                  </p>
                  <p>
                    <span className="font-semibold">Payment Method:</span>{' '}
                    {formData.paymentMethod === 'credit'
                      ? 'Credit Card'
                      : formData.paymentMethod === 'debit'
                      ? 'Debit Card'
                      : 'Cash on Delivery'}
                  </p>
                </div>
              </div>
              <button
                onClick={() => navigate('/products')}
                className="bg-primary-600 hover:bg-primary-700 text-white font-semibold px-10 py-4 rounded-xl transition-all duration-300 hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl ripple"
              >
                Continue Shopping
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-8 animate-fade-in">
          Checkout
        </h1>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Checkout Form */}
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Billing Details */}
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 border border-gray-100 dark:border-gray-700 animate-fade-in">
                <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-6 flex items-center gap-2">
                  <MapPin className="w-5 h-5" />
                  Shipping Information
                </h2>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                      First Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      className={`w-full px-5 py-3 border-2 rounded-xl bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-0 transition-all duration-200 ${
                        errors.firstName
                          ? 'border-red-500 focus:border-red-500 focus:shadow-[0_0_0_3px_rgba(239,68,68,0.1)] animate-shake'
                          : 'border-gray-300 dark:border-gray-700 focus:border-primary-400 dark:focus:border-primary-500 focus:shadow-[0_0_0_3px_rgba(14,165,233,0.1)] dark:focus:shadow-[0_0_0_3px_rgba(56,189,248,0.1)]'
                      }`}
                    />
                    {errors.firstName && (
                      <p className="text-red-500 text-sm mt-2 animate-fade-in font-medium">{errors.firstName}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                      Last Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      className={`w-full px-5 py-3 border-2 rounded-xl bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-0 transition-all duration-200 ${
                        errors.lastName
                          ? 'border-red-500 focus:border-red-500 focus:shadow-[0_0_0_3px_rgba(239,68,68,0.1)] animate-shake'
                          : 'border-gray-300 dark:border-gray-700 focus:border-primary-400 dark:focus:border-primary-500 focus:shadow-[0_0_0_3px_rgba(14,165,233,0.1)] dark:focus:shadow-[0_0_0_3px_rgba(56,189,248,0.1)]'
                      }`}
                    />
                    {errors.lastName && (
                      <p className="text-red-500 text-sm mt-2 animate-fade-in font-medium">{errors.lastName}</p>
                    )}
                  </div>
                </div>

                <div className="mt-4">
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    Email <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`w-full px-5 py-3 border-2 rounded-xl bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-0 transition-all duration-200 ${
                      errors.email
                        ? 'border-red-500 focus:border-red-500 focus:shadow-[0_0_0_3px_rgba(239,68,68,0.1)] animate-shake'
                        : 'border-gray-300 dark:border-gray-700 focus:border-primary-400 dark:focus:border-primary-500 focus:shadow-[0_0_0_3px_rgba(14,165,233,0.1)] dark:focus:shadow-[0_0_0_3px_rgba(56,189,248,0.1)]'
                    }`}
                  />
                  {errors.email && (
                    <p className="text-red-500 text-sm mt-2 animate-fade-in font-medium">{errors.email}</p>
                  )}
                </div>

                <div className="mt-4">
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    Phone <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="1234567890"
                    className={`w-full px-5 py-3 border-2 rounded-xl bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-0 transition-all duration-200 ${
                      errors.phone
                        ? 'border-red-500 focus:border-red-500 focus:shadow-[0_0_0_3px_rgba(239,68,68,0.1)] animate-shake'
                        : 'border-gray-300 dark:border-gray-700 focus:border-primary-400 dark:focus:border-primary-500 focus:shadow-[0_0_0_3px_rgba(14,165,233,0.1)] dark:focus:shadow-[0_0_0_3px_rgba(56,189,248,0.1)]'
                    }`}
                  />
                  {errors.phone && (
                    <p className="text-red-500 text-sm mt-2 animate-fade-in font-medium">{errors.phone}</p>
                  )}
                </div>

                <div className="mt-4">
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    Address <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    name="address"
                    value={formData.address}
                    onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
                      const { name, value } = e.target;
                      setFormData((prev) => ({ ...prev, [name]: value }));
                      if (errors[name]) {
                        setErrors((prev) => ({ ...prev, [name]: '' }));
                      }
                    }}
                    rows={3}
                    className={`w-full px-5 py-3 border-2 rounded-xl bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-0 transition-all duration-200 ${
                      errors.address
                        ? 'border-red-500 focus:border-red-500 focus:shadow-[0_0_0_3px_rgba(239,68,68,0.1)] animate-shake'
                        : 'border-gray-300 dark:border-gray-700 focus:border-primary-400 dark:focus:border-primary-500 focus:shadow-[0_0_0_3px_rgba(14,165,233,0.1)] dark:focus:shadow-[0_0_0_3px_rgba(56,189,248,0.1)]'
                    }`}
                  />
                  {errors.address && (
                    <p className="text-red-500 text-sm mt-2 animate-fade-in font-medium">{errors.address}</p>
                  )}
                </div>

                <div className="grid md:grid-cols-2 gap-4 mt-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                      City <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                      className={`w-full px-5 py-3 border-2 rounded-xl bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-0 transition-all duration-200 ${
                        errors.city
                          ? 'border-red-500 focus:border-red-500 focus:shadow-[0_0_0_3px_rgba(239,68,68,0.1)] animate-shake'
                          : 'border-gray-300 dark:border-gray-700 focus:border-primary-400 dark:focus:border-primary-500 focus:shadow-[0_0_0_3px_rgba(14,165,233,0.1)] dark:focus:shadow-[0_0_0_3px_rgba(56,189,248,0.1)]'
                      }`}
                    />
                    {errors.city && (
                      <p className="text-red-500 text-sm mt-2 animate-fade-in font-medium">{errors.city}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                      Postal Code <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="postalCode"
                      value={formData.postalCode}
                      onChange={handleChange}
                      maxLength={5}
                      className={`w-full px-5 py-3 border-2 rounded-xl bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-0 transition-all duration-200 ${
                        errors.postalCode
                          ? 'border-red-500 focus:border-red-500 focus:shadow-[0_0_0_3px_rgba(239,68,68,0.1)] animate-shake'
                          : 'border-gray-300 dark:border-gray-700 focus:border-primary-400 dark:focus:border-primary-500 focus:shadow-[0_0_0_3px_rgba(14,165,233,0.1)] dark:focus:shadow-[0_0_0_3px_rgba(56,189,248,0.1)]'
                      }`}
                    />
                    {errors.postalCode && (
                      <p className="text-red-500 text-sm mt-2 animate-fade-in font-medium">{errors.postalCode}</p>
                    )}
                  </div>
                </div>
              </div>

              {/* Shipping Method */}
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 border border-gray-100 dark:border-gray-700 animate-fade-in">
                <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-6 flex items-center gap-2">
                  <Truck className="w-5 h-5" />
                  Shipping Method
                </h2>
                <div className="space-y-3">
                  <label className="flex items-center p-5 border-2 border-gray-200 dark:border-gray-700 rounded-xl cursor-pointer hover:border-primary-500 dark:hover:border-primary-500 transition-all duration-200 hover:shadow-md active:scale-98">
                    <input
                      type="radio"
                      name="shippingMethod"
                      value="standard"
                      checked={formData.shippingMethod === 'standard'}
                      onChange={handleChange}
                      className="mr-3"
                    />
                    <div className="flex-1">
                      <div className="font-semibold text-gray-900 dark:text-gray-100">
                        Standard Shipping
                      </div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">
                        Free - 3-5 business days
                      </div>
                    </div>
                  </label>
                  <label className="flex items-center p-5 border-2 border-gray-200 dark:border-gray-700 rounded-xl cursor-pointer hover:border-primary-500 dark:hover:border-primary-500 transition-all duration-200 hover:shadow-md active:scale-98">
                    <input
                      type="radio"
                      name="shippingMethod"
                      value="express"
                      checked={formData.shippingMethod === 'express'}
                      onChange={handleChange}
                      className="mr-3"
                    />
                    <div className="flex-1">
                      <div className="font-semibold text-gray-900 dark:text-gray-100">
                        Express Shipping
                      </div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">
                        $15 - 1-2 business days
                      </div>
                    </div>
                  </label>
                </div>
              </div>

              {/* Payment Method */}
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 border border-gray-100 dark:border-gray-700 animate-fade-in">
                <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-6 flex items-center gap-2">
                  <CreditCard className="w-5 h-5" />
                  Payment Method
                </h2>
                <div className="space-y-3">
                  <label className="flex items-center p-5 border-2 border-gray-200 dark:border-gray-700 rounded-xl cursor-pointer hover:border-primary-500 dark:hover:border-primary-500 transition-all duration-200 hover:shadow-md active:scale-98">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="credit"
                      checked={formData.paymentMethod === 'credit'}
                      onChange={handleChange}
                      className="mr-3"
                    />
                    <span className="font-semibold text-gray-900 dark:text-gray-100">
                      Credit Card
                    </span>
                  </label>
                  <label className="flex items-center p-5 border-2 border-gray-200 dark:border-gray-700 rounded-xl cursor-pointer hover:border-primary-500 dark:hover:border-primary-500 transition-all duration-200 hover:shadow-md active:scale-98">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="debit"
                      checked={formData.paymentMethod === 'debit'}
                      onChange={handleChange}
                      className="mr-3"
                    />
                    <span className="font-semibold text-gray-900 dark:text-gray-100">
                      Debit Card
                    </span>
                  </label>
                  <label className="flex items-center p-5 border-2 border-gray-200 dark:border-gray-700 rounded-xl cursor-pointer hover:border-primary-500 dark:hover:border-primary-500 transition-all duration-200 hover:shadow-md active:scale-98">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="cod"
                      checked={formData.paymentMethod === 'cod'}
                      onChange={handleChange}
                      className="mr-3"
                    />
                    <span className="font-semibold text-gray-900 dark:text-gray-100">
                      Cash on Delivery
                    </span>
                  </label>
                </div>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-4">
                  * This is a template only. No real payment processing.
                </p>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-primary-600 hover:bg-primary-700 text-white font-semibold py-5 px-8 rounded-xl transition-all duration-300 hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl ripple disabled:hover:scale-100"
              >
                {isSubmitting ? 'Processing...' : 'Place Order'}
              </button>
            </form>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 sticky top-24 border border-gray-100 dark:border-gray-700 animate-fade-in">
              <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-6">
                Order Summary
              </h2>

              <div className="space-y-4 mb-6">
                {cart.map((item) => (
                  <div key={item.product.id} className="flex gap-3">
                    <img
                      src={item.product.images[0]}
                      alt={item.product.name}
                      className="w-16 h-16 rounded-lg object-cover"
                    />
                    <div className="flex-1">
                      <p className="text-sm font-semibold text-gray-900 dark:text-gray-100 line-clamp-2">
                        {item.product.name}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        Qty: {item.quantity} x ${item.product.price.toLocaleString()}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="border-t border-gray-200 dark:border-gray-700 pt-4 space-y-2">
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
                  <span className="font-semibold">
                    {formData.shippingMethod === 'express' ? '$15' : 'Free'}
                  </span>
                </div>
                <div className="border-t border-gray-200 dark:border-gray-700 pt-4 flex justify-between text-lg font-bold text-gray-900 dark:text-gray-100">
                  <span>Total:</span>
                  <span className="text-primary-600 dark:text-primary-400">
                    $
                    {(
                      getTotalPrice() + (formData.shippingMethod === 'express' ? 15 : 0)
                    ).toLocaleString()}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
