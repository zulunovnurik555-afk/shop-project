import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Shield, MapPin, User, Package, Menu, X } from 'lucide-react';

export default function Header({ cartCount }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-100 shadow-sm">
      <div className="container mx-auto px-4 h-16 md:h-20 flex items-center justify-between">
        
        <div className="flex items-center space-x-3 md:space-x-6">
          <Link to="/" className="flex items-center space-x-2">
            <div className="bg-indigo-900 text-white p-2 md:p-2.5 rounded-xl md:rounded-2xl flex items-center justify-center shadow">
              <Shield className="w-4 h-4 md:w-5 md:h-5" />
            </div>
            <span className="text-xl md:text-2xl font-black tracking-tight text-gray-900">
              Asia<span className="text-indigo-600">Tech</span>
            </span>
          </Link>

          <div className="hidden lg:flex items-center space-x-2 bg-gray-100/80 px-3.5 py-2 rounded-xl text-xs font-semibold text-gray-700">
            <MapPin className="w-4 h-4 text-indigo-600" />
            <span>Bishkek, Kyrgyzstan</span>
          </div>
        </div>

        <nav className="hidden md:flex items-center space-x-6 lg:space-x-8">
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

        <div className="flex items-center space-x-2 md:space-x-3">
  {/* Корзина */}
  <Link
    to="/cart"
    className="relative bg-gray-900 text-white hover:bg-indigo-600 px-3 py-2 md:px-4 md:py-2.5 rounded-xl md:rounded-2xl transition flex items-center space-x-2 shadow-sm font-medium text-xs md:text-sm"
  >
    <ShoppingCart className="w-4 h-4" />
    <span className="hidden sm:inline">Shopping Cart</span>
    {cartCount > 0 && (
      <span className="absolute -top-1.5 -right-1.5 bg-red-500 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center shadow">
        {cartCount}
      </span>
    )}
  </Link>

  {/* Кнопка аккаунта (только для ПК) */}
  <button className="hidden sm:flex items-center space-x-1.5 text-gray-700 hover:text-indigo-600 font-medium text-sm px-3 py-2">
    <User className="w-4 h-4" />
    <span>Account</span>
  </button>

  {/* Бургер-кнопка (видны строго на мобилках) */}
  <button
    onClick={toggleMenu}
    type="button"
    className="flex md:hidden items-center justify-center p-2 rounded-xl text-gray-900 hover:bg-gray-100 transition"
    aria-label="Open Menu"
  >
    {isMenuOpen ? (
      <X className="w-6 h-6 text-gray-900" />
    ) : (
      <Menu className="w-6 h-6 text-gray-900" />
    )}
  </button>
</div>

      </div>

      {isMenuOpen && (
        <div className="md:hidden bg-white border-b border-gray-200 px-4 pt-2 pb-6 space-y-3 shadow-lg animate-in slide-in-from-top duration-200">
          <div className="flex items-center space-x-2 bg-gray-100 px-3 py-2 rounded-xl text-xs font-semibold text-gray-700 w-fit mb-3">
            <MapPin className="w-3.5 h-3.5 text-indigo-600" />
            <span>Bishkek, Kyrgyzstan</span>
          </div>

          <nav className="flex flex-col space-y-2 font-medium text-sm">
            <Link
              to="/"
              onClick={() => setIsMenuOpen(false)}
              className="px-3 py-2 rounded-lg text-gray-800 hover:bg-indigo-50 hover:text-indigo-600 transition"
            >
              Home
            </Link>
            <Link
              to="/catalog"
              onClick={() => setIsMenuOpen(false)}
              className="px-3 py-2 rounded-lg text-gray-800 hover:bg-indigo-50 hover:text-indigo-600 transition"
            >
              Catalog
            </Link>
            <Link
              to="/brands"
              onClick={() => setIsMenuOpen(false)}
              className="px-3 py-2 rounded-lg text-gray-800 hover:bg-indigo-50 hover:text-indigo-600 transition"
            >
              Brands
            </Link>
            <Link
              to="/deals"
              onClick={() => setIsMenuOpen(false)}
              className="px-3 py-2 rounded-lg text-gray-800 hover:bg-indigo-50 hover:text-indigo-600 transition"
            >
              Deals
            </Link>
            <Link
              to="/about"
              onClick={() => setIsMenuOpen(false)}
              className="px-3 py-2 rounded-lg text-gray-800 hover:bg-indigo-50 hover:text-indigo-600 transition"
            >
              About Us
            </Link>
            <Link
              to="/admin"
              onClick={() => setIsMenuOpen(false)}
              className="flex items-center space-x-2 px-3 py-2 rounded-lg text-indigo-600 font-bold bg-indigo-50"
            >
              <Package className="w-4 h-4" />
              <span>Admin Panel</span>
            </Link>
          </nav>

          <div className="pt-2 border-t border-gray-100">
            <button className="w-full flex items-center justify-center space-x-2 text-gray-700 bg-gray-100 hover:bg-gray-200 font-semibold text-sm py-2.5 rounded-xl transition">
              <User className="w-4 h-4" />
              <span>Account</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
}