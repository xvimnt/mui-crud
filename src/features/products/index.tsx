import { useEffect, useState } from "react";
import Table from "../../components/Table";
import FormDialog from "../../components/FormDialog";

// MUI
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { GridColDef } from '@mui/x-data-grid';
import { Alert, Button, ButtonGroup, LinearProgress } from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';

// API
import {
  getAllProducts as getAllItems,
  addProduct,
  deleteProduct as deleteItem,
  updateProduct as updateItem
} from "./api";
import { selectProducts } from "./slice";
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { Product } from "./schema";
import ConfirmDialog from "../../components/ConfimDialog";


export default function Products() {

  // Get Rows
  const rows = useAppSelector(selectProducts);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getAllItems())
  }, [dispatch])


  // Columns definition
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
            <Button size="small" onClick={(e) => onClick(e, updateItem)}><EditIcon></EditIcon></Button>
            <Button size="small" onClick={(e) => onClick(e, deleteItem)}><DeleteIcon></DeleteIcon></Button>
          </ButtonGroup>
        );
      }
    },
  ];

  // Strings
  const title = "Productos"
  const confirm_delete = "Estas seguro de querer eliminar este producto?"
  const add_message = "Asegurese de que el codigo sea diferente a alguno ya existente"
  const add_title = "Agregar Nuevo Producto"

  // States 
  const [id, setId] = useState(0)
  const [name, setName] = useState('')
  const [detail, setDetail] = useState('')
  const [price, setPrice] = useState(0)
  const [confirmOpen, setConfirmOpen] = useState(false);

  // Item
  const item: Product = {
    id: id,
    name: name,
    detail: detail,
    imageUrl: "https://images.unsplash.com/photo-1545289414-1c3cb1c06238?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80",
    price: price,
  }

  // Fields
  const fields = <>
    <TextField
      autoFocus
      margin="dense"
      id="id"
      label="Codigo"
      type="number"
      fullWidth
      variant="standard"
      value={id}
      onChange={(event: React.ChangeEvent<HTMLInputElement>) => setId(Number(event.target.value)) }
    />
    <TextField
      autoFocus
      margin="dense"
      id="name"
      label="Nombre"
      type="text"
      fullWidth
      variant="standard"
      value={name}
      onChange={(event: React.ChangeEvent<HTMLInputElement>) => setName(event.target.value) }
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
      value={detail}
      onChange={(event: React.ChangeEvent<HTMLInputElement>) => setDetail(event.target.value) }
    />
    <TextField
      autoFocus
      margin="dense"
      id="price"
      label="Precio"
      type="number"
      fullWidth
      variant="standard"
      value={price}
      onChange={(event: React.ChangeEvent<HTMLInputElement>) => setPrice(Number(event.target.value)) }
    />
  </>

  // Functions 
  const addItem = async () => {
    await dispatch(addProduct(item))
    
    setId(0)
    setName('')
    setDetail('')
    setPrice(0)
  } 

  return (
    <>
      <Box sx={{ width: '100%', height: '100%' }}>
        <Typography variant="h3" gutterBottom>
          {title}
        </Typography>
        <ConfirmDialog
          title="Eliminar Item?"
          open={confirmOpen}
          setOpen={setConfirmOpen}
          onConfirm={deleteItem}
        >
          {confirm_delete}
        </ConfirmDialog>
        <Button variant="outlined" onClick={() => setConfirmOpen(true)}>{<><DeleteIcon /> Borrar Seleccionados</>}</Button>
        <FormDialog title={add_title} button_title={<><AddIcon /> Agregar</>} text={add_message} subscribe={addItem}>
          {fields}
        </FormDialog>
        {rows.fetchStatus === "error" && <Alert severity="error">Ocurrio un error al obtener los datos!</Alert>}
        {rows.fetchStatus === "loading" && <Box sx={{ width: '100%' }}><LinearProgress /></Box>}
        {rows.fetchStatus === "success" && <Table rows={rows.data} columns={columns}></Table>}
      </Box>
    </>
  );
}
