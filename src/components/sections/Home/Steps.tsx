import React from 'react';
import { motion } from 'framer-motion';
import { StepItem } from '../types';

const stepsData: StepItem[] = [
  {
    number: "01",
    title: "Оставьте заявку на подключение",
    description: "Мы свяжемся и обговорим детали, вместе подберем подходящий тариф или предложим индивидуальный."
  },
  {
    number: "02",
    title: "Введем основные данные",
    description: "Внесем данные о профсоюзе, настроим роли и заведем участников. Вам не потребуется много времени."
  },
  {
    number: "03",
    title: "Подключим и передадим доступ",
    description: "В соответствии с тарифом подключим модули, все настроим и передадим полностью готовую систему."
  }
];

const Steps: React.FC = () => {
  return (
    <section id="steps" className="py-24 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4 tracking-tight">
            3 простых шага
          </h2>
          <p className="text-xl text-slate-500">к успешному цифровому профсоюзу</p>
        </div>

        <div className="relative grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Connecting dashed line for desktop */}
          <div className="hidden md:block absolute top-12 left-[16%] right-[16%] h-0.5 border-t-2 border-dashed border-primary-200 z-0" />

          {stepsData.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              className="relative z-10 flex flex-col items-center text-center"
            >
              <div className="w-24 h-24 bg-white border-4 border-primary-100 rounded-full flex items-center justify-center text-3xl font-bold text-primary-600 mb-8 shadow-sm">
                {step.number}
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-4 px-4">{step.title}</h3>
              <p className="text-slate-500 leading-relaxed max-w-sm">
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>

        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-20 bg-primary-50 rounded-3xl p-10 text-center border border-primary-100"
        >
            <h4 className="text-2xl font-bold text-primary-900 mb-4">Поддержка на каждом этапе</h4>
            <p className="text-lg text-primary-700 max-w-3xl mx-auto">
                Служба технической поддержки НашСоюз поможет освоить сервис в кратчайшие сроки, ответит на частые вопросы и сделает опыт использования системы приятным и простым.
            </p>
        </motion.div>
      </div>
    </section>
  );
};

export default Steps;