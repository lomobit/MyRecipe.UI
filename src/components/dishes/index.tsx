import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import './index.css';
import { CardActionArea } from '@mui/material';
import { mockDishes } from "./constants";

const Dishes = () => {



    return (
        <div className="dishes">
            <h1>Блюда</h1>
            <Grid container justifyContent="left" spacing={2}>
                {mockDishes.map((value) => (
                    <Grid key={value.id} item>
                        <Card
                            sx={{
                                width: 217,
                                backgroundColor: (theme) =>
                                    theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
                            }}
                        >
                            <CardActionArea>
                                <CardMedia
                                    component="img"
                                    width="100%"
                                    height={140}
                                    draggable={false}
                                    image={`${process.env.REACT_APP_API_URL}/File/${value.dishPhotoGuid}`}
                                    alt={`Фото ${value.name}`}
                                />
                                <CardContent>
                                    <Typography gutterBottom variant="h5" component="div">
                                        {value.name}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        Количество персон: {value.numberOfPersons}
                                    </Typography>
                                </CardContent>
                            </CardActionArea>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </div>
    );
}

export default Dishes;
