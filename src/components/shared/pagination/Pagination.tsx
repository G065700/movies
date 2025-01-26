export default Pagination;

interface PaginationProps {
  data: {
    selectedPage: number;
    countPerPage: number;
    totalCount: number;
  };
  handler: {
    handlePage: (page: number) => void;
  };
}

// 페이지 번호 목록을 10개씩 끊어서 보여준다.
// [[1,2,3,4,6,7,8,9,10],[11,12,13,...,20],...]
const pageGroupLen = 10;

function Pagination({ data, handler }: PaginationProps) {
  const { selectedPage, countPerPage, totalCount } = data;
  const { handlePage } = handler;

  const lastPageNum = Math.ceil(totalCount / countPerPage); // 마지막 페이지 번호
  const totalPageArrCount = Math.ceil(lastPageNum / pageGroupLen); // 페이지 번호 묶음 수

  const pages: number[] = []; // 페이지 번호 배열 [1, 2, 3, .... 50]
  for (let page = 1; page <= lastPageNum; page++) {
    pages.push(page);
  }

  const pageGroups: number[][] = [];
  if (pages.length < pageGroupLen) {
    pageGroups.push(pages);
  }

  for (let page = pages[0]; page <= pages[pages.length - 1]; page++) {
    if (page % pageGroupLen === 0) {
      const pageGroup: number[] = [];
      for (let z = page - (pageGroupLen - 1); z <= page; z++) {
        pageGroup.push(z);
      }
      pageGroups.push(pageGroup);
    }
  }

  if (totalPageArrCount > pageGroups.length) {
    if (totalPageArrCount === 1) {
      pageGroups.push([1]);
    } else {
      const lastItem: number[] = [];
      for (
        let i = pageGroups[pageGroups.length - 1][pageGroupLen - 1] + 1;
        i <= pages[pages.length - 1];
        i++
      ) {
        lastItem.push(i);
      }
      pageGroups.push(lastItem);
    }
  }

  const targetPageGroup = pageGroups.find((pageGroup) =>
    pageGroup.includes(selectedPage),
  );

  const selectedPageGroup = targetPageGroup
    ? pageGroups.indexOf(targetPageGroup)
    : 0;

  return (
    <section className="flex justify-center gap-1">
      {selectedPageGroup > 0 && (
        <button
          className="px-1 hover:font-bold"
          onClick={() => handlePage(pageGroups[selectedPageGroup - 1][0])}
        >
          {'<'}
        </button>
      )}
      {pageGroups.length &&
        pageGroups[selectedPageGroup].map((pageNum) => (
          <button
            key={pageNum}
            className={`px-1 hover:font-bold ${selectedPage === pageNum ? 'text-red-500' : ''}`}
            onClick={() => {
              handlePage(pageNum);
            }}
          >
            {pageNum}
          </button>
        ))}
      {selectedPageGroup < pageGroups.length - 1 && (
        <button
          className="px-1 hover:font-bold"
          onClick={() => handlePage(pageGroups[selectedPageGroup + 1][0])}
        >
          {'>'}
        </button>
      )}
    </section>
  );
}
