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
import { Product as Interface } from "./schema";
import UploadImages from "../../components/UploadImages";

// Services
import uploadFileToS3 from '../../services/uploadFileToS3'

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
  const edit_message = "Si modifica el codigo el articulo se duplicara"
  const edit_title = "Editar Producto"
  
  // States 
  const [confirmDeleteOpen, setConfirmDeleteOpen] = useState(false);
  const [addOpen, setAddOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [emptyField, setEmptyField] = useState(false);
  const [duplicatedCode, setDuplicatedCode] = useState(false);
  const [file, setFile] = useState(undefined)
  const [preview, setPreview] = useState(undefined)
  
  // Item
  const defaultItem: Interface = {
    id: 0,
    name: '',
    detail: '',
    imageUrl: '',
    price: 0,
    stock: 0,
  }
  const [item, setItem] = useState<Interface>(defaultItem)
  
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
    {item.imageUrl && <center>
      <Box
        component="img"
        sx={{
          marginTop: 3,
          height: 233,
          width: 350,
          maxHeight: { xs: 233, md: 167 },
          maxWidth: { xs: 350, md: 250 },
        }}
        alt="Product Image"
        src={item.imageUrl}
      />
    </center>}
    <center>
      <UploadImages setFile={setFile} setPreview={setPreview} preview={preview} file={file}></UploadImages>
    </center>
  </form>

// Functions 
const resetStates = () => {
  setItem(defaultItem)
  setFile(undefined)
  setPreview(undefined)
  setEmptyField(false)
  setDuplicatedCode(false)
}

const addItem = async () => {
  // Verifying empty fields
  if (item.id && item.name && item.detail && item.price) {
    // Verifying if code exists in table
    const index = rows.data.findIndex((e) => e.id === item.id);
    if (index === -1) {
      // Set the url from the img in S3
      const handleUrl = (url: string) => {
        item.imageUrl = url
        dispatch(addProduct(item))
        resetStates()
      }
      // Upload the image to S3 and then the item to DynamoDB
      uploadFileToS3(file, "vsms-products", handleUrl)
    } else {
      setDuplicatedCode(true)
      }
    } else {
      setEmptyField(true)
    }
    resetStates()
  }
  
  const closeAdd = () => {
    setAddOpen(false)
    resetStates()
  }
  
  const editItem = async () => {
    // Verifying empty fields
    if (item.id && item.name && item.detail && item.price) {
      await dispatch(updateProduct(item))
      setEditOpen(false)
    } else {
      setEmptyField(true)
    }
    setItem(defaultItem)
  }
  
  const closeEdit = () => {
    setEditOpen(false)
    resetStates()
  }

  const deleteItem = async () => {
    await dispatch(deleteProduct(item))
    setConfirmDeleteOpen(false)
    setItem(defaultItem)
  }
  
  // Columns definition
  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'name', headerName: 'Nombre', width: 430 },
    { field: 'detail', headerName: 'Detalle', width: 630 },
    { field: 'price', headerName: 'Precio', width: 330, type: 'number' },
    { field: 'imageUrl', headerName: 'Image Url', width: 330},
    {
      field: "action",
      headerName: "Action",
      width: 130,
      sortable: false,
      renderCell: (params) => {
        const onClick = (e: any, submitFunction: Function) => {
          e.stopPropagation(); // don't select this row after clicking
          // Select the item from the row
          const product: Interface = params.row
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
          {duplicatedCode && <Alert severity="error">Codigo Existente!</Alert>}
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
