export interface IBenefitsCategory {
  id: number;
  order: number;
  name: string;
  subcategory: {
    id: number;
    order: number;
    name: string;
  }[];
}

export interface IBenefitsProduct {
  id: number;
  name: string;
  image: string;
  main_category: {
    id: number;
    order: number;
    name: string;
  };
  categories: {
    id: number;
    order: number;
    name: string;
  }[];
  cities: {
    id: number;
    name: string;
  }[];
  isFavorite: boolean;
  updated_at: string;
  end: string;
}
