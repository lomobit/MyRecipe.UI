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
import {ChangeEvent, Fragment, useEffect, useRef, useState} from "react";
import DishesDialog from "./dishDialog";
import MuiGridCardsPagination from "../paginations/mui-grid-cards-pagination";
import {GetIngredientsPageAsyncQuery} from "../../contracts/ingredients/queries/GetIngredientsPageAsyncQuery";
import {useAppDispatch, useAppSelector} from "../../store/hooks";
import { getDishesPageAsync } from '../../store/dishes/thunks';
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
import {CustomGridPaginationModel} from "../../contracts/common/interfaces/CustomGridPaginationModel";
import {PageSize} from "../../contracts/common/types/PageSize";

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
    const [nameFilter, setNameFilter] = useState<string>("");
    const [paginationModel, setPaginationModel] = useState<CustomGridPaginationModel>({
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
                nameFilter);
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

    const handleSetOpenDialog = (open: boolean) => {
        setOpeningDishId(undefined);
        setOpenDialog(open);
    }

    const onSaveDish = () => {
        updateDishes();
    }

    const onChangeNameFilter = (event: ChangeEvent<HTMLInputElement>) => {
        setNameFilter(event.target.value);
    }

    const handleClickUpdateButton = () => {
        setPaginationModel({...paginationModel, page: 0});
    }

    const handlePageChange = (page: number) => {
        setPaginationModel({...paginationModel, page: page - 1});
    }

    const handlePageSizeChange = (pageSize: PageSize) => {
        let currentPage = paginationModel.page + 1;
        let totalPages = getTotalPagesForPagination(dishesCount, pageSize);
        if (currentPage > totalPages) {
            currentPage = totalPages;
        }

        setPaginationModel({page: currentPage - 1, pageSize: pageSize});
    }

    const getTotalPagesForPagination = (count: number, pageSize: PageSize) => {
        return Math.ceil(count / pageSize);
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
                        value={nameFilter}
                        onChange={onChangeNameFilter}
                    />
                    <IconButton
                        aria-label="update"
                        color="primary"
                        onClick={handleClickUpdateButton}
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
                setOpenDialog={handleSetOpenDialog}
                onSave={onSaveDish}
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
                            skeletonCardArray.map((id, index) => (
                                <DishesGridCardSkeleton id={id} key={id}/>
                            ))
                        )
                        : (
                            dishesSlice.map((dish) => (
                                <DishesGridCard
                                    id={dish.id}
                                    key={dish.id}
                                    name={dish.name}
                                    numberOfPersons={dish.numberOfPersons}
                                    dishPhotoGuid={dish.dishPhotoGuid}
                                    onClick={() => handleDishOpening(dish.id)}
                                />
                            ))
                        )
                }
            </Grid>

            <MuiGridCardsPagination
                currentPage={paginationModel.page + 1}
                totalPages={getTotalPagesForPagination(dishesCount, paginationModel.pageSize)}
                pageSize={paginationModel.pageSize}

                onPageChange={handlePageChange}
                onPageSizeChange={handlePageSizeChange}
            />
        </Fragment>
    );
}

export default Dishes;
