import styles from './Pagination.module.scss';
import ReactPaginate from 'react-paginate';

type PaginationProps = {
  currentPage: number;
  onChangePage: (page: number) => void;
};

const Pagination: React.FC<PaginationProps> = ({ currentPage, onChangePage }) => {
  return (
    <ReactPaginate
      className={styles.root}
      breakLabel="..."
      previousLabel="<"
      nextLabel=">"
      onPageChange={(e) => {
        onChangePage(e.selected + 1);
      }}
      forcePage={currentPage - 1}
      pageRangeDisplayed={4}
      pageCount={3}
    />
  );
};

export default Pagination;
