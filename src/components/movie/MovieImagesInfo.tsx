import { MovieResponseDataResultForImagesInfo } from '@/types/movie';
import Image from 'next/image';
import Link from 'next/link';
import DataRow from '@shared/data/DataRow';
import Data from '@shared/data/Data';

export default MovieImagesInfo;

interface MovieImagesInfoProps {
  data: {
    images: MovieResponseDataResultForImagesInfo;
  };
}

function MovieImagesInfo({ data }: MovieImagesInfoProps) {
  const {
    images: { stills, posters },
  } = data;

  if (!stills && !posters) {
    return null;
  }

  return (
    <div className="flex flex-col gap-1">
      <div className="text-lg font-black">이미지</div>
      {posters && (
        <DataRow>
          <Data
            title="포스터"
            contentClassName="overflow-x-auto gap-1"
            content={posters.map((posterSrc) => (
              <Link href={posterSrc} target="_blank" key={posterSrc}>
                <Image
                  width={400}
                  height={550}
                  src={posterSrc}
                  alt="poster"
                  className="rounded-lg max-h-[550px] cursor-pointer"
                  quality={100}
                />
              </Link>
            ))}
          />
        </DataRow>
      )}

      {stills && (
        <DataRow>
          <Data
            title="스틸"
            contentClassName="overflow-x-auto gap-1"
            content={stills.map((stillSrc) => (
              <Link href={stillSrc} target="_blank" key={stillSrc}>
                <Image
                  width={400}
                  height={550}
                  src={stillSrc}
                  alt="poster"
                  className="rounded-lg max-h-[550px] cursor-pointer"
                  quality={100}
                />
              </Link>
            ))}
          />
        </DataRow>
      )}
    </div>
  );
}
