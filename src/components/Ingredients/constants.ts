import { GridColDef } from '@mui/x-data-grid';

export const sortAscending = "asc";
export const sortDescending = "desc";

export const ingredientFieldName_Id = "id";
export const ingredientFieldName_Name = "name";
export const ingredientFieldName_Description = "description";

export const ingredientsMuiDataGridColumns: GridColDef[] = [
    {
        field: ingredientFieldName_Id,
        headerName: 'Id',
        width: 70,
        sortable: true,
        filterable: false,
        hideable: false,
    },
    {
        field: ingredientFieldName_Name,
        headerName: 'Название',
        width: 250,
        sortable: true,
        filterable: false,
        hideable: false,
    },
    {
        field: ingredientFieldName_Description,
        headerName: 'Описание',
        width: 380,
        sortable: false,
        filterable: false,
        hideable: false,
    },
];
