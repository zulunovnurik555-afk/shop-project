import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Trash2, ShoppingBag, ArrowRight, CheckCircle2 } from 'lucide-react';

export default function CartPage({ cart, removeFromCart, clearCart }) {
  const [formData, setFormData] = useState({ name: '', phone: '', address: '' });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.phone || !formData.address) {
      alert('Пожалуйста, заполните все поля формы!');
      return;
    }
    setIsSubmitted(true);
    clearCart();
  };

  if (isSubmitted) {
    return (
      <div className="container mx-auto px-4 py-16 text-center space-y-6 max-w-md">
        <div className="flex justify-center">
          <CheckCircle2 className="w-20 h-20 text-emerald-500" />
        </div>
        <h2 className="text-3xl font-bold text-gray-900">Заказ успешно оформлен!</h2>
        <p className="text-gray-600">
          Спасибо за покупку, <span className="font-semibold text-gray-900">{formData.name}</span>! Мы свяжемся с вами в ближайшее время по номеру <span className="font-semibold text-gray-900">{formData.phone}</span>.
        </p>
        <Link
          to="/catalog"
          className="inline-block bg-indigo-600 text-white px-8 py-3 rounded-xl font-medium hover:bg-indigo-700 transition shadow-lg"
        >
          Вернуться в каталог
        </Link>
      </div>
    );
  }

  if (cart.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16 text-center space-y-6">
        <div className="flex justify-center">
          <ShoppingBag className="w-20 h-20 text-gray-300" />
        </div>
        <h2 className="text-2xl font-bold text-gray-800">Ваша корзина пуста</h2>
        <p className="text-gray-500 max-w-sm mx-auto">
          Добавьте товары из каталога, чтобы сделать заказ.
        </p>
        <Link
          to="/catalog"
          className="inline-block bg-indigo-600 text-white px-6 py-3 rounded-xl font-medium hover:bg-indigo-700 transition shadow"
        >
          Перейти в каталог
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Оформление заказа</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Список товаров */}
        <div className="lg:col-span-2 space-y-4">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Ваш заказ</h2>
          {cart.map((item) => (
            <div key={item.id} className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex items-center justify-between gap-4">
              <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded-xl" />
              <div className="flex-grow">
                <h3 className="font-semibold text-gray-800 text-lg">{item.name}</h3>
                <p className="text-gray-500 text-sm">{item.price} сом × {item.quantity}</p>
              </div>
              <div className="text-right">
                <span className="font-bold text-indigo-600 text-lg block mb-2">
                  {item.price * item.quantity} сом
                </span>
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="text-red-500 hover:text-red-700 p-1.5 transition"
                  title="Удалить товар"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Форма и итоги */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 h-fit space-y-6">
          <h3 className="text-xl font-bold text-gray-800">Детали доставки</h3>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Имя</label>
              <input
                type="text"
                required
                placeholder="Иван Иванов"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-indigo-600 transition"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Телефон</label>
              <input
                type="tel"
                required
                placeholder="+996 (XXX) XX-XX-XX"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-indigo-600 transition"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Адрес доставки</label>
              <textarea
                required
                rows="2"
                placeholder="Город, улица, дом, квартира"
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-indigo-600 transition resize-none"
              />
            </div>

            <div className="border-t pt-4 space-y-2">
              <div className="flex justify-between text-gray-600">
                <span>Товары:</span>
                <span className="font-semibold text-gray-800">{totalPrice} сом</span>
              </div>
              <div className="flex justify-between text-lg font-bold text-gray-900">
                <span>К оплате:</span>
                <span className="text-indigo-600">{totalPrice} сом</span>
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-indigo-600 text-white py-3.5 rounded-xl font-medium hover:bg-indigo-700 transition shadow-lg flex items-center justify-center space-x-2"
            >
              <span>Подтвердить заказ</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}