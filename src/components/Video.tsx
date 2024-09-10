import { cn } from "@/lib/utils";

export type videoType = {
  video: string;
  size: string;
  autoPlay: boolean;
  loop: boolean;
  muted: boolean;
};

export default function Video({
  video,
  size,
  autoPlay,
  loop,
  muted,
}: videoType) {
  const videoClass = cn({
    "md:w-full md:h-full": size === "large",
    "md:w-1/2 md:h-1/2": size === "medium",
    "w-[300px] h-[150px]": size === "small",
  });

  return (
    <video
      src={video}
      autoPlay={autoPlay}
      loop={loop}
      muted={muted}
      className={`object-cover ${videoClass}`}
    />
  );
}
