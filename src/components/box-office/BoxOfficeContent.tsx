import {
  BoxOfficeMovieDetailForView,
  BoxOfficeMovieForView,
  BoxOfficeMovieSummaryForView,
  KobisBoxOfficeItem,
} from '@/types/box-office/box-office';
import { getBoxOfficeMovie } from '@actions/box-office/movie/getBoxOfficeMovie';
import BoxOfficeMovies from '@components/box-office/BoxOfficeMovies';

export default BoxOfficeContent;

interface BoxOfficeSectionContentProps {
  data: {
    boxOfficeList: KobisBoxOfficeItem[];
  };
}

async function BoxOfficeContent({ data }: BoxOfficeSectionContentProps) {
  const { boxOfficeList } = data;

  const boxOfficeListData = await getBoxOfficeListData(boxOfficeList);

  return (
    <section className="h-[calc(100%_-_52px)] sm:flex sm:flex-col sm:gap-[10px]">
      <BoxOfficeMovies data={{ boxOfficeList: boxOfficeListData }} />
    </section>
  );
}

const regEx = / !HS | !HE /g;

async function getBoxOfficeListData(boxOfficeListData: KobisBoxOfficeItem[]) {
  const boxOfficeList: BoxOfficeMovieForView[] = [];

  for (const boxOfficeItemData of boxOfficeListData) {
    const movieCd = boxOfficeItemData.movieCd;

    const {
      data: { kobis, kmdb },
    } = await getBoxOfficeMovie(movieCd);

    const posters = kmdb && kmdb.posters ? kmdb.posters.split('|') : [];

    let directors: string[] = [];

    if (kobis && kobis.directors && kobis.directors.length) {
      directors = kobis.directors.map((director) => director.peopleNm);
    } else if (
      kmdb &&
      kmdb.directors &&
      kmdb.directors.director &&
      kmdb.directors.director.length
    ) {
      directors = kmdb.directors.director.map((director) =>
        director.directorNm.replaceAll(regEx, ''),
      );
    }

    let genres: string = '-';
    if (kobis && kobis.genres && kobis.genres.length) {
      genres = kobis.genres.map((genre) => genre.genreNm).join(' | ');
    } else if (kmdb && kmdb.genre) {
      genres = kmdb.genre.replaceAll(',', ' | ');
    }

    const audit: string =
      kobis && kobis.audits && kobis.audits.length
        ? kobis.audits.map((audit) => audit.watchGradeNm)[0]
        : '-';

    let runtime: string = '-';
    if (kobis && kobis.showTm) {
      runtime = kobis.showTm + ' 분';
    } else if (kmdb && kmdb.runtime) {
      genres = kmdb.runtime + ' 분';
    }

    let nations: string = '-';
    if (kobis && kobis.nations && kobis.nations.length) {
      nations = kobis.nations.map((nation) => nation.nationNm).join(' | ');
    } else if (kmdb && kmdb.nation) {
      nations = kmdb.nation.replaceAll(',', ' | ');
    }

    const summary: BoxOfficeMovieSummaryForView = {
      rank: boxOfficeItemData.rank, // 해당일자의 박스오피스 순위
      rankInten: Number(boxOfficeItemData.rankInten), // 전일대비 순위의 증감분
      rankOldAndNew: boxOfficeItemData.rankOldAndNew, // 랭킹에 신규진입여부 (“OLD” : 기존 , “NEW” : 신규)
      kobisMovieCd: boxOfficeItemData.movieCd, // 영화의 대표코드
      poster: posters[0] || '/poster.png', // 대표 포스터
      movieNm: boxOfficeItemData.movieNm, // 영화명
      director: `${directors[0]} ${directors.length > 1 ? `외 ${directors.length - 1} 명` : ''}`, // 감독 (2명 이상일 경우 '외 N명')
      genres, // 장르
      audit, // 관람등급
      openDt: boxOfficeItemData.openDt, // 개봉일
      runtime, // 상영시간
      nations, // 제작국가
      audiAcc: boxOfficeItemData.audiAcc, // 누적관객수
      salesAcc: boxOfficeItemData.salesAcc, // 누적매출액
    };

    const detail: BoxOfficeMovieDetailForView = {
      ...summary,
      DOCID: kmdb ? kmdb.DOCID : '',
      awards: kmdb ? kmdb.Awards1.split('|').filter((award) => award) : [],
      keywords: kmdb ? kmdb.keywords.split(',').join(' | ') : '',
      plotText: kmdb ? kmdb.plots.plot[0].plotText : '',
      staffs: kmdb ? kmdb.staffs : { staff: [] },
      posters,
      stlls: kmdb ? kmdb.stlls.split('|') : [],
    };

    boxOfficeList.push({
      summary,
      detail,
    });
  }

  return boxOfficeList;
}
