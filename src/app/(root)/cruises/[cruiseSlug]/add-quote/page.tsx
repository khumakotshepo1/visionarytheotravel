import { QuoteForm } from "@/components/_cruises/QuoteForm";
import { getCruiseById } from "@/server/cruises.server";

type Params = Promise<{ cruiseSlug: string }>;

export default async function AddQuotePage(props: { params: Params }) {
  const params = await props.params;
  const cruiseSlug = parseInt(params.cruiseSlug);

  const cruise = (await getCruiseById(cruiseSlug)) as CruisePropsType;

  return (
    <>
      <QuoteForm cruise={cruise} />
    </>
  );
}
