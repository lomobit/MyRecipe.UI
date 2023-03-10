import Pagination from '@mui/material/Pagination';
import {
    gridPageSizeSelector,
    gridPaginationModelSelector,
    useGridApiContext,
    useGridSelector
} from '@mui/x-data-grid';
import { useAppSelector } from '../../app/hooks';
import { selectIngredients } from '../Ingredients/ingredientSlice';

const MuiGridPagination = () => {
    const apiRef = useGridApiContext();
    const gridPaginationModel = useGridSelector(apiRef, gridPaginationModelSelector);
    const gridPageSize = useGridSelector(apiRef, gridPageSizeSelector);
    const ingredients = useAppSelector(selectIngredients);
    let count = Math.ceil(ingredients.count / gridPageSize);
  
    return (
      <Pagination
        color="primary"
        count={count}
        page={gridPaginationModel.page + 1}
        onChange={(event, value) => apiRef.current.setPage(value - 1)}
      />
    );
}

export default MuiGridPagination;