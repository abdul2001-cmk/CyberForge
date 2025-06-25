import React from 'react';
import { ArrowRight, Star, Truck, Shield, Headphones } from 'lucide-react';

export default function Hero() {
  return (
    <section className="relative bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 text-white overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Hero Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <Star className="w-5 h-5 text-yellow-400 fill-current" />
                <span className="text-sm font-medium">Rated #1 Online Store</span>
              </div>
              <h1 className="text-4xl lg:text-6xl font-bold leading-tight">
                Premium Products,
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-400">
                  Exceptional Quality
                </span>
              </h1>
              <p className="text-xl text-blue-100 max-w-lg">
                Discover our curated collection of premium products designed to enhance your lifestyle. 
                Quality guaranteed, satisfaction promised.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <button className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors flex items-center justify-center space-x-2 group">
                <span>Shop Now</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
              <button className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors">
                View Collections
              </button>
            </div>

            {/* Trust Indicators */}
            <div className="grid grid-cols-3 gap-6 pt-8 border-t border-blue-400/30">
              <div className="text-center">
                <Truck className="w-8 h-8 mx-auto mb-2 text-blue-200" />
                <p className="text-sm text-blue-100">Free Shipping</p>
                <p className="text-xs text-blue-200">On orders over $50</p>
              </div>
              <div className="text-center">
                <Shield className="w-8 h-8 mx-auto mb-2 text-blue-200" />
                <p className="text-sm text-blue-100">Secure Payment</p>
                <p className="text-xs text-blue-200">100% Protected</p>
              </div>
              <div className="text-center">
                <Headphones className="w-8 h-8 mx-auto mb-2 text-blue-200" />
                <p className="text-sm text-blue-100">24/7 Support</p>
                <p className="text-xs text-blue-200">Always here to help</p>
              </div>
            </div>
          </div>

          {/* Hero Image */}
          <div className="relative">
            <div className="relative z-10">
              <img
                src="https://images.pexels.com/photos/5632402/pexels-photo-5632402.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt="Premium Shopping Experience"
                className="rounded-2xl shadow-2xl"
              />
            </div>
            {/* Floating Elements */}
            <div className="absolute -top-4 -right-4 bg-yellow-400 text-gray-900 px-4 py-2 rounded-full font-bold text-sm shadow-lg">
              50% OFF
            </div>
            <div className="absolute -bottom-4 -left-4 bg-white text-gray-900 px-4 py-2 rounded-full font-bold text-sm shadow-lg">
              Free Delivery
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-white/10 backdrop-blur-sm border-t border-white/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold">10K+</div>
              <div className="text-blue-200 text-sm">Happy Customers</div>
            </div>
            <div>
              <div className="text-3xl font-bold">500+</div>
              <div className="text-blue-200 text-sm">Premium Products</div>
            </div>
            <div>
              <div className="text-3xl font-bold">99%</div>
              <div className="text-blue-200 text-sm">Satisfaction Rate</div>
            </div>
            <div>
              <div className="text-3xl font-bold">24/7</div>
              <div className="text-blue-200 text-sm">Customer Support</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}