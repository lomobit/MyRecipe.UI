import { useEffect, useState } from 'react';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import { DataGrid, GridPaginationModel, GridRowSelectionModel } from '@mui/x-data-grid';
import {
    Button,
    Stack
} from '@mui/material';

import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { getIngredientsAsync, selectIngredientsCount, selectIngredientsSlice, selectItemsPerPage } from './ingredientSlice';
import { columns } from './ingredientConstants';
import NoRowsGridOverlay from '../NoRowsGridOverlay/NoRowsGridOverlay';
import MuiGridPagination from '../MuiGridPagination/MuiGridPagination';

import './Ingredients.css';
import { GetIngredientsAsyncQuery } from '../../contracts/ingredients/GetIngredientsAsyncQuery';
import DialogAddIngredient from './DialogAddIngredient';
import DialogEditIngredient from './DialogEditIngrediant';
import { Ingredient } from '../../contracts/ingredients/IngredientDto';



const Ingredients = () => {
    const ingredientsSlice = useAppSelector(selectIngredientsSlice);
    const ingredientsCount = useAppSelector(selectIngredientsCount);
    const itemsPerPage = useAppSelector(selectItemsPerPage);
    const dispatch = useAppDispatch();

    const [openAddDialog, setOpenAddDialog] = useState(false);
    const [openEditDialog, setOpenEditDialog] = useState(false);
    const [editedIngredientId, setEditedIngredientId] = useState(-1);
    const [editedIngredientName, setEditedIngredientName] = useState("");
    const [editedIngredientDescription, setEditedIngredientDescription] = useState("");
    const [disableEditButton, setDisableEditButton] = useState(true);
    const [loading, setLoading] = useState(false);
    const [rowSelectionModel, setRowSelectionModel] = useState<GridRowSelectionModel>([]);
    const [paginationModel, setPaginationModel] = useState({
        page: 0,
        pageSize: itemsPerPage,
    });

    useEffect(() => {
        let active = true;

        (async () => {
            setLoading(true);
            await dispatch(getIngredientsAsync(new GetIngredientsAsyncQuery(paginationModel.page + 1, paginationModel.pageSize)));

            if (!active) {
                return;
            }

            setLoading(false);
        })();
    
        return () => {
            active = false;
        };

        ;
    }, [paginationModel])

    const handleClickAddButton = () => {
        setOpenAddDialog(true);
    };

    const handleClickEditButton = () => {
        setOpenEditDialog(true);
    }

    const handleRowSelectionModelChange = (newRowSelectionModel: GridRowSelectionModel) => {
        if (newRowSelectionModel.length > 0) {
            let newEditedIngredientId: number = newRowSelectionModel[0] as number;
            let newEditedIngredient: Ingredient = ingredientsSlice.filter(x => x.id === newEditedIngredientId)[0];

            setEditedIngredientId(newEditedIngredientId);
            setEditedIngredientName(newEditedIngredient.name);
            setEditedIngredientDescription(newEditedIngredient.description ?? "");

            setDisableEditButton(false);
        }
        else {
            setEditedIngredientId(-1);
            setEditedIngredientName("");
            setEditedIngredientDescription("");

            setDisableEditButton(true);
        }

        setRowSelectionModel(newRowSelectionModel);
    }

    const handlePaginationModelChange = (newPaginationModel: GridPaginationModel) => {
        setPaginationModel(newPaginationModel);
    }

    const getIngredientsGridHeightByPageSize = () => {
        switch (paginationModel.pageSize) {
            case 10:
                return 454;
            case 20:
                return 814;
            case 30:
                return 1174;
            default:
                return 454;
        }
    }

    return (
        <div className="ingredients">
            <h1>Ингредиенты</h1>
            <Stack direction="row-reverse" spacing={1}>
                <Button
                    variant="outlined"
                    startIcon={<EditIcon />}
                    disabled={disableEditButton}
                    onClick={handleClickEditButton}
                >
                    Изменить
                </Button>
                <Button
                    variant="contained"
                    startIcon={<AddIcon />}
                    onClick={handleClickAddButton}
                >
                    Добавить
                </Button>
            </Stack>
            <DialogAddIngredient
                open={openAddDialog}
                setOpen={setOpenAddDialog}
                pageNumber={paginationModel.page + 1}
                pageSize={paginationModel.pageSize}
            />
            <DialogEditIngredient
                editedIngredientId={editedIngredientId}
                open={openEditDialog}
                setOpen={setOpenEditDialog}
                pageNumber={paginationModel.page + 1}
                pageSize={paginationModel.pageSize}
                editedIngredientName={editedIngredientName}
                editedIngredientDescription={editedIngredientDescription}
                handleRowSelectionModelChange={handleRowSelectionModelChange}
            />
            <div
                className="ingredientsGrid"
                style={{height: getIngredientsGridHeightByPageSize()}}>
                <DataGrid
                    paginationMode="server"
                    rowCount={ingredientsCount}
                    loading={loading}
                    density='compact'
                    rows={ingredientsSlice}
                    columns={columns}
                    rowSelectionModel={rowSelectionModel}
                    onRowSelectionModelChange={handleRowSelectionModelChange}
                    paginationModel={paginationModel}
                    onPaginationModelChange={handlePaginationModelChange}
                    disableColumnMenu={true}
                    hideFooterSelectedRowCount={true}
                    slots={{
                        pagination: MuiGridPagination,
                        noRowsOverlay: NoRowsGridOverlay,
                    }}
                />
            </div>
        </div>
    );
}

export default Ingredients;
