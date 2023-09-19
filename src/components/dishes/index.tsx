import Grid from '@mui/material/Grid';
import './index.css';
import {
    Button,
    IconButton,
    Stack,
    TextField
} from '@mui/material';
import UpdateIcon from "@mui/icons-material/Update";
import AddIcon from "@mui/icons-material/Add";
import {Fragment, useEffect, useRef, useState} from "react";
import DishesDialog from "./dishDialog";
import MuiGridCardsPagination from "../paginations/mui-grid-cards-pagination";
import {GetIngredientsPageAsyncQuery} from "../../contracts/ingredients/queries/GetIngredientsPageAsyncQuery";
import {useAppDispatch, useAppSelector} from "../../store/hooks";
import { getDishesPageAsync } from '../../store/dishes/thunks';
import {GridPaginationModel} from "@mui/x-data-grid";
import {
    selectDishesSlice,
    selectDishesCount,
    selectDishGridPageSize,
    isLoadingDishesPage
} from "../../store/dishes/reducers";
import {SortingOrderEnum} from "../../contracts/common/enums/SortingOrderEnum";
import {SortingFieldEnum} from "../../contracts/ingredients/enums/SortingFieldEnum";
import DishesGridCard from "./dishGridCard";

const Dishes = () => {

    // appSelectors
    const dishesSlice = useAppSelector(selectDishesSlice);
    const dishesCount = useAppSelector(selectDishesCount);
    const gridPageSize = useAppSelector(selectDishGridPageSize);
    const loading = useAppSelector(isLoadingDishesPage);
    const dispatch = useAppDispatch();

    // dishDialog
    const [openDialog, setOpenDialog] = useState(false);

    //cardsGrid
    const nameFilter = useRef<string>();

    const [paginationModel, setPaginationModel] = useState<GridPaginationModel>({
        page: 0,
        pageSize: gridPageSize
    });

    useEffect(() => {
        updateDishes();
    }, [paginationModel]);

    const updateDishes = () => {
        let active = true;

        (async () => {
            let getDishesQuery = new GetIngredientsPageAsyncQuery(
                paginationModel.page + 1,
                paginationModel.pageSize,
                SortingOrderEnum.Ascending,
                SortingFieldEnum.Id,
                nameFilter.current);
            await dispatch(getDishesPageAsync(getDishesQuery));

            if (!active) {
                return;
            }
        })();

        return () => {
            active = false;
        };
    }

    return (
        <Fragment>
            <h1>Блюда</h1>
            {/* TODO: блок кнопок для блюд повторяет блок кнопок для ингредиентов. Подумать на тем, нужно ли это вынести в отдельный компонент. */}
            <div className="dishesButtons">
                <Stack direction="row" spacing={1} className="nameFilteringButtons">
                    <TextField
                        label="Поиск по названию"
                        variant="outlined"
                        size="small"
                        //value={""}
                        //onChange={onChangeNameFilter}
                    />
                    <IconButton
                        aria-label="update"
                        color="primary"
                        //onClick={handleClickUpdateButton}
                    >
                        <UpdateIcon />
                    </IconButton>
                </Stack>
                <Stack className="addEditButtons">
                    <Button
                        variant="contained"
                        startIcon={<AddIcon />}
                        onClick={() => setOpenDialog(true)}
                    >
                        Добавить
                    </Button>
                </Stack>
            </div>

            <DishesDialog
                openDialog={openDialog}
                setOpenDialog={setOpenDialog}
            />

            <Grid
                container
                justifyContent="flex-start"
                spacing={3}
                style={{marginBottom: 20}}
            >
                { loading && "Я загружаюсь!!!!!!" }
                {
                    dishesSlice.map((dish) => (
                        <DishesGridCard
                            id={dish.id}
                            name={dish.name}
                            numberOfPersons={dish.numberOfPersons}
                            dishPhotoGuid={dish.dishPhotoGuid}
                        />
                    ))
                }
            </Grid>

            <MuiGridCardsPagination/>

        </Fragment>
    );
}

export default Dishes;
