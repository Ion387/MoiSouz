export const stepTransformation = (str: string) => {
  let step = 0;
  switch (str) {
    case 'Ожидает отправки':
      step = 1;
      break;
    case 'Отправлено в Профсоюз':
      step = 2;
      break;
    case 'На проверке Профсоюзом':
      step = 3;
      break;
    case 'Решение положительное, ожидает передачи оригинала в Профсоюз':
      step = 4;
      break;
    case 'Ожидает отправки ':
      step = 5;

      break;
    case 'Оригинал получен':
      step = 6;

      break;

    default:
      step = 0;
      break;
  }
  return step;
};
