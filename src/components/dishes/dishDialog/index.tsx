import {
    Backdrop,
    Button,
    CircularProgress,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Stack,
    TextField
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import {ChangeEvent, Fragment, useEffect, useState} from "react";
import {IngredientForDishModel} from "../../../contracts/dishes/models/IngredientForDishModel";
import IngredientForDish from "./ingredientForDish";
import {getAllIngredientsAsync} from "../../../store/ingredients/thunks";
import {useAppDispatch, useAppSelector} from "../../../store/hooks";
import {GetAllIngredientsAsyncQuery} from "../../../contracts/ingredients/queries/GetAllIngredientsAsyncQuery";
import {IngredientDto} from "../../../contracts/ingredients/dtos/IngredientDto";
import {OkeiDto} from "../../../contracts/okei/dtos/OkeiDto";
import { getAllOkeisAsync } from "../../../store/okeis/thunks";
import {AddDishAsyncCommand} from "../../../contracts/dishes/commands/AddDishAsyncCommand";
import {IngredientForDishDto} from "../../../contracts/dishes/dtos/IngredientForDishDto";
import {addDishAsync, editDishAsync, getDishByIdAsync} from "../../../store/dishes/thunks";
import {noImageData} from "../constants";
import {selectAllIngredients} from "../../../store/ingredients/reducers";
import {selectAllOkeis} from "../../../store/okeis/reducers";
import {EditDishAsyncCommand} from "../../../contracts/dishes/commands/EditDishAsyncCommand";
import {PayloadAction, SerializedError} from "@reduxjs/toolkit";

export declare interface DishesDialogProps {
    openDialog: boolean;
    setOpenDialog: (open: boolean) => void;

    onSave: () => void;

    dishId? : number;
}

const DishesDialog = (props: DishesDialogProps) => {

    const allIngredients = useAppSelector(selectAllIngredients);
    const allOkeis = useAppSelector(selectAllOkeis);
    const dispatch = useAppDispatch();

    // dishInfo
    const [dishPhoto, setDishPhoto] = useState<File>();
    const [dishPhotoGuid, setDishPhotoGuid] = useState<string>();
    const [dishName, setDishName] = useState<string>("");
    const [dishNumberOfPerson, setDishNumberOfPerson] = useState<number>(1);
    const [dishDescription, setDishDescription] = useState<string>("");
    const [ingredientsForDish, setIngredientsForDish] = useState<IngredientForDishModel[]>([]);

    // dishValidation
    const [isDishNameValidationError, setIsDishNameValidationError ] = useState<boolean>(false);
    const [isDishNumberOfPersonValidationError, setIsDishNumberOfPersonValidationError ] = useState<boolean>(false);
    const [isDishDescriptionValidationError, setIsDishDescriptionValidationError ] = useState<boolean>(false);
    const [isDishIngredientsValidationError, setIsDishIngredientsValidationError ] = useState<boolean>(false);

    // loadingSpinner
    const [dialogLoading, setDialogLoading] = useState<boolean>(false);


    useEffect(() => {
        (async () => await dispatch(getAllIngredientsAsync(new GetAllIngredientsAsyncQuery())))();
        (async () => await dispatch(getAllOkeisAsync()))();


    }, []);

    useEffect(() => {
        if (props.dishId !== undefined)
        {
            setDialogLoading(true);
            dispatch(getDishByIdAsync(props.dishId))
                .then(fillDialogWithResponseData)
                .catch(() => {
                    props.setOpenDialog(false);
                })
                .finally(() => {
                    setDialogLoading(false);
                });
        }
        else {
            clearFields();
            resetValidation();
        }
    }, [props.dishId]);

    const fillDialogWithResponseData = (response: PayloadAction<any, string, {arg: number, requestId: string, requestStatus: "fulfilled"}, never> | PayloadAction<unknown, string, {arg: number, requestId: string, requestStatus: "rejected", aborted: boolean, condition: boolean}, SerializedError>) => {
        setDishName(response.payload.name);
        setDishNumberOfPerson(response.payload.numberOfPersons);
        setDishDescription(response.payload.description);

        // Добавление ингредиентов
        let ingredientsForDish: IngredientForDishModel[] = [];
        for (let i = 0; i < response.payload.ingredientsForDish.length; i++) {
            ingredientsForDish.push(new IngredientForDishModel(
                response.payload.ingredientsForDish[i].quantity,
                response.payload.ingredientsForDish[i].condition,
                allIngredients.filter(x => x.id === response.payload.ingredientsForDish[i].ingredientId)[0],
                allOkeis.filter(x => x.code === response.payload.ingredientsForDish[i].okeiCode)[0]
            ));
        }
        setIngredientsForDish(ingredientsForDish);

        // Добавление фото блюда
        if (response.payload.dishPhotoGuid) {
            setDishPhotoGuid(response.payload.dishPhotoGuid);
        }
        else {
            setDishPhotoGuid(undefined);
        }
    }

    const handleDishImageChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setDishPhoto(e.target.files[0]);
            e.target.value = "";
        }
    };

    const handleDishImageDelete = () => {
        setDishPhoto(undefined);
        setDishPhotoGuid(undefined);
    }

    const handleAddIngrediantForDish = () => {
        let tmp = [...ingredientsForDish];
        tmp.push(new IngredientForDishModel(1, ""));

        setIngredientsForDish(tmp);
        setIsDishIngredientsValidationError(false);
    }

    const handleDeleteIngrediantForDish = (index: number) => {
        if (index < 0) {
            return;
        }

        let tmp = [...ingredientsForDish];
        tmp.splice(index, 1);

        setIngredientsForDish(tmp);
    }

    const handleChangeIngredientForDishId = (index: number, ingredient: IngredientDto) => {
        if (index < 0) {
            return;
        }

        let tmp = [...ingredientsForDish];
        tmp[index].ingredient = ingredient;
        tmp[index].ingredientError = false;

        setIngredientsForDish(tmp);
    }

    const handleChangeIngredientForDishQuantity = (index: number, quantity: number) => {
        if (index < 0) {
            return;
        }

        let tmp = [...ingredientsForDish];
        tmp[index].quantity = quantity;
        tmp[index].quantityError = false;

        setIngredientsForDish(tmp);
    }

    const handleChangeIngredientForDishOkeiCode = (index: number, okei: OkeiDto) => {
        if (index < 0) {
            return;
        }

        let tmp = [...ingredientsForDish];
        tmp[index].okei = okei;
        tmp[index].okeiError = false;

        setIngredientsForDish(tmp);
    }

    const handleChangeIngredientForDishCondition = (index: number, condition: string) => {
        if (index < 0) {
            return;
        }

        let tmp = [...ingredientsForDish];
        tmp[index].condition = condition;
        tmp[index].conditionError = false

        setIngredientsForDish(tmp);
    }

    const onChangeDishName = (event: ChangeEvent<HTMLInputElement>) => {
        setDishName(event.target.value);
        if (event.target.value) {
            setIsDishNameValidationError(false);
        }
    }

    const onChangeDishNumberOfPerson = (event: ChangeEvent<HTMLInputElement>) => {
        let value = +event.target.value;

        setDishNumberOfPerson(value);
        if (value && value > 0) {
            setIsDishNumberOfPersonValidationError(false);
        }
    }

    const onChangeDishDescription = (event: ChangeEvent<HTMLInputElement>) => {
        setDishDescription(event.target.value);
        if (event.target.value) {
            setIsDishDescriptionValidationError(false);
        }
    }

    const addNewDish = () => {
        setDialogLoading(true);

        let addDishAsyncQuery = new AddDishAsyncCommand(
            dishName,
            dishDescription,
            dishNumberOfPerson,
            ingredientsForDish.map(x => new IngredientForDishDto(
                x.ingredient!.id,
                x.quantity,
                x.okei!.code,
                x.condition)),
            dishPhoto
        );

        dispatch(addDishAsync(addDishAsyncQuery))
            .then((result) => {
                // После успешного ответа очистка полей и закрытие диалогового окна
                setDialogLoading(false);

                if (result.payload) {
                    handleDialogsCancelButtonClick();
                }

                props.onSave();
            });
    }

    const editDish = () => {
        setDialogLoading(true);

        let editDishAsyncCommand = new EditDishAsyncCommand(
            props.dishId ?? 0,
            dishName,
            dishDescription,
            dishNumberOfPerson,
            ingredientsForDish.map(x => new IngredientForDishDto(
                x.ingredient!.id,
                x.quantity,
                x.okei!.code,
                x.condition,
                x.id)),
            dishPhoto,
            dishPhotoGuid
        );

        dispatch(editDishAsync(editDishAsyncCommand))
            .then((result) => {
                // После успешного ответа очистка полей и закрытие диалогового окна
                setDialogLoading(false);

                if (result.payload) {
                    handleDialogsCancelButtonClick();
                }

                props.onSave();
            })
    }

    const handleDialogsAddButtonClick = () => {
        // Валидация обязательных полей
        if (!validateRequiredFields()) {
            alert("Не все обязательные поля заполнены!");
            return;
        }

        if (props.dishId === undefined) {
            addNewDish();
        }
        else {
            editDish();
        }
    }

    const validateRequiredFields = (): boolean => {
        let hasError: boolean = false;

        // Проверка на заполненность названия блюда
        if (!dishName) {
            hasError = true;
            setIsDishNameValidationError(true);
        }

        // Проверка на заполненность количества персон
        if (!dishNumberOfPerson || dishNumberOfPerson < 1) {
            hasError = true;
            setIsDishNumberOfPersonValidationError(true);
        }

        // Проверка на заполненость способа приготовления
        if (!dishDescription) {
            hasError = true;
            setIsDishDescriptionValidationError(true);
        }

        // Проверка на то, что в нашем блюде есть ингредиенты
        if (!ingredientsForDish?.length) {
            hasError = true;
            setIsDishIngredientsValidationError(true);
        }
        // Проверка, что все поля каждого ингредиента заполнены
        else {
            let hasErrorInIngredients: boolean = false;
            let tmp: IngredientForDishModel[] = [...ingredientsForDish];
            for (let i = 0; i < tmp.length; i++) {
                // Проверка на заполнение типа ингредиента
                if (!tmp[i].ingredient) {
                    hasErrorInIngredients = true;
                    tmp[i].ingredientError = true;
                }

                // Проверка на заполнение количества ингредиента
                if (!tmp[i].quantity || tmp[i].quantity < 1) {
                    hasErrorInIngredients = true;
                    tmp[i].quantityError = true;
                }

                // Проверка на зполнение единицы измерения ингредиента
                if (!tmp[i].okei) {
                    hasErrorInIngredients = true;
                    tmp[i].okeiError = true;
                }

                // Проверка на заполнение состояния ингредиента
                if (!tmp[i].condition) {
                    hasErrorInIngredients = true;
                    tmp[i].conditionError = true;
                }
            }

            if (hasErrorInIngredients) {
                hasError = true;
                setIngredientsForDish(tmp);
            }
        }

        return !hasError;
    }

    const handleDialogsCancelButtonClick = () => {
        // Очистка полей
        clearFields();

        handleDialogClose();
    }

    const clearFields = () => {
        setDishPhoto(undefined);
        setDishPhotoGuid(undefined);
        setDishName("");
        setDishNumberOfPerson(1);
        setDishDescription("");
        setIngredientsForDish([]);
    }

    const resetValidation = () => {
        setIsDishNameValidationError(false);
        setIsDishNumberOfPersonValidationError(false);
        setIsDishDescriptionValidationError(false);
        setIsDishIngredientsValidationError(false);
    }

    const getDishPhotoUrl = (): string => {
        if (dishPhotoGuid) {
            return `${process.env.REACT_APP_API_URL}/File/${dishPhotoGuid}`;
        }

        if (dishPhoto !== undefined) {
            return URL.createObjectURL(dishPhoto);
        }

        return noImageData;
    }

    const handleDialogClose = () => {
        // Очисток ошибок валидации
        resetValidation();

        // Закрытие диалогового окна
        props.setOpenDialog(false);
    }

    return (
        <Dialog
            open={props.openDialog}
            onClose={handleDialogClose}
            fullWidth={true}
            maxWidth="md"
        >
            <Backdrop
                open={dialogLoading}
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
            >
                <CircularProgress color="inherit" />
            </Backdrop>

            <DialogTitle>
                {props.dishId === undefined ? 'Добавить блюдо' : 'Изменить блюдо'}
            </DialogTitle>
            <DialogContent>
                <Fragment>
                    <Fragment>
                        <img
                            src={getDishPhotoUrl()}
                            width="70%"
                            alt="There will be text"
                            style={{display: "flex", margin: "auto", marginBottom: 15}}
                        />
                    </Fragment>
                    <Stack direction="row" spacing={1}>
                        <Button
                            variant="outlined"
                            component="label">
                            {dishPhoto === undefined && dishPhotoGuid === undefined ? 'Добавить изображение' : 'Заменить изображение'}
                            <input
                                hidden={true}
                                multiple={false}
                                accept="image/*"
                                type="file"
                                onChange={handleDishImageChange}
                            />
                        </Button>
                        <Button
                            disabled={dishPhoto === undefined && dishPhotoGuid === undefined}
                            variant="outlined"
                            component="label"
                            onClick={handleDishImageDelete}
                        >
                            Удалить изображение
                        </Button>
                    </Stack>
                </Fragment>


                <DialogContentText style={{marginTop: 30}}>
                    Для добавления блюда введите данные:
                </DialogContentText>
                <TextField
                    autoFocus
                    margin="dense"
                    id="Name"
                    label="Название"
                    value={dishName}
                    variant="outlined"
                    fullWidth
                    required
                    onChange={onChangeDishName}
                    error={isDishNameValidationError}
                    helperText={isDishNameValidationError && "Не заполнено название блюда"}
                />
                <TextField
                    type="number"
                    autoFocus
                    margin="dense"
                    id="NumberOfPerson"
                    label="Количество персон"
                    value={dishNumberOfPerson}
                    variant="outlined"
                    fullWidth
                    required
                    onChange={onChangeDishNumberOfPerson}
                    error={isDishNumberOfPersonValidationError}
                    helperText={isDishNumberOfPersonValidationError && "Неверно указано количество персон, на которых расчитано блюдо"}
                />
                <TextField
                    autoFocus
                    margin="dense"
                    id="Description"
                    label="Способ приготовления"
                    value={dishDescription}
                    variant="outlined"
                    fullWidth
                    multiline
                    required
                    rows={8}
                    onChange={onChangeDishDescription}
                    error={isDishDescriptionValidationError}
                    helperText={isDishDescriptionValidationError && "Не указан способ приготовления блюда"}
                />

                <DialogContentText
                    style={{
                        marginTop: 30,
                        marginBottom: 10,
                        color: isDishIngredientsValidationError ? "#d32f2f" : "rgba(0, 0, 0, 0.6)"
                    }}
                >
                    Добавьте ингредиенты, которые нужны для приготовления блюда: *
                </DialogContentText>


                <Fragment>
                    {
                        ingredientsForDish.map((value, index) =>
                            <IngredientForDish
                                key={index}
                                ingredientForDishIndex={index}
                                ingredientName={value.ingredient?.name ?? null}
                                ingredientQuantity={value.quantity}
                                ingredientOkeiName={value.okei?.name ?? null}
                                ingredientCondition={value.condition}
                                deleteIngredientForDish={handleDeleteIngrediantForDish}
                                changeIngredientId={handleChangeIngredientForDishId}
                                changeIngredientQuantity={handleChangeIngredientForDishQuantity}
                                changeIngredientOkeiCode={handleChangeIngredientForDishOkeiCode}
                                changeIngredientCondition={handleChangeIngredientForDishCondition}
                                ingredientConditionError={value.conditionError}
                                ingredientNameError={value.ingredientError}
                                ingredientOkeiNameError={value.okeiError}
                                ingredientQuantityError={value.quantityError}
                            />
                        )
                    }
                </Fragment>

                <Stack direction="row-reverse">
                    <Button
                        variant="contained"
                        startIcon={<AddIcon/>}
                        onClick={handleAddIngrediantForDish}
                        color={isDishIngredientsValidationError ? "error" : "primary"}
                    >
                        Добавить ингредиент
                    </Button>
                </Stack>

            </DialogContent>
            <DialogActions>
                <Button
                    onClick={handleDialogsCancelButtonClick}
                >
                    Отмена
                </Button>
                <Button
                    variant="contained"
                    onClick={handleDialogsAddButtonClick}
                >
                    {props.dishId === undefined ? 'Добавить' : 'Изменить'}
                </Button>
            </DialogActions>
        </Dialog>
    );
}

export default DishesDialog;