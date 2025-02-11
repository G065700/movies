import {
  BoxOfficeMovieForView,
  KobisBoxOfficeItem,
} from '@/types/box-office/box-office';
import { getBoxOfficeMovie } from '@actions/box-office/movie/getBoxOfficeMovie';
import BoxOfficeSwiper from '@components/box-office/box-office-swiper/BoxOfficeSwiper';

export default BoxOfficeSectionContent;

interface BoxOfficeSectionContentProps {
  data: {
    boxOfficeList: KobisBoxOfficeItem[];
  };
}

async function BoxOfficeSectionContent({ data }: BoxOfficeSectionContentProps) {
  const { boxOfficeList } = data;

  const boxOfficeListData = await getBoxOfficeListData(boxOfficeList);

  return <BoxOfficeSwiper data={{ boxOfficeList: boxOfficeListData }} />;
}

async function getBoxOfficeListData(boxOfficeListData: KobisBoxOfficeItem[]) {
  const boxOfficeList: BoxOfficeMovieForView[] = [];

  for (const boxOfficeItemData of boxOfficeListData) {
    const movieCd = boxOfficeItemData.movieCd;

    const {
      data: { kobis, kmdb },
    } = await getBoxOfficeMovie(movieCd);

    let directors = kobis.directors.map((director) => director.peopleNm);

    if (directors.length === 0 && kmdb) {
      directors = kmdb.directors.director.map(
        (director) => director.directorNm,
      );
    }

    const genres = kobis.genres.map((genre) => genre.genreNm);
    const audit = kobis.audits.map((audit) => audit.watchGradeNm);
    const posters = kmdb?.posters;

    boxOfficeList.push({
      summary: {
        rank: boxOfficeItemData.rank,
        poster: posters ? posters.split('|')[0] : '/poster.png',
        movieCd: boxOfficeItemData.movieCd,
        movieSeq: kmdb?.movieSeq,
        movieNm: boxOfficeItemData.movieNm,
        genre: genres.join(' | '),
        director: `${directors[0]} ${directors.length > 1 ? `외 ${directors.length - 1} 명` : ''}`,
        audit: audit.join(' | '),
        openDt: boxOfficeItemData.openDt,
        audiAcc: boxOfficeItemData.audiAcc,
        salesAcc: boxOfficeItemData.salesAcc,
      },
      detail: kmdb,
    });
  }

  return boxOfficeList;
}
