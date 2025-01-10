import { DailyBoxOfficeResponse } from '@features/box-office/types/box-office.type';

export default async function getDailyBoxOffice() {
  const d = new Date();
  d.setDate(d.getDate() - 1);

  const targetDt =
    d.getFullYear() +
    String(d.getMonth() + 1).padStart(2, '0') +
    String(d.getDate()).padStart(2, '0');

  const res = await fetch(
    `https://kobis.or.kr/kobisopenapi/webservice/rest/boxoffice/searchDailyBoxOfficeList.json?key=${process.env.KOBIS_KEY}&targetDt=${targetDt}`,
  );

  const data: DailyBoxOfficeResponse = await res.json();

  return {
    data,
  };
}
