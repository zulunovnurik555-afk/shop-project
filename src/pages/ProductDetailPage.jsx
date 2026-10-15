import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { Star, ShoppingCart, ArrowLeft } from 'lucide-react';

export default function ProductDetailPage({ addToCart }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProduct();
  }, [id]);

  const fetchProduct = async () => {
    try {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('id', id)
        .single();

      if (error) throw error;
      if (data) setProduct(data);
    } catch (error) {
      console.error('Ошибка:', error.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="container mx-auto px-4 py-16 text-center text-gray-500">Загрузка...</div>;
  }

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-16 text-center space-y-4">
        <h2 className="text-2xl font-bold text-gray-800">Товар не найден</h2>
        <Link to="/catalog" className="inline-block bg-indigo-600 text-white px-6 py-2.5 rounded-xl font-medium">
          Вернуться в каталог
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-5xl">
      <button
        onClick={() => navigate(-1)}
        className="flex items-center space-x-2 text-gray-600 hover:text-indigo-600 mb-6 transition font-medium"
      >
        <ArrowLeft className="w-5 h-5" />
        <span>Назад</span>
      </button>

      <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden grid grid-cols-1 md:grid-cols-2 gap-8 p-6 md:p-8">
        <div className="h-80 md:h-[400px] rounded-2xl overflow-hidden bg-gray-100">
          <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
        </div>

        <div className="flex flex-col justify-between">
          <div className="space-y-4">
            <span className="bg-indigo-50 text-indigo-600 text-xs font-semibold px-3 py-1.5 rounded-lg">
              {product.category}
            </span>
            <h1 className="text-3xl font-extrabold text-gray-900">{product.name}</h1>
            
            <div className="flex items-center space-x-2 text-amber-400">
              <Star className="w-5 h-5 fill-current" />
              <span className="font-bold text-gray-800 text-lg">{product.rating}</span>
            </div>

            <p className="text-gray-600 leading-relaxed">{product.description}</p>
          </div>

          <div className="pt-6 border-t border-gray-100 mt-6 flex items-center justify-between">
            <span className="text-3xl font-extrabold text-indigo-600">{product.price} сом</span>
            <button
              onClick={() => addToCart(product)}
              className="bg-indigo-600 text-white px-6 py-3.5 rounded-2xl hover:bg-indigo-700 transition flex items-center space-x-2 shadow-lg font-medium"
            >
              <ShoppingCart className="w-5 h-5" />
              <span>В корзину</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}