import {FormControl, MenuItem, Select, SelectChangeEvent, Stack} from "@mui/material";
import Pagination from "@mui/material/Pagination";
import * as React from "react";
import { ReactNode } from "react";

type PageSize = 9 | 12 | 15;

export declare interface MuiGridCardsPaginationProps {
    currentPage: number;
    totalPages: number;
    pageSize: PageSize;

    onPageChange: () => void;
    onPageSizeChange: () => void;
}

const MuiGridCardsPagination = (props: MuiGridCardsPaginationProps) => {

    const handlePaginationChange = (event: React.ChangeEvent<unknown>, page: number) => {
        props.onPageChange();
    }

    const handleSelectItemPerPageChange = (event: SelectChangeEvent<PageSize>, child?: ReactNode) => {
        props.onPageSizeChange();
    }

    return (
        <Stack direction="row-reverse" spacing={1} style={{marginBottom: 10}}>
            <Pagination
                color="primary"
                count={props.totalPages}
                page={props.currentPage}
                onChange={handlePaginationChange}
                className="paginationPanel"
            />
            <FormControl
                sx={{ m: 1, minWidth: 60 }}
                size="small"
            >
                <Select
                    value={props.pageSize}
                    onChange={handleSelectItemPerPageChange}
                    displayEmpty
                    inputProps={{ 'aria-label': 'Количество элементов' }}
                >
                    <MenuItem value={9}>9</MenuItem>
                    <MenuItem value={12}>12</MenuItem>
                    <MenuItem value={15}>15</MenuItem>
                </Select>
            </FormControl>
        </Stack>
    );
}

export default MuiGridCardsPagination;