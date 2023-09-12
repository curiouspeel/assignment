export interface ICampaign {
  banner: string;
  logo: string;
  name: string;
  tags: string[];
  description: string;
  raised: string;
  target: string;
  currency: string;
}

export interface ICampaignResponse {
  total: number;
  page: number;
  limit: number;
  campaigns: ICampaign[];
}
