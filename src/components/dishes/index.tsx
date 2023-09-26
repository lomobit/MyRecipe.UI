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
import {skeletonCardArray} from "./constants";
import DishesGridCardSkeleton from "./dishGridCardSkeleton";

const Dishes = () => {

    // appSelectors
    const dishesSlice = useAppSelector(selectDishesSlice);
    const dishesCount = useAppSelector(selectDishesCount);
    const gridPageSize = useAppSelector(selectDishGridPageSize);
    const loading = useAppSelector(isLoadingDishesPage);
    const dispatch = useAppDispatch();

    // dishDialog
    const [openDialog, setOpenDialog] = useState(false);
    const [openingDishId, setOpeningDishId] = useState<number | undefined>(undefined);

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
        (async () => {
            let getDishesQuery = new GetIngredientsPageAsyncQuery(
                paginationModel.page + 1,
                paginationModel.pageSize,
                SortingOrderEnum.Ascending,
                SortingFieldEnum.Id,
                nameFilter.current);
            await dispatch(getDishesPageAsync(getDishesQuery));
        })();
    }

    const handleDishAdding = () => {
        if (openingDishId !== undefined) {
            setOpeningDishId(undefined);

        }
        
        setOpenDialog(true);
    }

    const handleDishOpening = (id: number) => {
        setOpeningDishId(id);
        setOpenDialog(true);
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
                        onClick={handleDishAdding}
                    >
                        Добавить
                    </Button>
                </Stack>
            </div>

            <DishesDialog
                openDialog={openDialog}
                setOpenDialog={setOpenDialog}

                dishId={openingDishId}
            />

            <Grid
                container
                justifyContent="flex-start"
                spacing={3}
                style={{marginBottom: 20}}
            >
                {
                    loading
                        ? (
                            skeletonCardArray.map((id) => (
                                <DishesGridCardSkeleton id={id} />
                            ))
                        )
                        : (
                            dishesSlice.map((dish) => (
                                <DishesGridCard
                                    id={dish.id}
                                    name={dish.name}
                                    numberOfPersons={dish.numberOfPersons}
                                    dishPhotoGuid={dish.dishPhotoGuid}
                                    onClick={() => handleDishOpening(dish.id)}
                                />
                            ))
                        )
                }
            </Grid>

            <MuiGridCardsPagination/>
        </Fragment>
    );
}

export default Dishes;
