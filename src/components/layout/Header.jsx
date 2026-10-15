import { Link } from 'react-router-dom';
import { ShoppingCart, Shield, MapPin, User, Package } from 'lucide-react';

export default function Header({ cartCount }) {
  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-100 shadow-sm">
      <div className="container mx-auto px-4 h-20 flex items-center justify-between">
        
        <div className="flex items-center space-x-6">
          <Link to="/" className="flex items-center space-x-2.5">
            <div className="bg-indigo-900 text-white p-2.5 rounded-2xl flex items-center justify-center shadow">
              <Shield className="w-5 h-5" />
            </div>
            <span className="text-2xl font-black tracking-tight text-gray-900">
              Asia<span className="text-indigo-600">Tech</span>
            </span>
          </Link>

          <div className="hidden lg:flex items-center space-x-2 bg-gray-100/80 px-3.5 py-2 rounded-xl text-xs font-semibold text-gray-700">
            <MapPin className="w-4 h-4 text-indigo-600" />
            <span>Bishkek, Kyrgyzstan</span>
          </div>
        </div>

        <nav className="hidden md:flex items-center space-x-8">
          <Link to="/" className="text-gray-700 hover:text-indigo-600 font-semibold transition text-sm">
            Home
          </Link>
          <Link to="/catalog" className="text-gray-600 hover:text-indigo-600 font-medium transition text-sm">
            Catalog
          </Link>
          <Link to="/brands" className="text-gray-600 hover:text-indigo-600 font-medium transition text-sm">
            Brands
          </Link>
          <Link to="/deals" className="text-gray-600 hover:text-indigo-600 font-medium transition text-sm">
            Deals
          </Link>
          <Link to="/about" className="text-gray-600 hover:text-indigo-600 font-medium transition text-sm">
            About Us
          </Link>
          <Link to="/admin" className="text-indigo-600 hover:text-indigo-700 font-bold transition text-sm flex items-center space-x-1 bg-indigo-50 px-3 py-1.5 rounded-xl">
            <Package className="w-4 h-4" />
            <span>Admin</span>
          </Link>
        </nav>

        <div className="flex items-center space-x-3">
          <Link
            to="/cart"
            className="relative bg-gray-900 text-white hover:bg-indigo-600 px-4 py-2.5 rounded-2xl transition flex items-center space-x-2 shadow-sm font-medium text-sm"
          >
            <ShoppingCart className="w-4 h-4" />
            <span className="hidden sm:inline">Shopping Cart</span>
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center shadow">
                {cartCount}
              </span>
            )}
          </Link>

          <button className="hidden sm:flex items-center space-x-1.5 text-gray-700 hover:text-indigo-600 font-medium text-sm px-3 py-2">
            <User className="w-4 h-4" />
            <span>Account</span>
          </button>
        </div>

      </div>
    </header>
  );
}