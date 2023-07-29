import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import './index.css';
import {
    Backdrop,
    Button,
    CardActionArea, CircularProgress,
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
import {selectDishesSlice, selectDishesCount, selectDishGridPageSize} from "../../store/dishes/reducers";
import {SortingOrderEnum} from "../../contracts/common/enums/SortingOrderEnum";
import {SortingFieldEnum} from "../../contracts/ingredients/enums/SortingFieldEnum";

const Dishes = () => {

    // appSelectors
    const dishesSlice = useAppSelector(selectDishesSlice);
    const dishesCount = useAppSelector(selectDishesCount);
    const gridPageSize = useAppSelector(selectDishGridPageSize);
    const dispatch = useAppDispatch();

    // dishDialog
    const [openDialog, setOpenDialog] = useState(false);

    //cardsGrid
    const nameFilter = useRef<string>();

    const [loading, setLoading] = useState(false);
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
            setLoading(true);

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

            setLoading(false);
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
                <Backdrop
                    open={loading}
                    sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                >
                    <CircularProgress color="inherit" />
                </Backdrop>

                {
                    dishesSlice.map((dish) => (
                        <Grid key={dish.id} item>
                            <Card
                                sx={{
                                    width: 217
                                }}
                                onClick={() => alert(`${dish.name}`)}
                            >
                                <CardActionArea>
                                    <CardMedia
                                        component="img"
                                        height={200}
                                        draggable={false}
                                        image={`${process.env.REACT_APP_API_URL}/File/${dish.dishPhotoGuid}`}
                                        alt={`Фото ${dish.name}`}
                                    />
                                    <CardContent>
                                        <Typography gutterBottom variant="h5" component="div">
                                            {dish.name}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            Количество персон: {dish.numberOfPersons}
                                        </Typography>
                                    </CardContent>
                                </CardActionArea>
                            </Card>
                        </Grid>
                    ))
                }
            </Grid>

            <MuiGridCardsPagination/>

        </Fragment>
    );
}

export default Dishes;
