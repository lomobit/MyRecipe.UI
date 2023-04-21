import {FormControl, MenuItem, Select, Stack} from "@mui/material";
import Pagination from "@mui/material/Pagination";

const MuiGridCardsPagination = () => {
    return (
        <Stack direction="row-reverse" spacing={1}>
            <Pagination
                color="primary"
                count={10}
                page={1}
                //onChange={handlePaginationChange}
                className="paginationPanel"
            />
            <FormControl
                sx={{ m: 1, minWidth: 60 }}
                size="small"
            >
                <Select
                    value={9}
                    //onChange={handleSelectItemPerPageChange}
                    displayEmpty
                    inputProps={{ 'aria-label': 'Количество элементов' }}
                >
                    <MenuItem value={9}>9</MenuItem>
                    <MenuItem value={18}>18</MenuItem>
                    <MenuItem value={27}>27</MenuItem>
                </Select>
            </FormControl>
        </Stack>
    );
}

export default MuiGridCardsPagination;