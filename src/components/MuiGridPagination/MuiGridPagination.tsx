import { FormControl, MenuItem, Select, SelectChangeEvent, Stack } from '@mui/material';
import Pagination from '@mui/material/Pagination';
import {
    gridPageSizeSelector,
    gridPaginationModelSelector,
    useGridApiContext,
    useGridSelector
} from '@mui/x-data-grid';
import React, { useEffect, useState } from 'react';
import { useAppSelector } from '../../app/hooks';
import { selectIngredientsCount } from '../Ingredients/ingredientSlice';

import './MuiGridPagination.css';

const MuiGridPagination = () => {
    const apiRef = useGridApiContext();
    const gridPaginationModel = useGridSelector(apiRef, gridPaginationModelSelector);
    const gridPageSize = useGridSelector(apiRef, gridPageSizeSelector);
    const ingredientsCount = useAppSelector(selectIngredientsCount);

    const [itemsPerPage, setItemsPerPage] = useState(10);
    
    const handlePaginationChange = (event: React.ChangeEvent<unknown>, value: number) => {
        apiRef.current.setPage(value - 1);
    }

    const handleSelectItemPerPageChange = (event: SelectChangeEvent<number>) => {
        let newItemsPerPage: number = event.target.value as number;

        apiRef.current.setPageSize(newItemsPerPage);
        setItemsPerPage(newItemsPerPage);
    }

    return (
        <Stack direction="row-reverse" spacing={1}>
            <Pagination
                color="primary"
                count={Math.ceil(ingredientsCount / gridPageSize)}
                page={gridPaginationModel.page + 1}
                onChange={handlePaginationChange}
                className="paginationPanel"
            />
            <FormControl
                sx={{ m: 1, minWidth: 60 }}
                size="small"
            >
                <Select
                    value={itemsPerPage}
                    onChange={handleSelectItemPerPageChange}
                    displayEmpty
                    inputProps={{ 'aria-label': 'Without label' }}
                >
                    <MenuItem value={10}>10</MenuItem>
                    <MenuItem value={20}>20</MenuItem>
                    <MenuItem value={30}>30</MenuItem>
                </Select>
            </FormControl>
        </Stack>
    );
}

export default MuiGridPagination;