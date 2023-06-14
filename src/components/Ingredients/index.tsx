import {ChangeEvent, useEffect, useState} from 'react';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import UpdateIcon from '@mui/icons-material/Update';
import {DataGrid, GridPaginationModel, GridRowSelectionModel, GridSortDirection, GridSortModel} from '@mui/x-data-grid';
import {Button, IconButton, Stack, TextField} from '@mui/material';

import {
    ingredientFieldName_Name,
    ingredientsMuiDataGridColumns,
    sortDescending
} from './constants';
import NoRowsMuiDataGridOverlay from '../overlays/mui-datagrid-norows-overlay';
import MuiDataGridPagination from '../paginations/mui-datagrid-pagination';

import './index.css';
import {GetIngredientsAsyncQuery} from '../../contracts/ingredients/queries/GetIngredientsAsyncQuery';
import DialogAddIngredient from './dialogAdd';
import DialogEditIngredient from './dialogEdit';
import {IngredientDto} from '../../contracts/ingredients/dtos/IngredientDto';
import {useAppDispatch, useAppSelector} from '../../store/hooks';
import {
    selectGridPageSize,
    selectIngredientsCount,
    selectIngredientsSlice,
    setGridPageSize
} from '../../store/ingredients/reducers';
import {addIngredientAsync, editIngredientAsync, getIngredientsAsync} from '../../store/ingredients/thunks';
import {SortingOrderEnum} from "../../contracts/common/enums/SortingOrderEnum";
import {SortingFieldEnum} from "../../contracts/ingredients/enums/SortingFieldEnum";

const Ingredients = () => {


    // appSelectors
    const ingredientsSlice = useAppSelector(selectIngredientsSlice);
    const ingredientsCount = useAppSelector(selectIngredientsCount);
    const gridPageSize = useAppSelector(selectGridPageSize);
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
    const [nameFilter, setNameFilter] = useState("");
    const [rowSelectionModel, setRowSelectionModel] = useState<GridRowSelectionModel>([]);
    const [sortModel, setSortModel] = useState<GridSortModel>([]);
    const [paginationModel, setPaginationModel] = useState<GridPaginationModel>({
        page: 0,
        pageSize: gridPageSize
    });


    useEffect(() => {
        updateIngredients();
    }, [paginationModel, sortModel]);

    const updateIngredients = () => {
        let active = true;

        (async () => {
            setLoading(true);

            let getIngredientQuery = new GetIngredientsAsyncQuery(
                paginationModel.page + 1,
                paginationModel.pageSize,
                getSortingOrderForUpdate(sortModel[0]?.sort),
                getSortingFieldForUpdate(sortModel[0]?.field),
                nameFilter);
            await dispatch(getIngredientsAsync(getIngredientQuery));

            if (!active) {
                return;
            }

            setLoading(false);
        })();

        return () => {
            active = false;
        };
    }

    const getSortingOrderForUpdate = (sort: GridSortDirection) => {
        switch (sort) {
            case sortDescending:
                return SortingOrderEnum.Descending;
            default:
                return SortingOrderEnum.Ascending;

        }
    }

    const getSortingFieldForUpdate = (fieldName: string) => {
        switch (fieldName) {
            case ingredientFieldName_Name:
                return SortingFieldEnum.Name;
            default:
                return SortingFieldEnum.Id;
        }
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
        
        onRowSelectionModelChange([]);
    }

    const onRowSelectionModelChange = (newRowSelectionModel: GridRowSelectionModel) => {
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

    const onPaginationModelChange = (model: GridPaginationModel) => {
        if (model.pageSize !== gridPageSize) {
            dispatch(setGridPageSize(model.pageSize));
        }

        setPaginationModel(model);
    }

    const onSortModelChange = (model: GridSortModel) => {
        setSortModel(model);
    }

    const onChangeNameFilter = (event: ChangeEvent<HTMLInputElement>) => {
        setNameFilter(event.target.value);
    }

    const handleClickUpdateButton = () => {
        updateIngredients();
    }

    return (
        <div className="ingredients">
            <h1>Ингредиенты</h1>
            <div className="ingredientsButtons">
                <Stack direction="row" spacing={1} className="nameFilteringButtons">
                    <TextField
                        label="Поиск по названию"
                        variant="outlined"
                        size="small"
                        value={nameFilter}
                        onChange={onChangeNameFilter}
                    />
                    <IconButton
                        aria-label="update"
                        color="primary"
                        onClick={handleClickUpdateButton}
                    >
                        <UpdateIcon />
                    </IconButton>
                </Stack>
                <Stack direction="row-reverse" spacing={1} className="addEditButtons">
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
            </div>
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
                    onRowSelectionModelChange={onRowSelectionModelChange}
                    paginationModel={paginationModel}
                    onPaginationModelChange={onPaginationModelChange}
                    sortModel={sortModel}
                    onSortModelChange={onSortModelChange}
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
