export interface OrganizationNode {
  id: number;
  guid: string;
  title: string;
  type: number | null;
  children: OrganizationNode[] | null;
  selected: boolean;
  editable: boolean;
}

// Тип для массива организаций (верхний уровень)
export type OrganizationTree = OrganizationNode[];

// Интерфейс для данных, которые вы предоставили
export interface OrganizationData {
  organizations: OrganizationTree;
}

// Типизация для возможных типов организации (если они фиксированные)
export enum OrganizationType {
  FEDERAL = 1, // Федеральная ПО
  REGIONAL = 2, // Региональная организация
  COMPANY = 3, // Компания (OOO)
  TRADE_UNION = 4, // Профсоюзная организация
  TRADE_UNION_NOINN = 5, // Профсоюзная организация без ИНН
}

// Альтернативный вариант с использованием discriminated union
// если структура может различаться в зависимости от типа
export type Organization =
  | FederalOrganization
  | RegionalOrganization
  | CompanyOrganization
  | TradeUnionOrganization;

interface BaseOrganization {
  id: number;
  guid: string;
  title: string;
  selected: boolean;
  editable: boolean;
}

interface FederalOrganization extends BaseOrganization {
  type: OrganizationType.FEDERAL;
  children: RegionalOrganization[] | null;
}

interface RegionalOrganization extends BaseOrganization {
  type: OrganizationType.REGIONAL;
  children: (CompanyOrganization | TradeUnionOrganization)[] | null;
}

interface CompanyOrganization extends BaseOrganization {
  type: OrganizationType.COMPANY;
  children: TradeUnionOrganization[] | null;
}

interface TradeUnionOrganization extends BaseOrganization {
  type: OrganizationType.TRADE_UNION;
  children: null;
}
