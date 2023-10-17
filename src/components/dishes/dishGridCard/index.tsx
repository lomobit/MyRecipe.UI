import Card from "@mui/material/Card";
import {CardActionArea} from "@mui/material";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import {noImageData} from "../constants";

export declare interface DishesGridCardProps {
    id: number;
    name: string;
    numberOfPersons: number;
    dishPhotoGuid?: string;

    onClick?: () => void;
}

const DishesGridCard = (props: DishesGridCardProps) => {

    const MaxSymbolsName: number = 16;

    const getDishPhotoUrl = (dishPhotoGuid?: string): string => {
        if (dishPhotoGuid) {
            return `${process.env.REACT_APP_API_URL}/File/${dishPhotoGuid}`
        }

        return noImageData;
    }

    const getDishName = () => {
        let result = props.name;
        if (result.length > MaxSymbolsName) {
            result = result.substring(0, MaxSymbolsName - 3) + '...';
        }

        return result;
    }

    return (
        <Grid key={props.id} item>
            <Card
                sx={{
                    width: 217
                }}
                onClick={props.onClick}
            >
                <CardActionArea>
                    <CardMedia
                        component="img"
                        height={200}
                        draggable={false}
                        image={getDishPhotoUrl(props.dishPhotoGuid)}
                        alt={`Фото ${props.name}`}
                    />
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                            {getDishName()}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            Количество персон: {props.numberOfPersons}
                        </Typography>
                    </CardContent>
                </CardActionArea>
            </Card>
        </Grid>
    );
}

export default DishesGridCard;
