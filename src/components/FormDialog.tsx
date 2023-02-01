import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

interface PropsType {
    title: any,
    text: String,
    children: any,
    subscribe: any,
    open: boolean,
    setClose: any,
}

export default function FormDialog(props: PropsType) {
    const {title, text, children, subscribe, open, setClose} = props

    return (
        <div>
            <Dialog open={open} onClose={setClose}>
                <DialogTitle>{title}</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                    {text}
                    </DialogContentText>
                    {children}
                </DialogContent>
                <DialogActions>
                    <Button onClick={setClose}>Cancelar</Button>
                    <Button onClick={subscribe} type="submit">Guardar</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}