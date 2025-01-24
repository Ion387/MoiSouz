import { IDoc } from '@/models/Doc';

export const groupByTU = (docs: IDoc[]) => {
  const arrOfTU = Array.from(new Set(docs.map((doc) => doc.tradeunion.title)));
  return arrOfTU.map((tu) => ({
    tradeunion: tu,
    docs: docs.filter((doc) => doc.tradeunion.title === tu),
  }));
};
