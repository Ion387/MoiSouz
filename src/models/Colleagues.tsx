export interface IOrganization {
  id: number;
  name: string;
  count: number;
}

export interface IColleague {
  id: number;
  fio: string;
  organization: {
    id: number;
    name: string;
  };
  position: string;
  contact: string;
}

export interface IOrganizationUploadUsersForm {
  organization: number;
}
