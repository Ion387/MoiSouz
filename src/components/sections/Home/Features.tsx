import React from 'react';
import { motion } from 'framer-motion';
import { Tag, MessageCircle, FileText, ShieldAlert, Clock, PieChart } from 'lucide-react';
import { FeatureItem } from '../types';

const featuresData: FeatureItem[] = [
  {
    title: "Тысячи скидок участникам",
    description: "Онлайн доступ к промокодам для скидок онлайн и в магазинах. Почувствуйте тепло обратной связи от участников.",
    icon: Tag,
  },
  {
    title: "Общение в онлайн режиме",
    description: "Встроенный чат с профкомом и работодателем. Рассылка новостей никогда не была такой простой.",
    icon: MessageCircle,
  },
  {
    title: "Документы онлайн",
    description: "Формирование повесток, протоколов, выписок, постановлений. Централизованное хранение соглашений на обработку данных.",
    icon: FileText,
  },
  {
    title: "Жалобы и обращения",
    description: "Эффективная подача официальных обращений и получение ответов. Как Госуслуги, только проще.",
    icon: ShieldAlert,
  },
  {
    title: "История участия",
    description: "Личное портфолио всегда под рукой. Сохраняет все данные при смене профсоюза или переезде.",
    icon: Clock,
  },
  {
    title: "Статистика",
    description: "Формирует аналитику для пользователя и руководства, позволяющую оценить эффективность работы.",
    icon: PieChart,
  }
];

const Features: React.FC = () => {
  return (
    <section id="features" className="py-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-16 max-w-3xl">
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6 tracking-tight">
            Ключевые возможности <span className="text-primary-600">сервиса</span>
          </h2>
          <p className="text-xl text-slate-500">
            Ощутите порядок, собрав все необходимое для работы профсоюза в единой системе.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuresData.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="bg-white p-8 rounded-3xl border border-slate-100 hover:border-primary-200 hover:shadow-xl hover:shadow-primary-900/5 transition-all duration-300 group"
            >
              <div className="w-14 h-14 bg-primary-50 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-primary-600 transition-colors duration-300">
                <feature.icon className="w-7 h-7 text-primary-600 group-hover:text-white transition-colors duration-300" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-4">{feature.title}</h3>
              <p className="text-slate-500 leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;