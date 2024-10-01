import { QuoteForm } from "@/components/_cruises/QuoteForm";
import { getCruiseById } from "@/server/cruises.server";

export default async function AddQuotePage({
  params,
}: {
  params: { cruiseSlug: string };
}) {
  const cruiseSlug = parseInt(params.cruiseSlug);
  const cruise = (await getCruiseById(cruiseSlug)) as CruisePropsType;

  return (
    <>
      <QuoteForm cruise={cruise} />
    </>
  );
}
