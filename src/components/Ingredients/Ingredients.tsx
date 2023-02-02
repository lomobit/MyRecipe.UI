import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import './Ingredients.css';

const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'firstName', headerName: 'First name', width: 130 },
    { field: 'lastName', headerName: 'Last name', width: 130 },
    {
      field: 'age',
      headerName: 'Age',
      type: 'number',
      width: 90,
    },
  ];
  
  const rows = [
    { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
    { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
    { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
    { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 },
    { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
    { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
    { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
    { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
    { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
  ];

function Ingredients() {
    return (
        <div className="ingredients">
            <h1>Ингредиенты</h1>
            <Stack direction="row-reverse" spacing={1}>
                <Button variant="outlined" startIcon={<EditIcon />}>Изменить</Button>
                <Button
                    variant="contained"
                    startIcon={<AddIcon />}
                    onClick={() => {
                        alert('Добавление');
                    }}>
                        Добавить
                    </Button>
            </Stack>
            <div style={{ marginTop: 20, height: 800, width: '100%' }}>
                <DataGrid
                    rows={rows}
                    columns={columns}
                    pageSize={5}
                    rowsPerPageOptions={[9]}
                    checkboxSelection
                />
            </div>
        </div>
    );
}

export default Ingredients;