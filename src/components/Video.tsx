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
    "w-full h-full": size === "large",
    "w-1/2 h-1/2": size === "medium",
    "w-1/4 h-1/4": size === "small",
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
