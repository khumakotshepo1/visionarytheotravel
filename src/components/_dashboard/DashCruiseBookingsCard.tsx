"use client";

import { useState, useEffect } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { cn } from "@/lib/utils";

// Define the type for Cruise Bookings
interface CruiseBooking {
  cruise_price: string; // Keep this as a string since it's in the data
}

export const DashCruiseBookingsCard = ({
  title,
  link,
  data,
}: {
  title: string;
  link: string;
  data: CruiseBooking[]; // Array of CruiseBooking objects
}) => {
  // State to track previous totalPrice and trend
  const [previousTotalPrice, setPreviousTotalPrice] = useState<number | null>(
    null
  );
  const [hasIncreased, setHasIncreased] = useState<boolean>(false);
  const [hasDecreased, setHasDecreased] = useState<boolean>(false);

  // Calculate the current totalPrice for "Cruise Bookings"
  const totalPrice = data.reduce(
    (total, item) => total + (parseFloat(item.cruise_price) || 0),
    0
  );

  // Effect to track and compare the current and previous total prices
  useEffect(() => {
    if (previousTotalPrice !== null) {
      if (totalPrice > previousTotalPrice) {
        setHasIncreased(true);
        setHasDecreased(false);
      } else if (totalPrice < previousTotalPrice) {
        setHasIncreased(false);
        setHasDecreased(true);
      }
    }
    // Update the previous total price to the current one
    setPreviousTotalPrice(totalPrice);
  }, [totalPrice, previousTotalPrice]); // Only depend on totalPrice

  return (
    <Card className="w-[350px] flex justify-between bg-gray-400/15 dark:bg-gray-600/15">
      <div className="flex flex-col justify-between items-start">
        <CardHeader>
          <CardTitle>{title}</CardTitle>
        </CardHeader>
        <CardFooter>
          <Link href={link || ""} aria-label="Enter">
            <Button className="tracking-widest">Enter</Button>
          </Link>
        </CardFooter>
      </div>
      <div className="flex flex-col justify-center items-end gap-2 p-3">
        <Badge
          variant={"outline"}
          className="flex justify-center items-center relative font-black text-green-600"
        >
          {data.length < 1 ? 0 : data.length}
        </Badge>
        {/* Display the total price */}
        <p
          className={cn("text-sm", {
            "text-green-600": hasIncreased,
            "text-red-600": hasDecreased,
          })}
        >
          {hasIncreased ? "+" : hasDecreased ? "-" : ""}R
          {totalPrice > 0 ? Number(totalPrice).toFixed(2) : "0.00"}{" "}
          {/* Show 0.00 if totalPrice is 0 */}
        </p>
      </div>
    </Card>
  );
};
