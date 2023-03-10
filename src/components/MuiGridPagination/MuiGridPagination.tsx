import Pagination from '@mui/material/Pagination';
import {
    gridPageCountSelector,
    gridPageSelector,
    gridPaginationModelSelector,
    gridPaginationRowRangeSelector,
    useGridApiContext,
    useGridSelector
} from '@mui/x-data-grid';

const MuiGridPagination = () => {
    const apiRef = useGridApiContext();
    const nn = useGridSelector(apiRef, gridPaginationModelSelector);
    const nnn = useGridSelector(apiRef, gridPaginationRowRangeSelector);

    let pageCount: number = 1;
    console.log(nnn);
    if (nnn != undefined) {
        pageCount = nnn?.lastRowIndex / nn.pageSize;
    }
  
    return (
      <Pagination
        color="primary"
        count={pageCount}
        page={nn.page + 1}
        onChange={(event, value) => apiRef.current.setPage(value - 1)}
      />
    );
}

export default MuiGridPagination;