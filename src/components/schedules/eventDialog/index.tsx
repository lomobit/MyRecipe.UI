import {Dialog, DialogTitle} from "@mui/material";

export declare interface EventsDialogProps {
    openDialog: boolean;
    setOpenDialog: (open: boolean) => void;

    onSave: () => void;

    eventId?: number;
    eventName?: string;
}

const EventsDialog = (props: EventsDialogProps) => {
    return (
        <Dialog
            open={props.openDialog}
            onClose={() => props.setOpenDialog(false)}
            fullWidth={true}
            maxWidth="md"
        >
            <DialogTitle>
                {props.eventName === undefined ? 'Добавить событие' : `Изменить событие "${props.eventName}"`}
            </DialogTitle>
        </Dialog>
    );
}

export default EventsDialog;