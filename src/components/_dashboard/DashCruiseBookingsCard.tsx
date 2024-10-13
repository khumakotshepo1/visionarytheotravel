
"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import { Badge } from "@/components/ui/badge";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { addPreviousTotalCruiseBookingPriceAction } from "@/actions/cruise.actions";

// Define types
interface CruiseBooking {
  cruise_price: string;
}

export const DashCruiseBookingsCard = ({
  title,
  link,
  data,
  prev_cruise_total_price,
}: {
  title: string;
  link: string;
  data: CruiseBooking[];
  prev_cruise_total_price: PreviousCruiseTotalPricePropsType[];
}) => {
  const [hasIncreased, setHasIncreased] = useState<boolean>(false);
  const [hasDecreased, setHasDecreased] = useState<boolean>(false);

  // Use useMemo to calculate totalPrice and previousTotalPrice
  const totalPrice = useMemo(() => {
    return data.reduce(
      (total, item) => total + (Number(item.cruise_price) || 0),
      0
    );
  }, [data]);

  const previousTotalPrice = useMemo(() => {
    return Number(prev_cruise_total_price[0]?.prev_cruise_total_price) || 0;
  }, [prev_cruise_total_price]);

  const changedBasisPoints = totalPrice - previousTotalPrice;

  // Memoized function to handle price comparison
  const updatePriceTrend = useCallback(() => {
    setHasIncreased(totalPrice > previousTotalPrice);
    setHasDecreased(totalPrice < previousTotalPrice);
  }, [totalPrice, previousTotalPrice]);

  useEffect(() => {
    updatePriceTrend();

    if (totalPrice !== previousTotalPrice) {
      addPreviousTotalCruiseBookingPriceAction(totalPrice);
    }
  }, [totalPrice, previousTotalPrice, updatePriceTrend]);

  if (!data || data.length === 0) {
    return <div>No bookings available</div>;
  }

  return (
    <Link href={link || ""} aria-label="Enter cruise bookings">
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
          <div className="relative flex justify-center items-center">
            <p className={cn("text-sm")}>
              R {totalPrice > 0 ? Number(totalPrice).toFixed(2) : "0.00"}
            </p>
            <p className={cn("text-xs text-gray-500 absolute -top-3 -right-10", {
              "text-green-600": hasIncreased,
              "text-red-600": hasDecreased,
            })}>
              {hasIncreased ? "+" : hasDecreased ? "" : ""}
              {previousTotalPrice ? changedBasisPoints.toFixed(2) : "0.00"}
            </p>
          </div>
        </div>
      </Card>
    </Link>
  );
};
