"use client";

import { Badge } from "@/components/ui/badge";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";

export const DashBookedCustomersCard = ({
  title,
  link,
  data,
}: {
  title: string;
  link: string;
  data: CustomerPropsType[];
}) => {


  if (!data || data.length === 0) {
    return <div>No customers booked</div>;
  }

  return (
    <Link href={link || ""} aria-label="Enter list of customers">
      <Card className="w-[350px] flex flex-col justify-between items-center bg-gray-400/15 dark:bg-gray-600/15">
        <div className="flex flex-col justify-between items-start">
          <CardHeader>
            <CardTitle>{title}</CardTitle>
          </CardHeader>
        </div>
        <div className="flex justify-center items-center gap-4 p-6">
          <Badge
            variant={"outline"}
            className="flex justify-center items-center relative font-black text-green-600"
          >
            {data.length}
          </Badge>
        </div>
      </Card>
    </Link>
  );
};
