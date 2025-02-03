import React from 'react';
import { Home, ShoppingBag, User, Info, Search } from 'lucide-react';

interface NavbarProps {
  cartItemsCount: number;
  onCartClick: () => void;
  onSearch: (query: string) => void;
}

export function Navbar({ cartItemsCount, onCartClick, onSearch }: NavbarProps) {
  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-8">
            <h1 className="text-2xl font-bold text-gray-900">ShopEase</h1>
            <div className="hidden md:flex items-center gap-6">
              <a href="#" className="flex items-center gap-2 text-gray-600 hover:text-gray-900">
                <Home size={20} />
                <span>Home</span>
              </a>
              <a href="#about" className="flex items-center gap-2 text-gray-600 hover:text-gray-900">
                <Info size={20} />
                <span>About</span>
              </a>
            </div>
          </div>

          <div className="flex-1 max-w-lg px-8">
            <div className="relative">
              <input
                type="text"
                placeholder="Search products..."
                className="w-full px-4 py-2 pl-10 pr-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                onChange={(e) => onSearch(e.target.value)}
              />
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            </div>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={onCartClick}
              className="relative p-2 text-gray-600 hover:text-gray-900"
            >
              <ShoppingBag size={24} />
              {cartItemsCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-blue-600 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                  {cartItemsCount}
                </span>
              )}
            </button>
            <button className="p-2 text-gray-600 hover:text-gray-900">
              <User size={24} />
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}