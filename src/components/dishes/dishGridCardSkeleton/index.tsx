import Card from "@mui/material/Card";
import {CardActionArea} from "@mui/material";
import Skeleton from "@mui/material/Skeleton";
import CardContent from "@mui/material/CardContent";
import {Fragment} from "react";
import Grid from "@mui/material/Grid";

export declare interface DishesGridCardSkeletonProps {
    id: number;
}

const DishesGridCardSkeleton = (props: DishesGridCardSkeletonProps) => {
    return (
        <Grid key={props.id} item>
            <Card
                sx={{
                    width: 217
                }}
            >
                <CardActionArea>
                    <Skeleton sx={{ height: 200 }} animation="wave" variant="rounded" />
                    <CardContent>
                        <Fragment>
                            <Skeleton animation="wave" height={35} style={{ marginBottom: 6 }} />
                            <Skeleton animation="wave" height={20} width="80%" />
                        </Fragment>
                    </CardContent>
                </CardActionArea>
            </Card>
        </Grid>
    );
}

export default DishesGridCardSkeleton;