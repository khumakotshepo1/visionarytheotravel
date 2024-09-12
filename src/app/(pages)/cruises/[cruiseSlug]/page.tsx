import { CruiseSlug } from "@/components/_cruises/CruiseSlug";

export default function CruiseSlugPage({
  params,
}: {
  params: { cruiseSlug: string };
}) {
  const { cruiseSlug } = params;

  console.log({ cruiseSlug });

  return (
    <>
      <CruiseSlug />
    </>
  );
}
