import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Star, ShoppingCart, Search } from 'lucide-react';
import { supabase } from '../lib/supabase';

const CATEGORIES = ['Все', 'Электроника', 'Аксессуары'];

export default function CatalogPage({ addToCart }) {
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Все');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const { data, error } = await supabase.from('products').select('*');
      if (error) throw error;
      if (data) setProducts(data);
    } catch (error) {
      console.error('Ошибка загрузки товаров:', error.message);
    } finally {
      setLoading(false);
    }
  };

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'Все' || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Каталог товаров</h1>

      <div className="flex flex-col md:flex-row gap-4 mb-8 justify-between items-center">
        <div className="relative w-full md:w-96">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Поиск товаров..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-xl focus:outline-none focus:border-indigo-600 transition shadow-sm"
          />
        </div>

        <div className="flex flex-wrap gap-2 w-full md:w-auto">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-xl font-medium transition shadow-sm ${
                selectedCategory === cat
                  ? 'bg-indigo-600 text-white'
                  : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {loading ? (
        <div className="text-center py-16 text-gray-500 text-lg">Загрузка товаров из базы данных...</div>
      ) : filteredProducts.length === 0 ? (
        <div className="text-center py-16 text-gray-500 text-lg">
          По вашему запросу ничего не найдено 😔
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
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
                    className="bg-indigo-600 text-white p-2.5 rounded-xl hover:bg-indigo-700 transition flex items-center justify-center shadow"
                    title="Добавить в корзину"
                  >
                    <ShoppingCart className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}