import { MovieResponseDataResultForDefaultInfo } from '@/types/movies/movie';
import DataRow from '@shared/data/DataRow';
import Data from '@shared/data/Data';

export default MovieDefaultInfo;

interface MovieDefaultInfoProps {
  data: {
    defaultInfo: MovieResponseDataResultForDefaultInfo;
  };
}

function MovieDefaultInfo({ data }: MovieDefaultInfoProps) {
  const { defaultInfo } = data;

  return (
    <div className="flex flex-col gap-1">
      <div className="text-lg font-black">기본 정보</div>
      <DataRow>
        <Data title="영화명" content={defaultInfo.title} />
      </DataRow>
      {(defaultInfo.genre || defaultInfo.rating) && (
        <DataRow>
          <Data title="장르" content={defaultInfo.genre} />
          <Data title="등급" content={defaultInfo.rating} />
        </DataRow>
      )}
      {(defaultInfo.repRlsDate || defaultInfo.runtime) && (
        <DataRow>
          <Data title="개봉일" content={defaultInfo.repRlsDate} />
          <Data
            title="상영시간"
            content={`${defaultInfo.runtime ? `${defaultInfo.runtime} 분` : ''}`}
          />
        </DataRow>
      )}
      {defaultInfo.keywords && (
        <DataRow>
          <Data title="키워드" content={defaultInfo.keywords} />
        </DataRow>
      )}
      {defaultInfo.plot[0].plotText && (
        <DataRow>
          <Data title="줄거리" content={defaultInfo.plot[0].plotText} />
        </DataRow>
      )}
      {defaultInfo.nation && (
        <DataRow>
          <Data title="제작국가" content={defaultInfo.nation} />
        </DataRow>
      )}
    </div>
  );
}
