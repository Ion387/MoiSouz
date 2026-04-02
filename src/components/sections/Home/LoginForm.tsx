import React, { useState } from 'react';

interface LoginFormProps {
  onSuccess: () => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ onSuccess }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      onSuccess();
    }, 1500);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-slate-700 mb-1">
          Email
        </label>
        <input
          type="email"
          required
          className="w-full px-4 py-2 rounded-xl border border-slate-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 outline-none transition-all"
          placeholder="user@example.com"
        />
      </div>
      
      <div>
        <label className="block text-sm font-medium text-slate-700 mb-1">
          Пароль
        </label>
        <input
          type="password"
          required
          className="w-full px-4 py-2 rounded-xl border border-slate-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 outline-none transition-all"
          placeholder="••••••••"
        />
      </div>

      <div className="flex items-center justify-between text-sm">
        <label className="flex items-center text-slate-600 cursor-pointer">
          <input type="checkbox" className="mr-2 rounded text-primary-600 focus:ring-primary-500" />
          Запомнить меня
        </label>
        <a href="#" className="text-primary-600 hover:underline">Забыли пароль?</a>
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-slate-900 text-white py-3 rounded-xl font-semibold hover:bg-slate-800 transition-colors disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center"
      >
        {isSubmitting ? (
          <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
        ) : (
          'Войти'
        )}
      </button>

      <div className="text-center text-sm text-slate-500 mt-4">
        Нет аккаунта? <button type="button" className="text-primary-600 font-medium hover:underline">Регистрация</button>
      </div>
    </form>
  );
};

export default LoginForm;
