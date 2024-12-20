export type IOptionValue = string | number;

export interface IOption {
  id: IOptionValue;
  title: string;
}

export interface IOptionsResponse {
  data: IOption[];
  links: {
    self: string;
  };
  meta: {
    currentPage: number;
    itemsPerPage: number;
    totalItems: number;
  };
}
