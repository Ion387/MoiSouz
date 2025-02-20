import { IBenefitsCategory } from '@/models/Benefits';

export const BENEFITS_CATEGORIES: IBenefitsCategory[] = [
  {
    id: 82,
    order: 1000,
    name: 'Новогодние скидки',
    subcategory: [],
  },
  {
    id: 64,
    order: 100,
    name: 'Новинки',
    subcategory: [],
  },
  {
    id: 3,
    order: 1,
    name: 'Техника и Электроника',
    subcategory: [
      {
        id: 4,
        order: 1,
        name: 'Бытовая техника',
      },
      {
        id: 5,
        order: 1,
        name: 'Электроника',
      },
    ],
  },
  {
    id: 6,
    order: 1,
    name: 'Товары',
    subcategory: [
      {
        id: 7,
        order: 11,
        name: 'Продукты питания',
      },
      {
        id: 8,
        order: 10,
        name: 'Недвижимость',
      },
      {
        id: 9,
        order: 9,
        name: 'Доставка на дом',
      },
      {
        id: 10,
        order: 8,
        name: 'Одежда и обувь',
      },
      {
        id: 11,
        order: 7,
        name: 'Все для дома',
      },
      {
        id: 12,
        order: 6,
        name: 'Косметика',
      },
      {
        id: 13,
        order: 1,
        name: 'Спортивные товары',
      },
      {
        id: 14,
        order: 1,
        name: 'Финансовые услуги',
      },
      {
        id: 15,
        order: 1,
        name: 'Животные',
      },
      {
        id: 16,
        order: 1,
        name: 'Онлайн покупки',
      },
      {
        id: 17,
        order: 1,
        name: 'Другое',
      },
      {
        id: 74,
        order: 5,
        name: 'Аксессуары',
      },
    ],
  },
  {
    id: 18,
    order: 1,
    name: 'Рестораны и доставка',
    subcategory: [
      {
        id: 19,
        order: 1,
        name: 'Высокая кухня',
      },
      {
        id: 20,
        order: 1,
        name: 'Средний чек',
      },
      {
        id: 21,
        order: 1,
        name: 'Сервисы доставки питания',
      },
    ],
  },
  {
    id: 22,
    order: 1,
    name: 'Обучение',
    subcategory: [
      {
        id: 23,
        order: 1,
        name: 'Языковые курсы',
      },
      {
        id: 24,
        order: 1,
        name: 'Профессиональные навыки',
      },
      {
        id: 25,
        order: 1,
        name: 'Универсальные компетенции',
      },
      {
        id: 26,
        order: 1,
        name: 'Обучение детей',
      },
    ],
  },
  {
    id: 27,
    order: 1,
    name: 'Отдых',
    subcategory: [
      {
        id: 28,
        order: 1,
        name: 'Санатории',
      },
      {
        id: 29,
        order: 1,
        name: 'Туризм',
      },
      {
        id: 30,
        order: 1,
        name: 'Загородный отдых',
      },
      {
        id: 63,
        order: 1,
        name: 'Городские Отели',
      },
      {
        id: 70,
        order: 1,
        name: 'Отели Cosmos Hotel Group',
      },
      {
        id: 84,
        order: 1,
        name: 'Агрегаторы отелей',
      },
    ],
  },
  {
    id: 31,
    order: 1,
    name: 'Спорт',
    subcategory: [
      {
        id: 32,
        order: 1,
        name: 'Фитнес',
      },
      {
        id: 33,
        order: 1,
        name: 'Танцы',
      },
      {
        id: 34,
        order: 1,
        name: 'Другие виды спорта',
      },
    ],
  },
  {
    id: 35,
    order: 1,
    name: 'Красота и Здоровье',
    subcategory: [
      {
        id: 36,
        order: 1,
        name: 'Медицинские клиники',
      },
      {
        id: 39,
        order: 1,
        name: 'Индустрия красоты',
      },
    ],
  },
  {
    id: 42,
    order: 1,
    name: 'Дети',
    subcategory: [
      {
        id: 43,
        order: 1,
        name: 'Детские товары',
      },
      {
        id: 44,
        order: 1,
        name: 'Обучение. Дети',
      },
      {
        id: 45,
        order: 1,
        name: 'Развлечения. Дети',
      },
    ],
  },
  {
    id: 46,
    order: 1,
    name: 'Развлечения',
    subcategory: [
      {
        id: 47,
        order: 1,
        name: 'Кино и театр',
      },
      {
        id: 48,
        order: 1,
        name: 'Активити',
      },
      {
        id: 49,
        order: 1,
        name: 'Шоу',
      },
      {
        id: 50,
        order: 1,
        name: 'Онлайн подписки',
      },
      {
        id: 51,
        order: 1,
        name: 'Экскурсии и квесты',
      },
      {
        id: 52,
        order: 1,
        name: 'Для детей',
      },
    ],
  },
  {
    id: 53,
    order: 1,
    name: 'Услуги',
    subcategory: [
      {
        id: 54,
        order: 1,
        name: 'Покупка недвижимости',
      },
      {
        id: 55,
        order: 1,
        name: 'Страхование и банки',
      },
      {
        id: 56,
        order: 1,
        name: 'Транспорт',
      },
      {
        id: 57,
        order: 1,
        name: 'Связь',
      },
      {
        id: 58,
        order: 1,
        name: 'Бытовые',
      },
      {
        id: 59,
        order: 1,
        name: 'Онлайн сервисы',
      },
    ],
  },
];
