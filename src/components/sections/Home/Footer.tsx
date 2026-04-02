import React from 'react';

interface FooterProps {
  onOpenContact: () => void;
}

const Footer: React.FC<FooterProps> = ({ onOpenContact }) => {
  return (
    <footer className="bg-white pt-20 pb-10 border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="col-span-1 md:col-span-2">
            <span className="text-2xl font-bold tracking-tighter text-slate-900 block mb-6">
              Наш<span className="text-primary-600">Союз</span>
            </span>
            <p className="text-slate-500 text-lg max-w-sm mb-6">
              Новый подход к заботе о членах профсоюза и цифровизации рутинных операций.
            </p>
            <button 
              onClick={onOpenContact}
              className="bg-primary-50 text-primary-700 px-6 py-3 rounded-xl font-semibold hover:bg-primary-100 transition-colors"
            >
              Запросить демо
            </button>
          </div>
          
          <div>
            <h4 className="font-bold text-slate-900 mb-6">Разделы</h4>
            <ul className="space-y-4">
              <li><a href="#features" className="text-slate-500 hover:text-primary-600 transition-colors">Возможности</a></li>
              <li><a href="#steps" className="text-slate-500 hover:text-primary-600 transition-colors">Как это работает</a></li>
              <li><a href="#benefits" className="text-slate-500 hover:text-primary-600 transition-colors">Польза</a></li>
              <li><a href="#pricing" className="text-slate-500 hover:text-primary-600 transition-colors">Стоимость</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-slate-900 mb-6">Контакты</h4>
            <p className="text-slate-500 mb-4">
              Есть вопросы? Мы всегда на связи.
            </p>
            <a href="mailto:info@nash-soyuz.ru" className="text-primary-600 font-semibold hover:underline block mb-2">
              info@nash-soyuz.ru
            </a>
            <div className="text-slate-400 text-sm mt-8">
              &copy; {new Date().getFullYear()} НашСоюз.<br/>
              Все права защищены.
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;