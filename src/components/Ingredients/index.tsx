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
import { addIngredientAsync, getIngredientsAsync } from '../../store/ingredients/thunks';

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
    const [editedIngredientId, setEditedIngredientId] = useState(-1);
    const [editedIngredientName, setEditedIngredientName] = useState("");
    const [editedIngredientDescription, setEditedIngredientDescription] = useState("");

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
    };

    const handleClickEditButton = () => {
        setOpenEditDialog(true);
    }

    const onAddIngredientClick = () => {
        dispatch(addIngredientAsync(new IngredientDto(nameIngredientAddDialog, descriptionIngredientAddDialog)))
            .then(() => updateIngredients());
    }

    const handleRowSelectionModelChange = (newRowSelectionModel: GridRowSelectionModel) => {
        if (newRowSelectionModel.length > 0) {
            let newEditedIngredientId: number = newRowSelectionModel[0] as number;
            let newEditedIngredient: IngredientDto = ingredientsSlice.filter(x => x.id === newEditedIngredientId)[0];

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
                    columns={ingredientsMuiDataGridColumns}
                    rowSelectionModel={rowSelectionModel}
                    onRowSelectionModelChange={handleRowSelectionModelChange}
                    paginationModel={paginationModel}
                    onPaginationModelChange={setPaginationModel}
                    disableColumnMenu={true}
                    hideFooterSelectedRowCount={true}
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
