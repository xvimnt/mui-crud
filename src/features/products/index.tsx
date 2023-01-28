import { useEffect, useState } from "react";
import Table from "../../components/Table";
import FormDialog from "../../components/FormDialog";

// MUI
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { GridApi, GridColDef } from '@mui/x-data-grid';
import { Alert, Button, ButtonGroup, LinearProgress } from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

// API
import { getAllProducts, addProduct, deleteProduct, updateProduct } from "./api";
import { selectProducts } from "./slice";
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { Product } from "./schema";
import ConfirmDialog from "../../components/ConfimDialog";


export default function Products() {

  const products = useAppSelector(selectProducts);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getAllProducts())
  }, [dispatch])

  const [confirmOpen, setConfirmOpen] = useState(false);


  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'name', headerName: 'Nombre', width: 430 },
    { field: 'detail', headerName: 'Detalle', width: 630 },
    { field: 'price', headerName: 'Precio', width: 330, type: 'number' },
    {
      field: "action",
      headerName: "Action",
      width: 130,
      sortable: false,
      renderCell: (params) => {
        const onClick = (e: any, submitFunction: Function) => {
          e.stopPropagation(); // don't select this row after clicking
          // Open confirmation dialog to delete
          setConfirmOpen(true)

          const product: Product = params.row

          console.log(product)
          
          // return submitFunction(product)
        };

        return (
          <ButtonGroup variant="contained" aria-label="outlined primary button group">
            <Button size="small" onClick={(e) => onClick(e, updateProduct)}><EditIcon></EditIcon></Button>
            <Button size="small" onClick={(e) => onClick(e, deleteProduct)}><DeleteIcon></DeleteIcon></Button>
          </ButtonGroup>
        );
      }
    },
  ];

  return (
    <>
      <Box sx={{ width: '100%', height: '100%' }}>
        <Typography variant="h3" gutterBottom>
          Productos
        </Typography>
        <ConfirmDialog
          title="Delete Post?"
          open={confirmOpen}
          setOpen={setConfirmOpen}
          onConfirm={deleteProduct}
        >
          Estas seguro de querer eliminar este producto?
        </ConfirmDialog>
        <Button variant="outlined" onClick={() => setConfirmOpen(true)}>Borrar Seleccionados</Button>
        <FormDialog title="Agregar Nuevo Producto" button_title={"Agregar nuevo"} text="Asegurese de que el codigo sea diferente a alguno ya existente">
          <TextField
            autoFocus
            margin="dense"
            id="id"
            label="Codigo"
            type="number"
            fullWidth
            variant="standard"
          />
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Nombre"
            type="text"
            fullWidth
            variant="standard"
          />
          <TextField
            autoFocus
            margin="dense"
            id="detail"
            label="Detalle"
            type="text"
            fullWidth
            variant="standard"
            multiline
            maxRows={4}
          />
          <TextField
            autoFocus
            margin="dense"
            id="price"
            label="Precio"
            type="number"
            fullWidth
            variant="standard"
          />
        </FormDialog>
        {products.fetchStatus === "error" && <Alert severity="error">Ocurrio un error al obtener los datos!</Alert>}
        {products.fetchStatus === "loading" && <Box sx={{ width: '100%' }}><LinearProgress /></Box>}
        {products.fetchStatus === "success" && <Table rows={products.data} columns={columns}></Table>}
      </Box>
    </>
  );
}
