export const nameOfDoc = (type: string): string => {
  let name = '';
  switch (type) {
    case 'AM':
      name = 'Заявление о вступлении в профсоюзную организацию №';
      break;
    case 'AG':
      name = 'Повестка заседания Профкома №';
      break;
    case 'PG':
      name = 'Протокол заседания профкома №';
      break;
    default:
      name = 'Документ №';
      break;
  }
  return name;
};
