import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import './index.css';
import {mockDishes} from "./constants";

const Dishes = () => {



    return (
        <div className="dishes">
            <h1>Блюда</h1>
            <Grid container justifyContent="left" spacing={2}>
                {mockDishes.map((value) => (
                    <Grid key={value.id} item>
                        <Paper
                            sx={{
                                height: 260,
                                width: 217,
                                backgroundColor: (theme) =>
                                    theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
                            }}
                        >
                            <div
                                style={{padding: 10}}
                            >
                                <div
                                    style={{height: 140}}
                                >
                                    <img
                                        src={`${process.env.REACT_APP_API_URL}/File/${value.dishPhotoGuid}`}
                                        width="100%"
                                        height="100%"
                                        alt="Фото блюда"
                                        loading="lazy"
                                    />
                                </div>
                                <h3>{value.name}</h3>
                                <p>Количество персон: {value.numberOfPersons}</p>
                            </div>
                        </Paper>
                    </Grid>
                ))}
            </Grid>
        </div>
    );
}

export default Dishes;
