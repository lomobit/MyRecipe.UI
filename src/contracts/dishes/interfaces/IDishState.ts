import {DishForGridDto} from "../dtos/DishForGridDto";
import {PageSize} from "../../common/types/PageSize";

export interface IDishState {
    dishesSlice: Array<DishForGridDto>;
    dishesCount: number;
    getDishesPageStatus: 'idle' | 'loading' | 'failed';

    getDishStatus: 'idle' | 'loading' | 'failed';

    addDishStatus: 'idle' | 'loading' | 'failed';

    editDishStatus: 'idle' | 'loading' | 'failed';

    dishesGridPageSize: PageSize;
}