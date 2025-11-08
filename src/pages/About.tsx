import React from 'react';
import { Users, Award, Target, Heart } from 'lucide-react';

const About: React.FC = () => {
  const values = [
    {
      icon: <Target className="w-8 h-8" />,
      title: 'Mission',
      description: 'Committed to delivering high-quality IT and electronics products to our customers',
    },
    {
      icon: <Award className="w-8 h-8" />,
      title: 'Quality',
      description: 'Curated products from leading brands with high quality and standards',
    },
    {
      icon: <Heart className="w-8 h-8" />,
      title: 'Service',
      description: 'Customer service with care, supported by a professional team ready to help',
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: 'Trust',
      description: 'Building customer trust through transparent and reliable service',
    },
  ];

  const team = [
    {
      name: 'John Smith',
      role: 'CEO & Founder',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400',
    },
    {
      name: 'Sarah Johnson',
      role: 'CTO',
      image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400',
    },
    {
      name: 'Michael Chen',
      role: 'Head of Sales',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400',
    },
    {
      name: 'Emily Davis',
      role: 'Customer Success',
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400',
    },
  ];

  return (
    <div className="min-h-screen py-16">
      <div className="container mx-auto px-4">
        {/* Hero Section */}
        <div className="text-center mb-16 animate-fade-in">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-gray-100 mb-6">
            About TechStore
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            We are a leading online store for IT and electronics products,
            committed to delivering high-quality products and the best service to our customers.
          </p>
        </div>

        {/* Story Section */}
        <div className="mb-16 animate-fade-in">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-6">
                Our Story
              </h2>
              <div className="space-y-4 text-gray-700 dark:text-gray-300">
                <p>
                  TechStore was founded in 2020 with a vision to become a leading online store
                  for IT and electronics products.
                </p>
                <p>
                  We started as a small store and have grown continuously,
                  focusing on product quality and customer service.
                </p>
                <p>
                  Today, TechStore is trusted by thousands of customers,
                  and we continue to strive for excellence in delivering the best service.
                </p>
              </div>
            </div>
            <div className="rounded-2xl overflow-hidden shadow-xl">
              <img
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800"
                alt="Our Story"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>

        {/* Values Section */}
        <div className="mb-16 animate-fade-in">
          <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-gray-100 mb-12">
            Our Values
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <div
                key={index}
                className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 text-center hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700 hover:border-primary-200 dark:hover:border-primary-800"
              >
                <div className="text-primary-600 dark:text-primary-400 mb-4 flex justify-center">
                  {value.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-3">
                  {value.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400">{value.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Team Section */}
        <div className="mb-16 animate-fade-in">
          <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-gray-100 mb-12">
            Our Team
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <div
                key={index}
                className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700"
              >
                <div className="aspect-square overflow-hidden">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                  />
                </div>
                <div className="p-6 text-center">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-2">
                    {member.name}
                  </h3>
                  <p className="text-primary-600 dark:text-primary-400 font-semibold">
                    {member.role}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Stats Section */}
        <div className="bg-gradient-to-r from-primary-600 to-primary-700 dark:from-primary-800 dark:to-primary-900 rounded-2xl p-12 text-center text-white animate-fade-in">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <div className="text-4xl md:text-5xl font-bold mb-2">10,000+</div>
              <div className="text-primary-100">Trusted Customers</div>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-bold mb-2">5,000+</div>
              <div className="text-primary-100">Quality Products</div>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-bold mb-2">99%</div>
              <div className="text-primary-100">Satisfaction Rate</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
