import { WeeklyBoxOfficeResponse } from '@/types/box-office';

export default async function getWeeklyBoxOffice() {
  const d = new Date();
  const day = d.getDay();
  const dayOfTheWeek = day === 0 ? 7 : day;

  d.setDate(d.getDate() - dayOfTheWeek);

  const lastSunday =
    d.getFullYear() +
    String(d.getMonth() + 1).padStart(2, '0') +
    String(d.getDate()).padStart(2, '0');

  const res = await fetch(
    `https://kobis.or.kr/kobisopenapi/webservice/rest/boxoffice/searchWeeklyBoxOfficeList.json?key=${process.env.KOBIS_KEY}&targetDt=${lastSunday}&weekGb=0`,
  );
  const data: WeeklyBoxOfficeResponse = await res.json();

  return {
    data,
  };
}
