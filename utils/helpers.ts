export const handleHeaderTitle = (key: number) => {
  switch (key) {
    case 1:
      return 'Kort';

    case 2:
      return 'Chat';

    case 3:
      return 'Med-lem og App info';

    default:
      return 'Oversigt';
  }
};
