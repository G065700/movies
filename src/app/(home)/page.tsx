import Container from '@shared/container/Container';
import DailyBoxOffice from '@components/box-office/DailyBoxOffice';
import WeeklyBoxOffice from '@components/box-office/WeeklyBoxOffice';
import Spacing40 from '@shared/spacing/Spacing-40';

export default async function BoxOfficePage() {
  return (
    <Container>
      <DailyBoxOffice />
      <Spacing40 />
      <WeeklyBoxOffice />
    </Container>
  );
}
