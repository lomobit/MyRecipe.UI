import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Pagination from '@mui/material/Pagination';
import './index.css';
import {
    Button,
    CardActionArea,
    FormControl,
    IconButton,
    MenuItem,
    Select,
    Stack,
    TextField
} from '@mui/material';
import { mockDishes } from "./constants";
import UpdateIcon from "@mui/icons-material/Update";
import AddIcon from "@mui/icons-material/Add";
import {Fragment, useState} from "react";
import DishesDialog from "./dishDialog";
import MuiGridCardsPagination from "../paginations/mui-grid-cards-pagination";

const Dishes = () => {

    const [openDialog, setOpenDialog] = useState(false);


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

            <Grid container justifyContent="flex-start" spacing={3} style={{marginBottom: 20}}>
                {
                    mockDishes.map((dish) => (
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
                                        width="100%"
                                        height={140}
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
