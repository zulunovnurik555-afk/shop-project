import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { Lock, LogOut, Plus, Trash2, ShieldCheck, AlertCircle } from 'lucide-react';

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('');
  const [image, setImage] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');

  useEffect(() => {
    const authStatus = sessionStorage.getItem('isAdminAuth');
    if (authStatus === 'true') {
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();
    if (password === 'i am admin' || password === 'admin001') {
      setIsAuthenticated(true);
      sessionStorage.setItem('isAdminAuth', 'true');
      setError('');
    } else {
      setError('Неверный пароль администратора!');
    }
  };

  // Выход из админки
  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem('isAdminAuth');
    setPassword('');
  };

  // Добавление товара в Supabase
  const handleAddProduct = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccessMsg('');

    const { error } = await supabase.from('products').insert([
      {
        name,
        price: Number(price),
        category,
        image,
        description,
        rating: 5.0,
      },
    ]);

    setLoading(false);
    if (error) {
      alert('Ошибка при добавлении: ' + error.message);
    } else {
      setSuccessMsg('Товар успешно добавлен в базу данных!');
      setName('');
      setPrice('');
      setCategory('');
      setImage('');
      setDescription('');
    }
  };

  // 🔒 ЕСЛИ НЕ АВТОРИЗОВАН — ПОКАЗЫВАЕМ ОКНО ВХОДА
  if (!isAuthenticated) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center px-4 py-12 bg-gray-50">
        <div className="max-w-md w-full bg-white rounded-3xl p-8 border border-gray-100 shadow-xl space-y-6">
          <div className="text-center space-y-2">
            <div className="bg-indigo-50 w-16 h-16 mx-auto rounded-2xl flex items-center justify-center text-indigo-600">
              <Lock className="w-8 h-8" />
            </div>
            <h1 className="text-2xl font-black text-gray-900">Вход в панель админа</h1>
            <p className="text-gray-500 text-sm">Введите пароль для доступа к управлению магазином</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase mb-1.5">Пароль</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Введите пароль (например: admin123)"
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-600/20 focus:border-indigo-600 text-sm"
                required
              />
            </div>

            {error && (
              <div className="flex items-center space-x-2 text-red-500 text-xs bg-red-50 p-3 rounded-xl font-medium">
                <AlertCircle className="w-4 h-4 flex-shrink-0" />
                <span>{error}</span>
              </div>
            )}

            <button
              type="submit"
              className="w-full bg-indigo-600 text-white font-bold py-3.5 rounded-xl hover:bg-indigo-700 transition shadow-lg shadow-indigo-200"
            >
              Войти в систему
            </button>
          </form>

          <div className="text-center text-xs text-gray-400">
            Подсказка для теста: пароль <span className="font-bold text-gray-600">admin123</span>
          </div>
        </div>
      </div>
    );
  }

  // 🔓 ЕСЛИ АВТОРИЗОВАН — ПОКАЗЫВАЕМ ПАНЕЛЬ УПРАВЛЕНИЯ
  return (
    <div className="container mx-auto px-4 py-10 max-w-4xl space-y-8">
      
      {/* Верхняя панель админа */}
      <div className="flex items-center justify-between bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
        <div className="flex items-center space-x-3">
          <div className="bg-emerald-50 text-emerald-600 p-3 rounded-2xl">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-xl font-black text-gray-900">Панель администратора</h1>
            <p className="text-gray-500 text-xs">Управление каталогом товаров магазина</p>
          </div>
        </div>
        <button
          onClick={handleLogout}
          className="flex items-center space-x-1.5 bg-gray-100 hover:bg-red-50 text-gray-700 hover:text-red-600 px-4 py-2.5 rounded-xl transition text-xs font-bold"
        >
          <LogOut className="w-4 h-4" />
          <span>Выйти</span>
        </button>
      </div>

      {/* Форма добавления нового товара */}
      <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm space-y-6">
        <div className="flex items-center space-x-2 border-b border-gray-100 pb-4">
          <Plus className="w-5 h-5 text-indigo-600" />
          <h2 className="text-lg font-black text-gray-900">Добавить новый товар</h2>
        </div>

        {successMsg && (
          <div className="bg-emerald-50 text-emerald-700 p-4 rounded-2xl text-sm font-bold flex items-center space-x-2">
            <span>✅</span>
            <span>{successMsg}</span>
          </div>
        )}

        <form onSubmit={handleAddProduct} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-1.5">
            <label className="block text-xs font-bold text-gray-700 uppercase">Название товара</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Например: Apple iPhone 15"
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-600/20 focus:border-indigo-600 text-sm"
              required
            />
          </div>

          <div className="space-y-1.5">
            <label className="block text-xs font-bold text-gray-700 uppercase">Цена (сом)</label>
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder="95000"
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-600/20 focus:border-indigo-600 text-sm"
              required
            />
          </div>

          <div className="space-y-1.5">
            <label className="block text-xs font-bold text-gray-700 uppercase">Категория / Бренд</label>
            <input
              type="text"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              placeholder="Смартфоны"
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-600/20 focus:border-indigo-600 text-sm"
              required
            />
          </div>

          <div className="space-y-1.5">
            <label className="block text-xs font-bold text-gray-700 uppercase">Ссылка на картинку (URL)</label>
            <input
              type="url"
              value={image}
              onChange={(e) => setImage(e.target.value)}
              placeholder="https://images.unsplash.com/..."
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-600/20 focus:border-indigo-600 text-sm"
              required
            />
          </div>

          <div className="md:col-span-2 space-y-1.5">
            <label className="block text-xs font-bold text-gray-700 uppercase">Описание товара</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Краткие характеристики устройства..."
              rows={3}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-600/20 focus:border-indigo-600 text-sm"
              required
            />
          </div>

          <div className="md:col-span-2 pt-2">
            <button
              type="submit"
              disabled={loading}
              className="bg-indigo-600 text-white px-8 py-3.5 rounded-xl font-bold hover:bg-indigo-700 transition shadow-lg shadow-indigo-200 disabled:opacity-50 flex items-center justify-center space-x-2 w-full md:w-auto"
            >
              <Plus className="w-5 h-5" />
              <span>{loading ? 'Добавление...' : 'Опубликовать товар'}</span>
            </button>
          </div>
        </form>
      </div>

    </div>
  );
}