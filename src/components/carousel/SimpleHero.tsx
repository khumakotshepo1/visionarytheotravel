export type simpleHeroType = {
  title: string;
  description: string;
  image: string;
};

export function SimpleHero({ title, description, image }: simpleHeroType) {
  return (
    <div
      className="flex justify-center items-end bg-fixed bg-cover bg-center bg-no-repeat h-[500px] sm:rounded-xl relative"
      style={{ backgroundImage: `url('${image}')` }}
    >
      <div className="flex flex-col items-center justify-center gap-4 p-8 text-center bg-background sm:rounded-t-xl">
        <h1 className="text-7xl font-anton">{title}</h1>
        <p className="text-3xl font-anton">{description}</p>
      </div>
    </div>
  );
}
