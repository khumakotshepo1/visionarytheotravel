import { homeHeroApi } from "@/components/_home/home-hero-api";
import { homeVideoApi } from "@/components/_home/home-video-api";
import { Carousel } from "@/components/carousel/Carousel";
import Video from "@/components/Video";

export default function HomePage() {
  return (
    <>
      <section>
        <Carousel slides={homeHeroApi} />
      </section>
      <section className="w-full py-12 flex justify-center items-center gap-3">
        {homeVideoApi.map((video) => (
          <Video
            key={video.video}
            video={video.video}
            autoPlay={video.autoPlay}
            loop={video.loop}
            muted={video.muted}
            size={video.size}
          />
        ))}
      </section>
    </>
  );
}
