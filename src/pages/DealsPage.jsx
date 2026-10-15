import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { Tag, Sparkles, ArrowRight } from 'lucide-react';

export default function DealsPage() {
  const [deals, setDeals] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDeals();
  }, []);

  const fetchDeals = async () => {
    const { data } = await supabase.from('deals').select('*');
    if (data) setDeals(data);
    setLoading(false);
  };

  return (
    <div className="space-y-12 pb-16 bg-gray-50/50">
      <section className="bg-gradient-to-r from-red-600 to-indigo-900 text-white py-16 px-4">
        <div className="container mx-auto max-w-4xl text-center space-y-4">
          <span className="bg-white/20 text-white text-xs font-bold px-3.5 py-1.5 rounded-full uppercase inline-flex items-center space-x-1">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Hot Offers</span>
          </span>
          <h1 className="text-4xl font-black">Горячие скидки и акции</h1>
          <p className="text-red-100 max-w-xl mx-auto">
            Успейте приобрести лучшие гаджеты сезона по специальным сниженным ценам.
          </p>
        </div>
      </section>

      <section className="container mx-auto px-4 max-w-5xl">
        {loading ? (
          <div className="text-center py-12 text-gray-400">Загрузка акций...</div>
        ) : deals.length === 0 ? (
          <div className="text-center py-12 text-gray-400 bg-white rounded-3xl border border-gray-100">Акций пока нет.</div>
        ) : (
          <div className="grid grid-cols-1 gap-6">
            {deals.map((deal) => (
              <div key={deal.id} className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="space-y-3 max-w-lg">
                  <span className="bg-red-50 text-red-600 font-bold text-xs px-3 py-1 rounded-xl uppercase">
                    {deal.discount}
                  </span>
                  <h3 className="text-2xl font-black text-gray-900">{deal.title}</h3>
                  <p className="text-gray-500 text-sm">{deal.description}</p>
                </div>
                <Link
                  to="/catalog"
                  className="inline-flex items-center space-x-2 bg-indigo-600 text-white px-7 py-3.5 rounded-2xl font-bold hover:bg-indigo-700 transition shadow-lg shadow-indigo-200 flex-shrink-0"
                >
                  <span>В каталог</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}