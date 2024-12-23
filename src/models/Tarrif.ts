export interface ITarrif {
  title: string;
  price: string;
  priceDesc: string;
  list: string[];
  desc?: string | null;
  main?: boolean;
  setSteps?: (s: number) => void;
}
