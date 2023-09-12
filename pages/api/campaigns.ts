import type { NextApiRequest, NextApiResponse } from "next";
import data from "@/src/data.json";
import { ICampaignResponse } from "@/src/types";

interface TRequest<T extends NextApiRequest["query"]> extends NextApiRequest {
  query: T;
}

export default function handler(
  req: TRequest<{ page: string; limit: string; search: string }>,
  res: NextApiResponse<ICampaignResponse | Error>
) {
  const page = parseInt(req.query.page) - 1 || 0;
  const limit = parseInt(req.query.limit) || 4;
  const search = (req.query.search || "").trim().toLowerCase();

  const filteredCampaigns =
    search.length < 0
      ? data
      : data.filter((campaign) => {
          const name = campaign.name.toLocaleLowerCase().trim();
          const tags = campaign.tags.map((tag) => tag.toLowerCase().trim());
          const fileredTags = tags.filter((tag) => tag.includes(search));
          return name.includes(search) || fileredTags.length > 0;
        });

  const campaigns = filteredCampaigns.slice(page * limit).slice(0, limit);

  res.status(200).json({
    total: filteredCampaigns.length,
    page,
    limit,
    campaigns,
  });
}
