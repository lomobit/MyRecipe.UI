import {SortingOrderEnum} from "../common/enums/SortingOrderEnum";
import {SortingFieldEnum} from "./enums/SortingFieldEnum";

export class GetIngredientsAsyncQuery {
    pageNumber: number;
    pageSize: number;
    sortingOrder: SortingOrderEnum;
    sortingField: SortingFieldEnum;
    nameFilter?: string;

    constructor(
        pageNumber: number,
        pageSize: number,
        sortingOrder: SortingOrderEnum,
        sortingField: SortingFieldEnum,
        nameFilter?: string
        ) {
        this.pageNumber = pageNumber;
        this.pageSize = pageSize;
        this.sortingOrder = sortingOrder;
        this.sortingField = sortingField;
        this.nameFilter = nameFilter;
    }
}