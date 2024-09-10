export type youtubeVideoType = {
  video: string;
  title: string;
  width: string;
  height: string;
};

export function YoutubeVideo({
  video,
  title,
  width,
  height,
}: youtubeVideoType) {
  return (
    <iframe
      width={width}
      height={height}
      src={video}
      title={title}
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
    />
  );
}
