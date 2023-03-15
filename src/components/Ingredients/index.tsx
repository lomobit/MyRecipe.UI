import { useEffect, useState } from 'react';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import { DataGrid, GridRowSelectionModel } from '@mui/x-data-grid';
import { Button, Stack } from '@mui/material';

import { ingredientsMuiDataGridColumns } from './constants';
import NoRowsMuiDataGridOverlay from '../muiDataGridSlots/noRowsOverlay';
import MuiDataGridPagination from '../muiDataGridSlots/pagination';

import './index.css';
import { GetIngredientsAsyncQuery } from '../../contracts/ingredients/GetIngredientsAsyncQuery';
import DialogAddIngredient from './dialogAdd';
import DialogEditIngredient from './dialogEdit';
import { IngredientDto } from '../../contracts/ingredients/IngredientDto';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { selectIngredientsCount, selectIngredientsSlice, selectItemsPerPage } from '../../store/ingredients/reducers';
import { addIngredientAsync, editIngredientAsync, getIngredientsAsync } from '../../store/ingredients/thunks';

const Ingredients = () => {
    const ingredientsSlice = useAppSelector(selectIngredientsSlice);
    const ingredientsCount = useAppSelector(selectIngredientsCount);
    const itemsPerPage = useAppSelector(selectItemsPerPage);
    const dispatch = useAppDispatch();

    // dialogAdd
    const [openAddDialog, setOpenAddDialog] = useState(false);
    const [nameIngredientAddDialog, setNameIngredientAddDialog] = useState("");
    const [descriptionIngredientAddDialog, setDescriptionIngredientAddDialog] = useState("");

    // dialogEdit
    const [openEditDialog, setOpenEditDialog] = useState(false);
    const [idIngredientEditDialog, setIdIngredientEditDialog] = useState(-1);
    const [nameIngredientEditDialog, setNameIngredientEditDialog] = useState("");
    const [descriptionIngredientEditDialog, setDescriptionIngredientEditDialog] = useState("");

    // dataGrid
    const [disableEditButton, setDisableEditButton] = useState(true);
    const [loading, setLoading] = useState(false);
    const [rowSelectionModel, setRowSelectionModel] = useState<GridRowSelectionModel>([]);
    const [paginationModel, setPaginationModel] = useState({
        page: 0,
        pageSize: itemsPerPage,
    });

    useEffect(() => {
        updateIngredients();
    }, [paginationModel])

    const updateIngredients = () => {
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
    }

    const handleClickAddButton = () => {
        setOpenAddDialog(true);
    }

    const handleClickEditButton = () => {
        setOpenEditDialog(true);
    }

    const onAddIngredientClick = () => {
        dispatch(addIngredientAsync(new IngredientDto(nameIngredientAddDialog, descriptionIngredientAddDialog)))
            .then(() => updateIngredients());
    }

    const onEditIngredientClick = () => {
        dispatch(editIngredientAsync(new IngredientDto(nameIngredientEditDialog, descriptionIngredientEditDialog, idIngredientEditDialog)))
            .then(() => updateIngredients());
        
        handleRowSelectionModelChange([]);
    }

    const handleRowSelectionModelChange = (newRowSelectionModel: GridRowSelectionModel) => {
        if (newRowSelectionModel.length > 0) {
            let newEditedIngredientId: number = newRowSelectionModel[0] as number;
            let newEditedIngredient: IngredientDto = ingredientsSlice.filter(x => x.id === newEditedIngredientId)[0];

            setIdIngredientEditDialog(newEditedIngredientId);
            setNameIngredientEditDialog(newEditedIngredient.name);
            setDescriptionIngredientEditDialog(newEditedIngredient.description ?? "");

            setDisableEditButton(false);
        }
        else {
            setIdIngredientEditDialog(-1);
            setNameIngredientEditDialog("");
            setDescriptionIngredientEditDialog("");

            setDisableEditButton(true);
        }

        setRowSelectionModel(newRowSelectionModel);
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
                nameIngredient={nameIngredientAddDialog}
                setNameIngredient={setNameIngredientAddDialog}
                descriptionIngredient={descriptionIngredientAddDialog}
                setDescriptionIngredient={setDescriptionIngredientAddDialog}
                onAddIngredientClick={onAddIngredientClick}
            />
            <DialogEditIngredient
                open={openEditDialog}
                setOpen={setOpenEditDialog}
                nameIngredient={nameIngredientEditDialog}
                setNameIngredient={setNameIngredientEditDialog}
                descriptionIngredient={descriptionIngredientEditDialog}
                setDescriptionIngredient={setDescriptionIngredientEditDialog}
                onEditIngredientClick={onEditIngredientClick}
            />
            <div
                className="ingredientsGrid"
                style={{height: getIngredientsGridHeightByPageSize()}}>
                <DataGrid
                    density='compact'
                    paginationMode="server"
                    rowCount={ingredientsCount}
                    loading={loading}
                    rows={ingredientsSlice}
                    columns={ingredientsMuiDataGridColumns}
                    rowSelectionModel={rowSelectionModel}
                    onRowSelectionModelChange={handleRowSelectionModelChange}
                    paginationModel={paginationModel}
                    onPaginationModelChange={setPaginationModel}
                    disableColumnMenu
                    hideFooterSelectedRowCount
                    slots={{
                        pagination: MuiDataGridPagination,
                        noRowsOverlay: NoRowsMuiDataGridOverlay,
                    }}
                />
            </div>
        </div>
    );
}

export default Ingredients;
