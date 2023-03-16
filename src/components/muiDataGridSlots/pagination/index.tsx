import { FormControl, MenuItem, Select, SelectChangeEvent, Stack } from '@mui/material';
import Pagination from '@mui/material/Pagination';
import {
    gridPageSizeSelector,
    gridPaginationModelSelector,
    gridRowCountSelector,
    useGridApiContext,
    useGridSelector
} from '@mui/x-data-grid';
import { ChangeEvent } from 'react';

import './index.css';

const MuiDataGridPagination = () => {
    const apiRef = useGridApiContext();
    const gridPaginationModel = useGridSelector(apiRef, gridPaginationModelSelector);
    const gridPageSize = useGridSelector(apiRef, gridPageSizeSelector);
    const gridRowCount = useGridSelector(apiRef, gridRowCountSelector);

    const handlePaginationChange = (event: ChangeEvent<unknown>, value: number) => {
        apiRef.current.setPage(value - 1);
    }

    const handleSelectItemPerPageChange = (event: SelectChangeEvent<number>) => {
        let newItemsPerPage: number = event.target.value as number;

        apiRef.current.setPageSize(newItemsPerPage);
    }

    return (
        <Stack direction="row-reverse" spacing={1}>
            <Pagination
                color="primary"
                count={Math.ceil(gridRowCount / gridPageSize)}
                page={gridPaginationModel.page + 1}
                onChange={handlePaginationChange}
                className="paginationPanel"
            />
            <FormControl
                sx={{ m: 1, minWidth: 60 }}
                size="small"
            >
                <Select
                    value={gridPageSize}
                    onChange={handleSelectItemPerPageChange}
                    displayEmpty
                    inputProps={{ 'aria-label': 'Количество элементов' }}
                >
                    <MenuItem value={10}>10</MenuItem>
                    <MenuItem value={20}>20</MenuItem>
                    <MenuItem value={30}>30</MenuItem>
                </Select>
            </FormControl>
        </Stack>
    );
}

export default MuiDataGridPagination;