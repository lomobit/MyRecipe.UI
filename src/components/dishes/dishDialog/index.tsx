import {
    Button,
    Dialog, DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    MenuItem,
    Select,
    Stack,
    TextField
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import ImagePicker from "../../image-picker";

export declare interface DishesDialogProps {
    openDialog: boolean;
    setOpenDialog: (open: boolean) => void;
}

const DishesDialog = (props: DishesDialogProps) => {

    return (
        <Dialog open={props.openDialog} onClose={() => props.setOpenDialog(false)}>
            <DialogTitle>Добавить блюдо</DialogTitle>
            <DialogContent>
                {/*<DialogContentText>*/}
                {/*    Для добавление блюда введите данные:*/}
                {/*</DialogContentText>*/}

                <ImagePicker/>


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
                    label="Описание"
                    // value={props.descriptionIngredient}
                    variant="outlined"
                    fullWidth
                    multiline
                    // onChange={onChangeIngredientDescription}
                />

                <DialogContentText style={{marginTop: 30}}>
                    Добавьте ингредиенты, которые нужны для приготовления блюда:
                </DialogContentText>

                {/* TODO: Вынести в отдельный компонент и добавлять ингрединеты в список селекторов */}
                <div style={{marginTop: 10, marginBottom: 10}}>
                    <Stack direction="row" spacing={1} className="nameFilteringButtons" style={{width: "100%"}}>
                        <Select
                            value={1}
                            //onChange={handleSelectItemPerPageChange}
                            displayEmpty
                            inputProps={{'aria-label': 'Количество элементов'}}
                            style={{width: "100%"}}
                            required
                        >
                            <MenuItem value={1}>Яйцо</MenuItem>
                            <MenuItem value={2}>Бекон</MenuItem>
                            <MenuItem value={3}>Масло</MenuItem>
                        </Select>
                        <TextField
                            type="number"
                            autoFocus
                            margin="dense"
                            id="quantity"
                            label="Количество"
                            // value={props.descriptionIngredient}
                            variant="outlined"
                            fullWidth
                            required
                            // onChange={onChangeIngredientDescription}
                            style={{width: "100%"}}
                        />
                        <Select
                            value={1}
                            //onChange={handleSelectItemPerPageChange}
                            displayEmpty
                            inputProps={{'aria-label': 'Количество элементов'}}
                            style={{width: "100%"}}
                            required
                        >
                            <MenuItem value={1}>Штука</MenuItem>
                            <MenuItem value={2}>Грамм</MenuItem>
                            <MenuItem value={3}>Метр</MenuItem>
                        </Select>
                    </Stack>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="Description"
                        label="Описание"
                        // value={props.descriptionIngredient}
                        variant="outlined"
                        fullWidth
                        multiline
                        // onChange={onChangeIngredientDescription}
                    />
                </div>

                <Button
                    variant="outlined"
                    startIcon={<AddIcon/>}
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