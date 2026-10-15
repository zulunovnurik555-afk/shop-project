import { Shield, MapPin, Truck, Headphones, Award, CheckCircle } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="space-y-16 pb-16 bg-gray-50/50">
      
      {/* Верхний баннер страницы */}
      <section className="bg-gradient-to-r from-gray-900 via-indigo-950 to-indigo-900 text-white py-20 px-4">
        <div className="container mx-auto max-w-4xl text-center space-y-6">
          <span className="bg-indigo-500/30 text-indigo-200 text-xs font-bold px-4 py-1.5 rounded-full border border-indigo-400/30 uppercase tracking-widest">
            About AsiaTech
          </span>
          <h1 className="text-4xl md:text-5xl font-black tracking-tight">
            Ведущий реселлер современной техники в Кыргызстане
          </h1>
          <p className="text-indigo-100 text-lg max-w-2xl mx-auto">
            Мы делаем передовые технологии доступными для каждого, предлагая оригинальные гаджеты, смартфоны и аксессуары с официальной гарантией.
          </p>
        </div>
      </section>

      {/* О компании (Контент) */}
      <section className="container mx-auto px-4 max-w-5xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h2 className="text-3xl font-black text-gray-900">
              Наша цель — качество и надежность в каждой детали
            </h2>
            <p className="text-gray-600 leading-relaxed">
              Компания **AsiaTech** была создана с простой идеей: предоставить жителям Бишкека и всей республики прямой доступ к лучшим мировым новинкам электроники. Мы работаем напрямую с проверенными поставщиками, исключая подделки и гарантируя подлинность каждого товара.
            </p>
            <div className="space-y-3">
              <div className="flex items-center space-x-3 text-gray-800 font-medium">
                <CheckCircle className="w-5 h-5 text-indigo-600 flex-shrink-0" />
                <span>100% оригинальная продукция с гарантийным обслуживанием</span>
              </div>
              <div className="flex items-center space-x-3 text-gray-800 font-medium">
                <CheckCircle className="w-5 h-5 text-indigo-600 flex-shrink-0" />
                <span>Быстрая и бережная доставка по всему Кыргызстану</span>
              </div>
              <div className="flex items-center space-x-3 text-gray-800 font-medium">
                <CheckCircle className="w-5 h-5 text-indigo-600 flex-shrink-0" />
                <span>Профессиональная техническая поддержка и консультации</span>
              </div>
            </div>
          </div>

          <div className="bg-white p-4 rounded-3xl border border-gray-100 shadow-xl overflow-hidden">
            <img 
              src="https://images.unsplash.com/photo-1531482615713-2afd69097998?w=800&q=80" 
              alt="Our team office" 
              className="w-full h-80 object-cover rounded-2xl"
            />
          </div>
        </div>
      </section>

      {/* Наши преимущества */}
      <section className="container mx-auto px-4 max-w-5xl">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm text-center space-y-4">
            <div className="bg-indigo-50 w-14 h-14 mx-auto rounded-2xl flex items-center justify-center text-indigo-600">
              <Shield className="w-7 h-7" />
            </div>
            <h3 className="text-xl font-bold text-gray-900">Официальная гарантия</h3>
            <p className="text-gray-500 text-sm">На всю технику распространяется надежная гарантия сервисного центра.</p>
          </div>

          <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm text-center space-y-4">
            <div className="bg-indigo-50 w-14 h-14 mx-auto rounded-2xl flex items-center justify-center text-indigo-600">
              <Truck className="w-7 h-7" />
            </div>
            <h3 className="text-xl font-bold text-gray-900">Оперативная доставка</h3>
            <p className="text-gray-500 text-sm">Доставляем заказы курьером до двери в кратчайшие сроки.</p>
          </div>

          <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm text-center space-y-4">
            <div className="bg-indigo-50 w-14 h-14 mx-auto rounded-2xl flex items-center justify-center text-indigo-600">
              <Headphones className="w-7 h-7" />
            </div>
            <h3 className="text-xl font-bold text-gray-900">Поддержка клиентов</h3>
            <p className="text-gray-500 text-sm">Помогаем сделать правильный выбор и отвечаем на любые вопросы 24/7.</p>
          </div>
        </div>
      </section>

      {/* Контакты / Адрес */}
      <section className="container mx-auto px-4 max-w-5xl">
        <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-3">
            <div className="flex items-center space-x-2 text-indigo-600 font-bold text-sm">
              <MapPin className="w-5 h-5" />
              <span>Наш главный шоурум</span>
            </div>
            <h3 className="text-2xl font-black text-gray-900">г. Бишкек, пр. Чуй (ЦУМ Айчурек)</h3>
            <p className="text-gray-500 text-sm">Приходите оценить новинки электроники лично в наш магазин.</p>
          </div>
          <div className="bg-indigo-50 px-6 py-4 rounded-2xl text-indigo-900 font-bold text-center">
            Пн - Вс: 10:00 — 20:00
          </div>
        </div>
      </section>

    </div>
  );
}