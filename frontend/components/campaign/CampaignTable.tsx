import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import CampaignStatusBadge from "./CampaignStatusBadge";

import { Campaign } from "@/types/campaign";

interface Props {
  campaigns: Campaign[];
}

export default function CampaignTable({
  campaigns,
}: Props) {
  return (
    <Table>

      <TableHeader>

        <TableRow>

          <TableHead>Campaign</TableHead>

          <TableHead>Audience</TableHead>

          <TableHead>Discount</TableHead>

          <TableHead>Revenue</TableHead>

          <TableHead>Confidence</TableHead>

          <TableHead>Status</TableHead>

        </TableRow>

      </TableHeader>

      <TableBody>

        {campaigns.map((campaign) => (
          <TableRow key={campaign.id}>

            <TableCell className="font-medium">
              {campaign.title}
            </TableCell>

            <TableCell>
              {campaign.audience}
            </TableCell>

            <TableCell>
              {campaign.discount_percentage}%
            </TableCell>

            <TableCell>
              ₹{Number(
                campaign.expected_revenue
              ).toLocaleString()}
            </TableCell>

            <TableCell>
              {campaign.confidence}%
            </TableCell>

            <TableCell>

              <CampaignStatusBadge
                status={campaign.status}
              />

            </TableCell>

          </TableRow>
        ))}

      </TableBody>

    </Table>
  );
}