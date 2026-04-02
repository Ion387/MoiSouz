import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus } from 'lucide-react';

interface FAQItemProps {
  question: string;
  answer: string;
  isOpen: boolean;
  onClick: () => void;
}

const FAQItem: React.FC<FAQItemProps> = ({ question, answer, isOpen, onClick }) => {
  return (
    <div 
      className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden cursor-pointer hover:shadow-md transition-shadow duration-300"
      onClick={onClick}
    >
      <div className="p-6 flex items-center justify-between gap-4">
        <h3 className="text-lg font-bold text-slate-900">{question}</h3>
        <div className={`shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-colors ${isOpen ? 'bg-primary-100 text-primary-600' : 'bg-slate-100 text-slate-400'}`}>
          {isOpen ? <Minus size={18} /> : <Plus size={18} />}
        </div>
      </div>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <div className="px-6 pb-6 text-slate-500 leading-relaxed">
              {answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const faqData = [
  {
    question: "Как подключиться к системе НашСоюз?",
    answer: "Чтобы подключиться к системе НашСоюз, заполните форму обратной связи на сайте. После этого с вами свяжется специалист, уточнит задачи вашей организации, расскажет об условиях подключения и поможет выбрать подходящий тариф."
  },
  {
    question: "Есть ли бесплатный тестовый период?",
    answer: "Бесплатный тестовый период в сервисе не предусмотрен. При этом для новых клиентов при заключении договора на 12 месяцев предоставляется 1 месяц использования в подарок."
  },
  {
    question: "Где размещены серверы системы?",
    answer: "Серверы, на которых размещена система, находятся на территории Российской Федерации. Размещение инфраструктуры организовано в соответствии с действующими требованиями законодательства РФ."
  },
  {
    question: "Как быстро можно начать пользоваться системой после оплаты?",
    answer: "После оплаты и получения всех необходимых данных специалисты настраивают систему и подключают пользователей в течение 1 рабочего дня. Перед подключением важно заранее получить согласие пользователей на обработку персональных данных."
  },
  {
    question: "Можно ли получить доступ к скидкам, если я не состою в профсоюзе?",
    answer: "Оплата доступа к сервису принимается только от юридических лиц. Если в вашей компании нет профсоюза, но вы хотите пользоваться скидками и предложениями партнеров, вы можете согласовать подключение с руководителем или организацией и оформить доступ через юридическое лицо."
  },
  {
    question: "Можно ли создать собственный профсоюз и подключиться к системе?",
    answer: "В системе предусмотрен пошаговый мастер для создания собственного профсоюза, однако в данный момент эта функция временно недоступна. Вы можете оставить заявку, чтобы получить консультацию по доступным вариантам подключения."
  }
];

const FAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const handleToggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-24 bg-slate-50">
      <div className="max-w-4xl mx-auto px-6">
        <div className="mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6 tracking-tight">
            Частые вопросы о подключении <br className="hidden md:block" />
            и работе с <span className="text-primary-600">платформой</span>
          </h2>
          <p className="text-xl text-slate-500 max-w-3xl">
            Собрали ответы на популярные вопросы о подключении, сроках запуска, размещении данных, тестовом периоде и доступе к скидкам.
          </p>
        </div>

        <div className="space-y-4">
          {faqData.map((item, index) => (
            <FAQItem
              key={index}
              question={item.question}
              answer={item.answer}
              isOpen={openIndex === index}
              onClick={() => handleToggle(index)}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
