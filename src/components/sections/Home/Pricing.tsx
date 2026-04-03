import React from 'react';
import { Check } from 'lucide-react';
import { PricingTier } from '../types';

const tiers: PricingTier[] = [
  {
    title: "Скидки",
    price: "19₽",
    subPrice: "или 29₽ поквартально",
    features: [
      "Кафетерий скидок и спецпредложений",
      "Тысячи партнеров",
      "Базовая статистика"
    ],
    isPopular: true,
    highlight: true,
    buttonText: "Подключить"
  },
  {
    title: "Простой",
    price: "29₽",
    subPrice: "или 39₽ поквартально",
    features: [
      "Всё что входит в тариф Скидки",
      "Централизованные рассылки",
      "Новости",
      "Чат с коллегами и профкомом",
      "Отключение рекламы"
    ],
    isPopular: false,
    highlight: false,
    buttonText: "Подключить"
  },
  {
    title: "Все сразу",
    price: "39₽",
    subPrice: "или 59₽ поквартально",
    features: [
      "Всё что входит в тариф Простой",
      "Онлайн общение с работодателем",
      "Подготовка повесток и протоколов",
      "Подача обращений и жалоб",
      "Онлайн вступление",
      "Соглашения на обработку ПД"
    ],
    isPopular: false,
    highlight: false,
    buttonText: "Подключить"
  },
  {
    title: "Наш",
    price: "Индивидуально",
    subPrice: "Для организаций > 25 000 чел.",
    features: [
      "Индивидуальные условия",
      "Все модули системы",
      "Персональный менеджер",
      "Приоритетная поддержка",
      "Доработка под требования"
    ],
    isPopular: false,
    highlight: false,
    buttonText: "Получить КП"
  }
];

interface PricingProps {
  onOpenContact: () => void;
}

const Pricing: React.FC<PricingProps> = ({ onOpenContact }) => {
  return (
    <section id="pricing" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
            Стоимость <span className="text-primary-600">НашСоюз</span>
          </h2>
          <p className="text-xl text-slate-500 mb-8">
            Мы независимая организация. Выбирайте то, что нужно вашей организации без переплат.
            Участники оценят вашу заботу.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8">
          {tiers.map((tier, index) => (
            <div 
              key={index}
              className={`relative p-8 rounded-3xl flex flex-col ${
                tier.isPopular 
                  ? 'bg-white border-2 border-primary-500 shadow-2xl scale-105 z-10' 
                  : 'bg-slate-50 border border-slate-100'
              }`}
            >
              {tier.isPopular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary-600 text-white px-4 py-1 rounded-full text-sm font-semibold whitespace-nowrap">
                  Самый популярный
                </div>
              )}

              <h3 className="text-2xl font-bold text-slate-900 mb-2">{tier.title}</h3>
              <div className="mb-1">
                <span className={`font-bold text-slate-900 ${tier.price === 'Индивидуально' ? 'text-2xl' : 'text-4xl'}`}>{tier.price}</span>
                {!tier.price.includes('Индивидуально') && <span className="text-slate-500"> / чел. в мес.</span>}
              </div>
              <p className="text-sm text-slate-500 mb-8 min-h-[40px]">{tier.subPrice}</p>

              <ul className="space-y-4 mb-8 flex-1">
                {tier.features.map((feature, fIndex) => (
                  <li key={fIndex} className="flex items-start text-sm text-slate-700">
                    <Check className="w-5 h-5 text-primary-500 mr-2 shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <button 
                onClick={onOpenContact}
                className={`w-full py-3 rounded-xl font-semibold transition-colors ${
                  tier.isPopular 
                    ? 'bg-primary-600 text-white hover:bg-primary-700' 
                    : 'bg-slate-900 text-white hover:bg-slate-800'
                }`}
              >
                {tier.buttonText}
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Pricing;