import Container from '@shared/container/Container';
import Spacing40 from '@shared/spacing/Spacing-40';
import BoxOfficeByPeriod from '@components/box-office/BoxOfficeByPeriod';
import { BoxOfficeListForView } from '@/types/box-office';

export default BoxOffice;

interface BoxOfficeProps {
  data: {
    daily: BoxOfficeListForView;
    weekly: BoxOfficeListForView;
  };
}

function BoxOffice({ data }: BoxOfficeProps) {
  const { daily, weekly } = data;

  return (
    <Container>
      <BoxOfficeByPeriod data={daily} />
      <Spacing40 />
      <BoxOfficeByPeriod data={weekly} />
    </Container>
  );
}
