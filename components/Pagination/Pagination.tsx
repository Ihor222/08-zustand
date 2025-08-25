import css from "./Pagination.module.css";
import ReactPaginate from "react-paginate";

interface PaginationProps {
  totalNumberOfPages: number;
  currentActivePage: number;
  setPage: (pageNumber: number) => void;
}

export default function Pagination({
  totalNumberOfPages,
  currentActivePage,
  setPage,
}: PaginationProps) {
  const handlePageClick = (event: { selected: number }) => {
    // selected індексує з 0, тому додаємо 1
    setPage(event.selected + 1);
  };

  return (
    <ReactPaginate
      pageCount={totalNumberOfPages}
      pageRangeDisplayed={4}
      marginPagesDisplayed={1}
      previousLabel={"←"}
      nextLabel={"→"}
      breakLabel={"..."}
      onPageChange={handlePageClick}
      forcePage={currentActivePage - 1}
      containerClassName={css.pagination}
      activeClassName={css.active}
      previousClassName={css.prevBtn}
      nextClassName={css.nextBtn}
      disabledClassName={css.disabledBtn}
      breakClassName={css.break}
    />
  );
}
