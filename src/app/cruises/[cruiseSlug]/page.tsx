export default function CruiseSlugPage({
  params,
}: {
  params: { cruiseSlug: string };
}) {
  const { cruiseSlug } = params;

  return <div>{cruiseSlug}</div>;
}
