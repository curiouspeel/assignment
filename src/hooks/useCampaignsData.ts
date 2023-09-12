import useSWR, { Fetcher } from "swr";
import { ICampaignResponse } from "../types";

const fetcher: Fetcher<ICampaignResponse> = (endpoint: string) =>
  fetch(endpoint).then((res) => res.json());

const useCampaignsData = (page: number, search?: string) => {
  const { data, error, isLoading } = useSWR<ICampaignResponse, Error>(
    `/api/campaigns?page=${page}${search ? `&search=${search}` : ""}`,
    fetcher
  );

  return {
    campaignData: data,
    isLoading,
    isError: error,
  };
};

export { useCampaignsData };
