import styles from './Pagination.module.scss';
import ReactPaginate from 'react-paginate';

const Pagination = ({onChangePage}: any) => {
    return (
        <ReactPaginate
        className={styles.root}
        breakLabel="..."
        nextLabel=">"
        onPageChange={(e) => {onChangePage(e.selected + 1)}}
        pageRangeDisplayed={4}
        pageCount={3}
        previousLabel="<"
      />
    )
}

export default Pagination;