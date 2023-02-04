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

const TAX_RATE = 0.07;

function ccyFormat(num: number) {
    return `${num.toFixed(2)}`;
}

function priceRow(qty: number, unit: number) {
    return qty * unit;
}

function createRow(desc: string, qty: number, unit: number) {
    const price = priceRow(qty, unit);
    return { desc, qty, unit, price };
}

interface Row {
    desc: string;
    qty: number;
    unit: number;
    price: number;
}

function subtotal(items: readonly Row[]) {
    return items.map(({ price }) => price).reduce((sum, i) => sum + i, 0);
}

const rows = [
    createRow('Paperclips (Box)', 100, 1.15),
    createRow('Paper (Case)', 10, 45.99),
    createRow('Waste Basket', 2, 17.99),
];

const invoiceSubtotal = subtotal(rows);
const invoiceTaxes = TAX_RATE * invoiceSubtotal;
const invoiceTotal = invoiceTaxes + invoiceSubtotal;

export default function OrderTable() {
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
                            <TableCell>Desc</TableCell>
                            <TableCell align="right">Qty.</TableCell>
                            <TableCell align="right">Unit</TableCell>
                            <TableCell align="right">Sum</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map((row) => (
                            <TableRow key={row.desc}>
                                <TableCell>{row.desc}</TableCell>
                                <TableCell align="right">{row.qty}</TableCell>
                                <TableCell align="right">{row.unit}</TableCell>
                                <TableCell align="right">{ccyFormat(row.price)}</TableCell>
                            </TableRow>
                        ))}
                        <TableRow>
                            <TableCell rowSpan={3} />
                            <TableCell colSpan={2}>Subtotal</TableCell>
                            <TableCell align="right">{ccyFormat(invoiceSubtotal)}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>Tax</TableCell>
                            <TableCell align="right">{`${(TAX_RATE * 100).toFixed(0)} %`}</TableCell>
                            <TableCell align="right">{ccyFormat(invoiceTaxes)}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell colSpan={2}>Total</TableCell>
                            <TableCell align="right">{ccyFormat(invoiceTotal)}</TableCell>
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

function dispatch(arg0: any) {
    throw new Error('Function not implemented.');
}
