import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { ArrowRight, ShieldCheck, Truck, Headphones, Star, ShoppingCart } from 'lucide-react';

export default function HomePage({ addToCart }) {
  const [featuredProducts, setFeaturedProducts] = useState([]);

  useEffect(() => {
    fetchFeaturedProducts();
  }, []);

  const fetchFeaturedProducts = async () => {
    const { data } = await supabase.from('products').select('*').limit(4);
    if (data) setFeaturedProducts(data);
  };

  return (
    <div className="space-y-12 pb-12">
      <section className="bg-gradient-to-r from-indigo-900 via-indigo-800 to-indigo-600 text-white py-20 px-4">
        <div className="container mx-auto max-w-6xl flex flex-col items-start space-y-6">
          <span className="bg-indigo-500/30 text-indigo-200 text-sm font-semibold px-4 py-1.5 rounded-full border border-indigo-400/30">
            Новая коллекция 2026 🔥
          </span>
          <h1 className="text-4xl md:text-6xl font-extrabold max-w-2xl leading-tight">
            Современные гаджеты и аксессуары для жизни
          </h1>
          <p className="text-indigo-100 text-lg max-w-xl">
            Откройте для себя широкий ассортимент качественной электроники и стильных аксессуаров по лучшим ценам.
          </p>
          <div className="flex flex-wrap gap-4 pt-2">
            <Link
              to="/catalog"
              className="bg-white text-indigo-900 font-bold px-8 py-3.5 rounded-2xl hover:bg-indigo-50 transition shadow-lg flex items-center space-x-2"
            >
              <span>В каталог</span>
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      <section className="container mx-auto px-4 max-w-6xl">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center space-x-4">
            <div className="bg-indigo-50 p-3.5 rounded-xl text-indigo-600">
              <Truck className="w-7 h-7" />
            </div>
            <div>
              <h3 className="font-bold text-gray-800 text-lg">Быстрая доставка</h3>
              <p className="text-gray-500 text-sm">Доставим ваш заказ в кратчайшие сроки</p>
            </div>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center space-x-4">
            <div className="bg-indigo-50 p-3.5 rounded-xl text-indigo-600">
              <ShieldCheck className="w-7 h-7" />
            </div>
            <div>
              <h3 className="font-bold text-gray-800 text-lg">Гарантия качества</h3>
              <p className="text-gray-500 text-sm">Только проверенные и надежные товары</p>
            </div>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center space-x-4">
            <div className="bg-indigo-50 p-3.5 rounded-xl text-indigo-600">
              <Headphones className="w-7 h-7" />
            </div>
            <div>
              <h3 className="font-bold text-gray-800 text-lg">Поддержка 24/7</h3>
              <p className="text-gray-500 text-sm">Всегда на связи, чтобы помочь вам</p>
            </div>
          </div>
        </div>
      </section>

      <section className="container mx-auto px-4 max-w-6xl">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Популярные товары</h2>
          <Link to="/catalog" className="text-indigo-600 font-semibold hover:underline flex items-center space-x-1">
            <span>Все товары</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {featuredProducts.length === 0 ? (
          <div className="text-center py-12 text-gray-400">Загрузка товаров...</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {featuredProducts.map((product) => (
              <div key={product.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden flex flex-col hover:shadow-md transition">
                <Link to={`/product/${product.id}`} className="h-48 overflow-hidden bg-gray-100 relative block">
                  <img src={product.image} alt={product.name} className="w-full h-full object-cover hover:scale-105 transition duration-300" />
                  <span className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm text-xs font-semibold px-2.5 py-1 rounded-lg text-gray-700 shadow-sm">
                    {product.category}
                  </span>
                </Link>
                <div className="p-4 flex flex-col flex-grow">
                  <div className="flex items-center space-x-1 text-amber-400 text-sm mb-2">
                    <Star className="w-4 h-4 fill-current" />
                    <span className="font-medium text-gray-700">{product.rating}</span>
                  </div>
                  <Link to={`/product/${product.id}`}>
                    <h3 className="font-semibold text-gray-800 text-lg mb-2 hover:text-indigo-600 transition">{product.name}</h3>
                  </Link>
                  <div className="mt-auto flex items-center justify-between pt-4">
                    <span className="text-xl font-bold text-indigo-600">{product.price} сом</span>
                    <button
                      onClick={() => addToCart(product)}
                      className="bg-indigo-600 text-white p-2.5 rounded-xl hover:bg-indigo-700 transition shadow"
                      title="В корзину"
                    >
                      <ShoppingCart className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}