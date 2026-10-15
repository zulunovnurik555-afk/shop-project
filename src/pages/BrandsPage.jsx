import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { ShieldCheck, Sparkles, ShoppingCart, Star, X } from 'lucide-react';

export default function BrandsPage({ addToCart }) {
  const [brands, setBrands] = useState([]);
  const [selectedBrand, setSelectedBrand] = useState(null);
  const [brandProducts, setBrandProducts] = useState([]);
  const [loadingBrands, setLoadingBrands] = useState(true);
  const [loadingProducts, setLoadingProducts] = useState(false);

  useEffect(() => {
    fetchBrands();
  }, []);

  const fetchBrands = async () => {
    const { data } = await supabase.from('brands').select('*');
    if (data) setBrands(data);
    setLoadingBrands(false);
  };

  // При клике на бренд загружаем товары этого бренда
  const handleSelectBrand = async (brandName) => {
    setSelectedBrand(brandName);
    setLoadingProducts(true);

    // Ищем товары, у которых категория или название связано с брендом
    const { data } = await supabase
      .from('products')
      .select('*')
      .ilike('name', `%${brandName}%`); // Ищет бренд в названии товара

    if (data) setBrandProducts(data);
    setLoadingProducts(false);
  };

  return (
    <div className="space-y-12 pb-16 bg-gray-50/50">
      
      {/* Шапка страницы */}
      <section className="bg-gradient-to-r from-gray-900 via-indigo-950 to-indigo-900 text-white py-16 px-4">
        <div className="container mx-auto max-w-4xl text-center space-y-4">
          <span className="bg-indigo-500/30 text-indigo-200 text-xs font-bold px-4 py-1.5 rounded-full border border-indigo-400/30 uppercase tracking-widest inline-flex items-center space-x-1.5">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Official Partners</span>
          </span>
          <h1 className="text-4xl md:text-5xl font-black tracking-tight">
            Официальные бренды
          </h1>
          <p className="text-indigo-100 max-w-xl mx-auto text-base">
            Выберите бренд, чтобы просмотреть его продукцию прямо здесь.
          </p>
        </div>
      </section>

      {/* Список брендов */}
      <section className="container mx-auto px-4 max-w-5xl">
        {loadingBrands ? (
          <div className="text-center py-12 text-gray-400 font-medium">Загрузка брендов...</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {brands.map((brand) => (
              <div 
                key={brand.id} 
                onClick={() => handleSelectBrand(brand.name)}
                className={`bg-white rounded-3xl p-6 border transition-all duration-300 flex flex-col items-center text-center cursor-pointer group shadow-sm hover:shadow-xl ${
                  selectedBrand === brand.name ? 'border-indigo-600 ring-2 ring-indigo-600/20 shadow-lg' : 'border-gray-100'
                }`}
              >
                <span className="text-4xl mb-3">{brand.logo}</span>
                <h3 className="font-extrabold text-gray-900 text-lg mb-1 group-hover:text-indigo-600 transition">
                  {brand.name}
                </h3>
                <p className="text-gray-500 text-xs line-clamp-2">{brand.description}</p>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Блок с товарами выбранного бренда */}
      {selectedBrand && (
        <section className="container mx-auto px-4 max-w-5xl pt-6 border-t border-gray-200">
          <div className="flex items-center justify-between mb-8">
            <div>
              <span className="text-indigo-600 text-xs font-bold uppercase tracking-wider">Товары бренда</span>
              <h2 className="text-3xl font-black text-gray-900">{selectedBrand}</h2>
            </div>
            <button 
              onClick={() => setSelectedBrand(null)}
              className="bg-gray-100 hover:bg-gray-200 text-gray-700 p-2.5 rounded-2xl transition flex items-center space-x-1.5 text-xs font-bold"
            >
              <X className="w-4 h-4" />
              <span>Закрыть</span>
            </button>
          </div>

          {loadingProducts ? (
            <div className="text-center py-12 text-gray-400">Загрузка товаров {selectedBrand}...</div>
          ) : brandProducts.length === 0 ? (
            <div className="bg-white rounded-3xl p-12 text-center text-gray-400 border border-gray-100 shadow-sm">
              У бренда <span className="font-bold text-gray-700">{selectedBrand}</span> пока нет добавленных товаров в базе.
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
              {brandProducts.map((product) => (
                <div key={product.id} className="bg-white rounded-3xl p-4 border border-gray-100 shadow-sm hover:shadow-xl transition duration-300 flex flex-col group">
                  <Link to={`/product/${product.id}`} className="h-48 rounded-2xl overflow-hidden bg-gray-50 relative block mb-4">
                    <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition duration-500" />
                    <span className="absolute top-3 left-3 bg-white/90 backdrop-blur-md text-xs font-bold px-3 py-1 rounded-xl text-gray-800 shadow-sm">
                      {product.category}
                    </span>
                  </Link>
                  <div className="flex flex-col flex-grow">
                    <div className="flex items-center space-x-1 text-amber-400 text-xs mb-1.5 font-semibold">
                      <Star className="w-3.5 h-3.5 fill-current" />
                      <span className="text-gray-700">{product.rating || '5.0'}</span>
                    </div>
                    <Link to={`/product/${product.id}`}>
                      <h3 className="font-bold text-gray-900 text-base mb-2 hover:text-indigo-600 transition line-clamp-1">{product.name}</h3>
                    </Link>
                    <div className="mt-auto flex items-center justify-between pt-4 border-t border-gray-50">
                      <div>
                        <span className="text-xs text-gray-400 block">Price</span>
                        <span className="text-lg font-black text-gray-900">{product.price} сом</span>
                      </div>
                      <button
                        onClick={() => addToCart && addToCart(product)}
                        className="bg-indigo-600 text-white p-3 rounded-2xl hover:bg-indigo-700 transition shadow-md shadow-indigo-200 active:scale-95"
                        title="Add to Cart"
                      >
                        <ShoppingCart className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      )}

    </div>
  );
}