export interface IFormColleagueProfile {
  firstName: string;
  lastName: string;
  middleName?: string;

  gender: string;
  enteryear: string;
  filldate: string;

  role: string;

  tradeunionMainName: string;
  tradeunionMainAddress: string;
  tradeunionMainPhone: string;

  tradeunionTerritoryName: string;
  tradeunionTerritoryAddress: string;
  tradeunionTerritoryPhone: string;

  tradeunionWasMember?: string;

  acceptdate: string;
  releasedate: string;
}
