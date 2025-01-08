import Container from '@components/container/Container';
import SearchFilter from '@features/movies/components/SearchFilter';

export default Movies;

async function Movies() {
  return (
    <Container>
      <SearchFilter />
    </Container>
  );
}
