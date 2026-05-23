import { MetaInfo } from "../../../Components/MetaInfo";
import { useImageProxy } from "../../../utils/image-proxy";

type AnimeInfoProps = {
  anime: App.DTOs.AnimeData;
};

const AnimeInfo = ({ anime }: AnimeInfoProps) => {
  const { proxyImage } = useImageProxy();

  const coverImage = proxyImage(
    anime.images?.webp?.image_url || anime.images?.jpg?.image_url,
  );

  return (
    <section id="anime-detail" className="flex flex-col">
      <div className="mt-2 mb-5 flex justify-center">
        <img
          src={coverImage}
          alt="cover anime image"
          className="bg-surface aspect-3/4 w-full max-w-60 rounded-xl object-cover shadow-sm"
        />
      </div>
      <MetaInfo label="Rating" value={anime.rating} />
      <MetaInfo label="Themes" items={anime.themes} />
      <MetaInfo label="Demographics" items={anime.demographics} />
    </section>
  );
};

export default AnimeInfo;
