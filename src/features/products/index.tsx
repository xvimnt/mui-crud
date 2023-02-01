import { useEffect, useState } from "react";

// Components
import Table from "../../components/Table";
import FormDialog from "../../components/FormDialog";
import ConfirmDialog from "../../components/ConfimDialog";

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
import { getAllProducts, addProduct, deleteProduct, updateProduct } from "./api";
import { selectProducts } from "./slice";
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { Product } from "./schema";

export default function Products() {

  // Get Rows
  const rows = useAppSelector(selectProducts);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getAllProducts())
  }, [dispatch])

  // Strings
  const title = "Productos"
  const confirm_delete = "Estas seguro de querer eliminar este producto?"
  const add_message = "Asegurese de que el codigo sea diferente a alguno ya existente"
  const add_title = "Agregar Nuevo Producto"
  const edit_message = "El codigo no se podra modificar, para esto tendra que eliminar y volver a crear"
  const edit_title = "Editar Producto"

  // States 
  const [confirmDeleteOpen, setConfirmDeleteOpen] = useState(false);
  const [addOpen, setAddOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [emptyField, setEmptyField] = useState(false);

  // Item
  const defaultItem: Product = {
    id: 0,
    name: '',
    detail: '',
    imageUrl: "https://images.unsplash.com/photo-1545289414-1c3cb1c06238?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80",
    price: 0,
  }
  const [item, setItem] = useState<Product>(defaultItem)


  // Fields
  const fields = <form>
    <TextField
      autoFocus
      required
      error={emptyField && item.id === defaultItem.id}
      margin="dense"
      id="id"
      label="Codigo"
      type="number"
      fullWidth
      variant="standard"
      value={item.id}
      onChange={(event: React.ChangeEvent<HTMLInputElement>) => setItem({ ...item, id: Number(event.target.value) })}
    />
    <TextField
      autoFocus
      required
      error={emptyField && item.name === defaultItem.name}
      margin="dense"
      id="name"
      label="Nombre"
      type="text"
      fullWidth
      variant="standard"
      value={item.name}
      onChange={(event: React.ChangeEvent<HTMLInputElement>) => setItem({ ...item, name: event.target.value })}
    />
    <TextField
      autoFocus
      required
      error={emptyField && item.detail === defaultItem.detail}
      margin="dense"
      id="detail"
      label="Detalle"
      type="text"
      fullWidth
      variant="standard"
      multiline
      maxRows={4}
      value={item.detail}
      onChange={(event: React.ChangeEvent<HTMLInputElement>) => setItem({ ...item, detail: event.target.value })}
    />
    <TextField
      autoFocus
      required
      error={emptyField && item.price === defaultItem.price}
      margin="dense"
      id="price"
      label="Precio"
      type="number"
      fullWidth
      variant="standard"
      value={item.price}
      onChange={(event: React.ChangeEvent<HTMLInputElement>) => setItem({ ...item, price: Number(event.target.value) })}
    />
  </form>

  // Functions 
  const addItem = async () => {
    if (item.id && item.name && item.detail && item.price) {
      await dispatch(addProduct(item))
      setItem(defaultItem)
    } else {
      setEmptyField(true)
    }
  }

  const closeAdd = () => {
    setAddOpen(false)
    setItem(defaultItem)
    setEmptyField(false)
  }

  const editItem = async () => {
    if (item.id && item.name && item.detail && item.price) {
      await dispatch(updateProduct(item))
      setEditOpen(false)
    } else {
      setEmptyField(true)
    }
  }

  const closeEdit = () => {
    setEditOpen(false)
    setItem(defaultItem)
    setEmptyField(false)
  }

  const deleteItem = async () => {
    await dispatch(deleteProduct(item))
    setConfirmDeleteOpen(false)
  }

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
          // Select the item from the row
          const product: Product = params.row
          setItem(product)
          // Do any action
          submitFunction()
        };

        return (
          <ButtonGroup variant="contained" aria-label="outlined primary button group">
            <Button size="small" onClick={(e) => onClick(e, () => setEditOpen(true))}><EditIcon></EditIcon></Button>
            <Button size="small" onClick={(e) => onClick(e, () => setConfirmDeleteOpen(true))}><DeleteIcon></DeleteIcon></Button>
          </ButtonGroup>
        );
      }
    },
  ];

  return (
    <>
      <Box sx={{ width: '100%', height: '100%' }}>
        <Typography variant="h3" gutterBottom>
          {title}
          <Button sx={{ marginLeft: 2 }} size="small" variant="contained" onClick={() => setAddOpen(true)}>
            <AddIcon />
          </Button>
        </Typography>
        <ConfirmDialog
          title="Eliminar Item?"
          open={confirmDeleteOpen}
          setOpen={setConfirmDeleteOpen}
          onConfirm={deleteItem}
        >
          {confirm_delete}
        </ConfirmDialog>
        <FormDialog title={add_title} open={addOpen} text={add_message} subscribe={addItem} setClose={closeAdd}>
          {fields}
        </FormDialog>
        <FormDialog title={edit_title} open={editOpen} text={edit_message} subscribe={editItem} setClose={closeEdit}>
          {fields}
        </FormDialog>
        {rows.fetchStatus === "error" && <Alert severity="error">Ocurrio un error al obtener los datos!</Alert>}
        {rows.fetchStatus === "loading" && <Box sx={{ width: '100%' }}><LinearProgress /></Box>}
        {rows.fetchStatus === "success" && <Table rows={rows.data} columns={columns}></Table>}
      </Box>
    </>
  );
}
