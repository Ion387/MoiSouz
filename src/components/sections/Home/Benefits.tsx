import React from 'react';
import { CheckCircle2 } from 'lucide-react';

const benefitsList = [
  {
    title: "Рост количества участников",
    desc: "Рост возможностей профсоюза для защиты интересов работников."
  },
  {
    title: "Понятные результаты",
    desc: "Рост доверия и лояльности. Понятные результаты работы профкома и участия в профсоюзе."
  },
  {
    title: "Защита персональных данных",
    desc: "Данные хранятся на серверах, аттестованных по 152-ФЗ. Безопасность участников гарантирована."
  },
  {
    title: "Профсоюз всегда на связи",
    desc: "Обратиться с жалобой или пообщаться с председателем профкома никогда не было так просто."
  },
  {
    title: "Экономия до 2000 рублей/мес",
    desc: "За счет скидок на товары и услуги профсоюзные взносы окупаются с лихвой."
  }
];

const Benefits: React.FC = () => {
  return (
    <section id="benefits" className="py-24 bg-slate-900 text-white">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <div>
          <h2 className="text-4xl md:text-5xl font-bold mb-12 tracking-tight">
            Польза для профсоюза <br/> и участников
          </h2>
          
          <div className="space-y-8">
            {benefitsList.map((item, idx) => (
              <div key={idx} className="flex gap-4">
                <CheckCircle2 className="w-8 h-8 text-primary-500 shrink-0 mt-1" />
                <div>
                  <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                  <p className="text-slate-400 text-lg">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="relative h-full flex items-center justify-center">
            {/* Abstract Graphic for Benefits */}
            <div className="relative w-full aspect-square max-w-md">
                <div className="absolute inset-0 bg-gradient-to-tr from-primary-600 to-indigo-500 rounded-full opacity-20 blur-3xl animate-pulse"></div>
                <div className="relative bg-white/5 backdrop-blur-lg border border-white/10 p-10 rounded-[3rem] h-full flex flex-col justify-center items-center text-center space-y-6">
                     <div className="text-7xl font-bold text-white tracking-tighter">24/7</div>
                     <div className="text-2xl text-slate-300">Доступ к информации</div>
                     <div className="w-20 h-1 bg-primary-500 rounded-full"></div>
                     <p className="text-slate-400">Вам больше не придется работать в Word и Excel, вручную собирать статистику.</p>
                </div>
            </div>
        </div>
      </div>
    </section>
  );
};

export default Benefits;