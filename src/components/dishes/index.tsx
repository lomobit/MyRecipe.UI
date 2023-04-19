import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Pagination from '@mui/material/Pagination';
import './index.css';
import {Button, CardActionArea, FormControl, IconButton, MenuItem, Select, Stack, TextField} from '@mui/material';
import { mockDishes } from "./constants";
import UpdateIcon from "@mui/icons-material/Update";
import AddIcon from "@mui/icons-material/Add";

const Dishes = () => {



    return (
        <div className="dishes">
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
                        aria-label="delete"
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
                        //onClick={handleClickAddButton}
                    >
                        Добавить
                    </Button>
                </Stack>
            </div>
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
        </div>
    );
}

export default Dishes;
