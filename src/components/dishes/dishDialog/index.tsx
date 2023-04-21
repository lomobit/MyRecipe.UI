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

const DishesDialog = () => {

    return (
        <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
            <DialogTitle>Добавить блюдо</DialogTitle>
            <DialogContent>
                {/*<DialogContentText>*/}
                {/*    Для добавление блюда введите данные:*/}
                {/*</DialogContentText>*/}

                <div
                    style={{backgroundImage: `${process.env.REACT_APP_API_URL}/File/7fa51a01-1e13-42e6-8a68-abf8eaa098c0)`}}>
                    <img
                        //src={`${process.env.REACT_APP_API_URL}/File/a65cea96-a73a-4924-b86a-5285fdaadea6`}
                        src={"data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz48c3ZnIHZlcnNpb249IjEuMSIgaWQ9IkxheWVyXzEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHg9IjBweCIgeT0iMHB4IiB2aWV3Qm94PSIwIDAgMTE1LjE5IDEyMy4zOCIgc3R5bGU9ImVuYWJsZS1iYWNrZ3JvdW5kOm5ldyAwIDAgMTE1LjE5IDEyMy4zOCIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSI+PHN0eWxlIHR5cGU9InRleHQvY3NzIj4uc3Qwe2ZpbGwtcnVsZTpldmVub2RkO2NsaXAtcnVsZTpldmVub2RkO3N0cm9rZTojMDAwMDAwO3N0cm9rZS13aWR0aDowLjU7c3Ryb2tlLW1pdGVybGltaXQ6Mi42MTMxO308L3N0eWxlPjxnPjxwYXRoIGNsYXNzPSJzdDAiIGQ9Ik05My4xMyw3OS41YzEyLjA1LDAsMjEuODIsOS43NywyMS44MiwyMS44MmMwLDEyLjA1LTkuNzcsMjEuODItMjEuODIsMjEuODJjLTEyLjA1LDAtMjEuODItOS43Ny0yMS44Mi0yMS44MiBDNzEuMzEsODkuMjcsODEuMDgsNzkuNSw5My4xMyw3OS41TDkzLjEzLDc5LjV6IE04LjA4LDAuMjVoOTUuMjhjMi4xNywwLDQuMTEsMC44OSw1LjUzLDIuM2MxLjQyLDEuNDIsMi4zLDMuMzksMi4zLDUuNTN2NzAuMDEgYy0yLjQ2LTEuOTEtNS4yNC0zLjQ0LTguMjUtNC40OFY5Ljk4YzAtMC40My0wLjE2LTAuNzktMC40Ni0xLjA1Yy0wLjI2LTAuMjYtMC42Ni0wLjQ2LTEuMDUtMC40Nkg5Ljk0IGMtMC40MywwLTAuNzksMC4xNi0xLjA1LDAuNDZDOC42Myw5LjE5LDguNDMsOS41OCw4LjQzLDkuOTh2NzAuMDJoMC4wM2wzMS45Ny0zMC42MWMxLjI4LTEuMTgsMy4yOS0xLjA1LDQuNDQsMC4yMyBjMC4wMywwLjAzLDAuMDMsMC4wNywwLjA3LDAuMDdsMjYuODgsMzEuOGMtNC43Myw1LjE4LTcuNjIsMTIuMDgtNy42MiwxOS42NWMwLDMuMjksMC41NSw2LjQ1LDEuNTUsOS40SDguMDggYy0yLjE3LDAtNC4xMS0wLjg5LTUuNTMtMi4zcy0yLjMtMy4zOS0yLjMtNS41M1Y4LjA4YzAtMi4xNywwLjg5LTQuMTEsMi4zLTUuNTNTNS45NCwwLjI1LDguMDgsMC4yNUw4LjA4LDAuMjV6IE03My45OCw3OS4zNSBsMy43MS0yMi43OWMwLjMtMS43MSwxLjkxLTIuOSwzLjYyLTIuNmMwLjY2LDAuMSwxLjI1LDAuNDMsMS43MSwwLjg2bDE3LjEsMTcuOTdjLTIuMTgtMC41Mi00LjQ0LTAuNzktNi43OC0wLjc5IEM4NS45MSw3MS45OSw3OS4xMyw3NC43Nyw3My45OCw3OS4zNUw3My45OCw3OS4zNXogTTgxLjk4LDE4LjE5YzMuMTMsMCw1Ljk5LDEuMjgsOC4wMywzLjMyYzIuMDcsMi4wNywzLjMyLDQuOSwzLjMyLDguMDMgYzAsMy4xMy0xLjI4LDUuOTktMy4zMiw4LjAzYy0yLjA3LDIuMDctNC45LDMuMzItOC4wMywzLjMyYy0zLjEzLDAtNS45OS0xLjI4LTguMDMtMy4zMmMtMi4wNy0yLjA3LTMuMzItNC45LTMuMzItOC4wMyBjMC0zLjEzLDEuMjgtNS45OSwzLjMyLTguMDNDNzYuMDIsMTkuNDQsNzguODYsMTguMTksODEuOTgsMTguMTlMODEuOTgsMTguMTl6IE04NS44Miw4OC4wNWwxOS45NiwyMS42IGMxLjU4LTIuMzksMi41LTUuMjUsMi41LTguMzNjMC04LjM2LTYuNzgtMTUuMTQtMTUuMTQtMTUuMTRDOTAuNDgsODYuMTcsODcuOTksODYuODUsODUuODIsODguMDVMODUuODIsODguMDV6IE0xMDAuNDQsMTE0LjU4IGwtMTkuOTYtMjEuNmMtMS41OCwyLjM5LTIuNSw1LjI1LTIuNSw4LjMzYzAsOC4zNiw2Ljc4LDE1LjE0LDE1LjE0LDE1LjE0Qzk1Ljc4LDExNi40Niw5OC4yNywxMTUuNzgsMTAwLjQ0LDExNC41OEwxMDAuNDQsMTE0LjU4eiIvPjwvZz48L3N2Zz4="}
                        width="100%"
                        height={400}
                    />
                </div>
                <Button variant="outlined" component="label">
                    Добавить изображение
                    <input hidden accept="image/*" multiple type="file"/>
                </Button>
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
                    onClick={() => setOpenDialog(true)}
                >
                    Добавить ингредиент
                </Button>

            </DialogContent>
            <DialogActions>
                <Button onClick={() => setOpenDialog(false)}>Отмена</Button>
                <Button>Добавить</Button>
            </DialogActions>
        </Dialog>
    );
}

export default DishesDialog;