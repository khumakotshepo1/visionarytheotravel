import { Button } from "@/components/ui/button";
import { PromotionsTable } from "./PromotionsTable";
import Link from "next/link";
import { promotionsColumns } from "./promotions-columns";
import { getAllPromotions } from "@/server/promotions.server";

export async function Promotions() {

  const promotions = await getAllPromotions() as PromotionsPropsType[]

  return (
    <>
      <section className="flex justify-end items-center p-4">
        <Link href="/dashboard/admin/promotions/add-promotion">
          <Button
            variant="outline"
            className="bg-crimsonElement dark:bg-crimsonElement text-lightElement dark:text-lightElement"
          >
            Add Promotion
          </Button>
        </Link>
      </section>
      <section>
        <PromotionsTable columns={promotionsColumns} data={promotions} />
      </section>
    </>
  );
}
