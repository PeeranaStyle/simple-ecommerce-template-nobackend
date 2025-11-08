import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, Clock } from 'lucide-react';

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsSubmitting(false);
    setIsSubmitted(true);
    setFormData({ name: '', email: '', subject: '', message: '' });
    setTimeout(() => setIsSubmitted(false), 5000);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <div className="min-h-screen py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 animate-fade-in">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-gray-100 mb-6">
            Contact Us
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            We're here to help with any questions. Contact us through the channels below.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 mb-16">
          {/* Contact Info Cards */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 text-center hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700 animate-fade-in">
            <div className="bg-primary-100 dark:bg-primary-900 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <MapPin className="w-8 h-8 text-primary-600 dark:text-primary-400" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-2">
              Address
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              123 Main Street
              <br />
              Suite 100
              <br />
              New York, NY 10001
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 text-center hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700 animate-fade-in">
            <div className="bg-primary-100 dark:bg-primary-900 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Phone className="w-8 h-8 text-primary-600 dark:text-primary-400" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-2">
              Phone
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              +1 (555) 123-4567
              <br />
              +1 (555) 234-5678
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 text-center hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700 animate-fade-in">
            <div className="bg-primary-100 dark:bg-primary-900 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Mail className="w-8 h-8 text-primary-600 dark:text-primary-400" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-2">
              Email
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              info@techstore.com
              <br />
              support@techstore.com
            </p>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 border border-gray-100 dark:border-gray-700 animate-fade-in">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6">
              Send us a Message
            </h2>

            {isSubmitted && (
              <div className="mb-6 p-4 bg-green-100 dark:bg-green-900/30 border border-green-500 dark:border-green-700 rounded-xl text-green-700 dark:text-green-400 animate-fade-in">
                Thank you! We've received your message and will get back to you as soon as possible.
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-5 py-3 border-2 border-gray-300 dark:border-gray-700 rounded-xl bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 focus:outline-none focus:border-primary-400 dark:focus:border-primary-500 focus:ring-0 focus:shadow-[0_0_0_3px_rgba(14,165,233,0.1)] dark:focus:shadow-[0_0_0_3px_rgba(56,189,248,0.1)] transition-all duration-200"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  Email <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-5 py-3 border-2 border-gray-300 dark:border-gray-700 rounded-xl bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 focus:outline-none focus:border-primary-400 dark:focus:border-primary-500 focus:ring-0 focus:shadow-[0_0_0_3px_rgba(14,165,233,0.1)] dark:focus:shadow-[0_0_0_3px_rgba(56,189,248,0.1)] transition-all duration-200"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  Subject <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="w-full px-5 py-3 border-2 border-gray-300 dark:border-gray-700 rounded-xl bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 focus:outline-none focus:border-primary-400 dark:focus:border-primary-500 focus:ring-0 focus:shadow-[0_0_0_3px_rgba(14,165,233,0.1)] dark:focus:shadow-[0_0_0_3px_rgba(56,189,248,0.1)] transition-all duration-200"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  Message <span className="text-red-500">*</span>
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={6}
                  className="w-full px-5 py-3 border-2 border-gray-300 dark:border-gray-700 rounded-xl bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 focus:outline-none focus:border-primary-400 dark:focus:border-primary-500 focus:ring-0 focus:shadow-[0_0_0_3px_rgba(14,165,233,0.1)] dark:focus:shadow-[0_0_0_3px_rgba(56,189,248,0.1)] transition-all duration-200"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-primary-600 hover:bg-primary-700 text-white font-semibold py-4 px-6 rounded-xl transition-all duration-300 hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl ripple disabled:hover:scale-100 flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  'Sending...'
                ) : (
                  <>
                    <Send className="w-5 h-5" />
                    <span>Send Message</span>
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Business Hours & Map */}
          <div className="space-y-8">
            {/* Business Hours */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 border border-gray-100 dark:border-gray-700 animate-fade-in">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6 flex items-center gap-2">
                <Clock className="w-6 h-6" />
                Business Hours
              </h2>
              <div className="space-y-4">
                <div className="flex justify-between border-b-2 border-gray-200 dark:border-gray-700 pb-3">
                  <span className="font-semibold text-gray-900 dark:text-gray-100">
                    Monday - Friday
                  </span>
                  <span className="text-gray-600 dark:text-gray-400">09:00 - 18:00</span>
                </div>
                <div className="flex justify-between border-b-2 border-gray-200 dark:border-gray-700 pb-3">
                  <span className="font-semibold text-gray-900 dark:text-gray-100">
                    Saturday
                  </span>
                  <span className="text-gray-600 dark:text-gray-400">09:00 - 16:00</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-semibold text-gray-900 dark:text-gray-100">
                    Sunday
                  </span>
                  <span className="text-gray-600 dark:text-gray-400">Closed</span>
                </div>
              </div>
            </div>

            {/* Map Placeholder */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden border border-gray-100 dark:border-gray-700 animate-fade-in">
              <div className="aspect-video bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                <div className="text-center text-gray-500 dark:text-gray-400">
                  <MapPin className="w-12 h-12 mx-auto mb-2" />
                  <p className="text-sm font-medium">Google Maps</p>
                  <p className="text-xs mt-1 text-gray-400 dark:text-gray-500">
                    (You can add Google Maps Embed here)
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
