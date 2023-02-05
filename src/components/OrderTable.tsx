import { useState } from 'react';

// '@mui/material
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Button } from '@mui/material';
import ConfirmDialog from './ConfimDialog';
import { OrderItem } from '../features/orders/schema';

const TAX_RATE = 0.07;

function ccyFormat(num: number) {
    return `${num.toFixed(2)}`;
}

function subtotal(items: OrderItem[]) {
    return items.map(({ price, quantity }) => price * quantity).reduce((sum, i) => sum + i, 0);
}


interface PropsType {
    items: any[],
}

export default function OrderTable(props: PropsType) {
    const { items } = props
    const orderSubtotal = subtotal(items)
    const orderTax = subtotal(items) * TAX_RATE

    const [ConfirmCancelOpen, setConfirmCancelOpen] = useState(false);
    const [confirmCloseOpen, setConfirmCloseOpen] = useState(false);

    const cancelItem = async () => {
        // await dispatch(deleteProduct(item))
        setConfirmCancelOpen(false)
    }


    const closeItem = async () => {
        // await dispatch(deleteProduct(item))
        setConfirmCloseOpen(false)
    }

    return (
        <>
            <ConfirmDialog
                title="Cancelar Orden?"
                open={ConfirmCancelOpen}
                setOpen={setConfirmCancelOpen}
                onConfirm={cancelItem}
            >
                Seguro desea cancelar esta orden?
            </ConfirmDialog>
            <ConfirmDialog
                title="Cerrar Orden?"
                open={confirmCloseOpen}
                setOpen={setConfirmCloseOpen}
                onConfirm={closeItem}
            >
                Seguro desea cerrar esta orden?
            </ConfirmDialog>
            <TableContainer component={Paper}>
                <Table aria-label="spanning table" sx={{ width: '100%', overflow: 'hidden' }}>
                    <TableHead>
                        <TableRow>
                            <TableCell align="center" colSpan={3}>
                                Detalle
                            </TableCell>
                            <TableCell align="right">Precio</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>Articulo</TableCell>
                            <TableCell align="right">Cantidad.</TableCell>
                            <TableCell align="right">Precio Unitario</TableCell>
                            <TableCell align="right">Suma</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {items.map((item) => (
                            <TableRow key={item.id}>
                                <TableCell>{item.name}</TableCell>
                                <TableCell align="right">{item.quantity}</TableCell>
                                <TableCell align="right">{item.price}</TableCell>
                                <TableCell align="right">{ccyFormat(item.price * item.quantity)}</TableCell>
                            </TableRow>
                        ))}
                        <TableRow>
                            <TableCell rowSpan={3} />
                            <TableCell colSpan={2}>Subtotal</TableCell>
                            <TableCell align="right">{ccyFormat(orderSubtotal)}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>Tax</TableCell>
                            <TableCell align="right">{`${(TAX_RATE * 100).toFixed(0)} %`}</TableCell>
                            <TableCell align="right">{ccyFormat(orderTax)}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell colSpan={2}>Total</TableCell>
                            <TableCell align="right">{ccyFormat(orderTax + orderSubtotal)}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell align='center' colSpan={3}>
                                <Button color='error' onClick={() => setConfirmCancelOpen(true)}>Cancelar Orden</Button>
                            </TableCell>
                            <TableCell align='center' colSpan={4}>
                                <Button color='success' onClick={() => setConfirmCloseOpen(true)}>Cerrar Orden</Button>
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    );
}
