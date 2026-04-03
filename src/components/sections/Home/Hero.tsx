import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle, Send } from 'lucide-react';

interface HeroProps {
  onOpenContact: () => void;
  onOpenLogin: () => void;
}

const Hero: React.FC<HeroProps> = ({ onOpenContact, onOpenLogin }) => {
  const chatMessages = [
    {
      id: 1,
      role: 'user',
      content: 'Как получить матпомощь? Опять нужно ехать в офис и заполнять бумаги?',
      delay: 1
    },
    {
      id: 2,
      role: 'admin',
      content: 'Добрый день! Нет, теперь всё просто. Оформите заявку прямо здесь за 1 минуту.',
      delay: 3.5
    },
    {
      id: 3,
      role: 'widget',
      content: (
        <div className="bg-white p-4 rounded-2xl shadow-sm border border-emerald-100 flex items-center gap-4 w-full">
          <div className="bg-emerald-100 p-2.5 rounded-full shrink-0">
            <CheckCircle className="w-6 h-6 text-emerald-600" />
          </div>
          <div>
            <div className="font-semibold text-slate-800">Заявка одобрена</div>
            <div className="text-sm text-slate-500">Материальная помощь • 15 000 ₽</div>
          </div>
        </div>
      ),
      delay: 6
    },
    {
      id: 4,
      role: 'user',
      content: 'Ого, так быстро! Спасибо большое 🎉',
      delay: 8
    }
  ];

  return (
    <section className="relative min-h-screen flex items-center pt-20 overflow-hidden bg-white">
      {/* Abstract Background Element */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-slate-50 opacity-50 skew-x-12 translate-x-32 -z-10" />

      <div className="max-w-7xl mx-auto px-6 w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <div className="inline-flex items-center space-x-2 bg-primary-50 text-primary-700 px-4 py-1.5 rounded-full text-sm font-semibold mb-8">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary-500"></span>
            </span>
            <span>Цифровизация профсоюзов</span>
          </div>
          
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-slate-900 leading-[1.1] mb-8 tracking-tight">
            Новый подход <br />
            <span className="text-primary-600">к заботе</span> о членах профсоюза
          </h1>
          
          <p className="text-xl text-slate-500 leading-relaxed mb-10 max-w-xl">
            Увеличьте количество участников и почувствуйте благодарность. 
            Цифровизация рутинных операций для открытого и понятного профсоюза.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <button 
              onClick={onOpenContact}
              className="bg-primary-600 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-primary-700 transition-colors flex items-center justify-center gap-2 group shadow-lg shadow-primary-500/20"
            >
              Получить предложение
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            <button 
              onClick={onOpenLogin}
              className="bg-white text-slate-700 border border-slate-200 px-8 py-4 rounded-xl font-semibold text-lg hover:border-slate-400 hover:bg-slate-50 transition-all flex items-center justify-center gap-2"
            >
              Войти в систему
            </button>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative hidden lg:block h-[650px] w-full"
        >
          <div className="absolute inset-0 bg-slate-50 rounded-[3rem] border-8 border-white shadow-2xl overflow-hidden flex flex-col">
            {/* Fake Phone Header */}
            <div className="bg-white px-8 py-6 border-b border-slate-100 flex items-center justify-between z-10">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary-100 flex items-center justify-center text-primary-600 font-bold">
                  НС
                </div>
                <div>
                  <div className="font-bold text-slate-900">НашСоюз</div>
                  <div className="text-xs text-green-500 font-medium flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span>
                    Онлайн
                  </div>
                </div>
              </div>
            </div>

            {/* Chat Area */}
            <div className="flex-1 p-6 space-y-6 overflow-hidden bg-slate-50/50">
              {chatMessages.map((msg) => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 20, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ 
                    duration: 0.5, 
                    delay: msg.delay,
                    type: "spring",
                    stiffness: 100 
                  }}
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div 
                    className={`
                      max-w-[80%] rounded-2xl p-4 shadow-sm relative
                      ${msg.role === 'user' 
                        ? 'bg-primary-600 text-white rounded-tr-none' 
                        : msg.role === 'widget'
                          ? 'w-full max-w-[90%] !p-0 !bg-transparent !shadow-none'
                          : 'bg-white text-slate-700 rounded-tl-none border border-slate-100'
                      }
                    `}
                  >
                    {msg.role === 'widget' ? msg.content : (
                      <p className="text-[15px] leading-relaxed">{msg.content}</p>
                    )}
                  </div>
                </motion.div>
              ))}
              
              {/* Typing Indicator for the next message (simulated loop or end state) */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 9.5, duration: 0.5 }}
                className="flex justify-start"
              >
                 <div className="bg-slate-200/50 rounded-full px-4 py-2 flex gap-1">
                    <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
                    <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
                    <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
                 </div>
              </motion.div>
            </div>

            {/* Fake Input Area */}
            <div className="bg-white p-4 border-t border-slate-100">
              <div className="bg-slate-100 rounded-full px-4 py-3 flex items-center justify-between text-slate-400">
                <span className="text-sm">Напишите сообщение...</span>
                <div className="bg-primary-600 p-1.5 rounded-full text-white">
                  <Send className="w-4 h-4" />
                </div>
              </div>
            </div>
          </div>
          
          {/* Decorative Elements behind phone */}
          <div className="absolute -bottom-10 -right-10 w-72 h-72 bg-primary-200/30 rounded-full blur-3xl -z-10"></div>
          <div className="absolute top-20 -left-10 w-40 h-40 bg-blue-200/30 rounded-full blur-2xl -z-10"></div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;