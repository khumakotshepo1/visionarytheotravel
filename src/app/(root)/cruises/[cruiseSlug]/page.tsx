import { CruiseSlug } from "@/components/_cruises/CruiseSlug";
import { getCruiseById } from "@/server/cruises.server";

export default async function CruiseSlugPage({
  params,
}: {
  params: { cruiseSlug: string };
}) {
  const cruiseSlug = Number(params.cruiseSlug);

  const cruise = (await getCruiseById(cruiseSlug)) as CruisePropsType;

  return (
    <>
      <CruiseSlug cruise={cruise} />
    </>
  );
}
