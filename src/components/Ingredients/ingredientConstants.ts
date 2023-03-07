import { GridColDef } from '@mui/x-data-grid';

export const columns: GridColDef[] = [
    {
        field: 'id',
        headerName: 'Id',
        width: 70,
        sortable: false,
        filterable: false,
        hideable: false,
    },
    {
        field: 'name',
        headerName: 'Название',
        width: 250,
        sortable: false,
        filterable: false,
        hideable: false,
    },
    {
        field: 'description',
        headerName: 'Описание',
        sortable: false,
        filterable: false,
        hideable: false,
    },
];
