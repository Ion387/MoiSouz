export const statusColor = (status: string): string => {
  let color = '';
  switch (status) {
    case 'Ожидает отправки':
      color = 'rgb(255, 226, 153)';
      break;
    case 'Отправлено в профсоюз':
      color = 'rgb(255, 226, 153)';
      break;
    case 'Черновик':
      color = 'rgb(255, 226, 153)';
      break;
    case 'На согласовании':
      color = 'rgb(121, 216, 191)';
      break;
    case 'На проверке профсоюзом':
      color = 'rgb(121, 216, 191)';
      break;
    case 'Утверждено':
      color = 'rgb(121, 216, 191)';
      break;
    default:
      color = 'rgb(121, 216, 191)';
      break;
  }
  return color;
};
