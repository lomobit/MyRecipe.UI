import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Stack,
    TextField
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import {ChangeEvent, Fragment, useState} from "react";
import {IngredientForDishDto} from "../../../contracts/dishes/dtos/IngredientForDishDto";
import IngredientForDish from "./ingredientForDish";

export declare interface DishesDialogProps {
    openDialog: boolean;
    setOpenDialog: (open: boolean) => void;
}

const DishesDialog = (props: DishesDialogProps) => {

    const [file, setFile] = useState<File>();
    const [ingredientsForDish, setIngredientsForDish] = useState<IngredientForDishDto[]>([]);

    const handleDishImageChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setFile(e.target.files[0]);
            e.target.value = "";
        }
    };

    const handleDishImageDelete = () => {
        setFile(undefined);
    }

    const handleAddIngrediantForDish = () => {
        let tmp = [...ingredientsForDish];
        tmp.push(new IngredientForDishDto(1, 1, "", ""));

        setIngredientsForDish(tmp);
    }

    const handleDeleteIngrediantForDish = (index: number) => {
        let tmp = [...ingredientsForDish];
        if (index > -1) {
            tmp.splice(index, 1);
        }

        setIngredientsForDish(tmp);
    }

    // Вынести куда-то в общие константы
    const noImageData = "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9Ii0zMiAtMTIwIDYxMiA2MTIiPgogIDxwYXRoIGQ9Im0gNDggMzIgYyAwIDAgMCAwIDAgMCBsIDQ0OCAwIGMgMTYgMCAxNiAxNiAxNiAxNiB2IDI3MiBjIDAgMTYgLTE2IDE2IC0xNiAxNiBsIC00NDggMCBjIC0xNiAwIC0xNiAtMTYgLTE2IC0xNiB2IC0yNzIgYyAwIDAgMCAtMTYgMTYgLTE2IG0gLTE2IDE3NiBsIDExMiAtOTYgbCAxMjggMTI4IG0gMCAwIGwgOTYgLTk2IGwgMTQ0IDEyOCBtIC0xNDQgLTE5MSBDIDM3NiA4MiAzODEgODUgMzgyIDk1IEMgMzgwIDEwNSAzNzcgMTA4IDM2OCAxMDkgQyAzNjEgMTA4IDM1NiAxMDYgMzU0IDk1IEMgMzU1IDg2IDM2MCA4MiAzNjggODEiIHN0cm9rZT0iI2NlY2ZkMiIgc3Ryb2tlLXdpZHRoPSIxMCIgZmlsbD0iI2Y0ZjZmOSIvPgo8L3N2Zz4=";

    return (
        <Dialog open={props.openDialog} onClose={() => props.setOpenDialog(false)}>
            <DialogTitle>Добавить блюдо</DialogTitle>
            <DialogContent>

                <Fragment>
                    <Fragment>
                        <img
                            src={file !== undefined
                                ? URL.createObjectURL(file)
                                : noImageData}
                            width="100%"
                            alt="There will be text"
                        />
                    </Fragment>
                    <Stack direction="row" spacing={1}>
                        <Button
                            variant="outlined"
                            component="label">
                            Добавить изображение
                            <input
                                hidden={true}
                                multiple={false}
                                accept="image/*"
                                type="file"
                                onChange={handleDishImageChange}
                            />
                        </Button>
                        <Button
                            disabled={file === undefined}
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
                    //value={props.nameIngredient}
                    variant="outlined"
                    fullWidth
                    required
                    // onChange={onChangeIngredientName}
                    // error={isValidationNameError}
                    // helperText={helperTextErrorForName}
                />
                <TextField
                    type="number"
                    autoFocus
                    margin="dense"
                    id="NumberOfPerson"
                    label="Количество персон"
                    // value={props.descriptionIngredient}
                    variant="outlined"
                    fullWidth
                    required
                    // onChange={onChangeIngredientDescription}
                />
                <TextField
                    autoFocus
                    margin="dense"
                    id="Description"
                    label="Способ приготовления"
                    // value={props.descriptionIngredient}
                    variant="outlined"
                    fullWidth
                    multiline
                    // onChange={onChangeIngredientDescription}
                />

                <DialogContentText style={{marginTop: 30}}>
                    Добавьте ингредиенты, которые нужны для приготовления блюда:
                </DialogContentText>


                <Fragment>
                    {ingredientsForDish.map((value, index) => <IngredientForDish
                        key={index}
                        index={index}
                        deleteIngredient={handleDeleteIngrediantForDish}/>)}
                </Fragment>

                <Button
                    variant="outlined"
                    startIcon={<AddIcon/>}
                    onClick={handleAddIngrediantForDish}
                >
                    Добавить ингредиент
                </Button>

            </DialogContent>
            <DialogActions>
                <Button onClick={() => props.setOpenDialog(false)}>Отмена</Button>
                <Button>Добавить</Button>
            </DialogActions>
        </Dialog>
    );
}

export default DishesDialog;