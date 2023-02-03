import { useEffect, useState } from "react";

// MUI
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { GridColDef, GridColumnVisibilityModel } from '@mui/x-data-grid';
import { Alert, Button, ButtonGroup, MenuItem } from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

// API
import { getAllProducts, addProduct, deleteProduct, updateProduct } from "./api";
import { selectProducts } from "./slice";
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { Product as Interface } from "./schema";
import UploadImages from "../../components/UploadImages";

// Categories
import { selectCategories } from "../categories/slice";
import { getAllCategories } from "../categories/api";
// Services
import uploadFileToS3 from '../../services/uploadFileToS3'
import Crud from "../../components/Crud";

export default function Products() {

  // Get Rows
  const rows = useAppSelector(selectProducts);
  const categories = useAppSelector(selectCategories);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getAllCategories())
  }, [dispatch])
  useEffect(() => {
    dispatch(getAllProducts())
  }, [dispatch])

  // Strings
  const title = "Productos"
  const addTitle = "Agregar Producto"
  const editTitle = "Editar Producto"

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
    category: '',
    detail: '',
    imageUrl: '',
    price: 0,
    stock: 0,
  }
  const [item, setItem] = useState<Interface>(defaultItem)

  // Functions 
  const resetStates = () => {
    setItem(defaultItem)
    setFile(undefined)
    setPreview(undefined)
    setEmptyField(false)
    setDuplicatedCode(false)
  }

  const verifyFields = () => {
    setDuplicatedCode(false)
    setEmptyField(false)

    // Verify if required fields are valid
    if (item.id > 0 && item.name && item.detail && item.price && (item.stock >= 0) && (item.imageUrl || preview)) {
      // Edit doesn't need to compare codes
      if (editOpen) return true
      // Look for existing code
      const index = rows.data.findIndex((e) => e.id === item.id);
      if (index === -1) {
        return true
      } else {
        setDuplicatedCode(true)
      }
    }
    else {
      setEmptyField(true)
    }
    return false
  }

  const addItem = async () => {
    // Verifying empty fields
    if (verifyFields()) {
      // Set the url from the img in S3
      const handleUrl = (url: string) => {
        const newItem = { ...item }
        newItem.imageUrl = url
        dispatch(addProduct(newItem))
        resetStates()
      }
      // Upload the image to S3 and then the item to DynamoDB
      uploadFileToS3(file, "vsms-products", handleUrl)
    }
  }

  const editItem = async () => {
    // Verifying empty fields
    if (verifyFields()) {
      // Set the url from the img in S3
      const handleUrl = (url: string) => {
        const newItem = { ...item }
        if (item.imageUrl !== url) {
          // Set the new Image
          newItem.imageUrl = url
          setItem(newItem)
        }
        dispatch(updateProduct(newItem))
        resetStates()
        setEditOpen(false)
      }
      // Upload the image to S3 and then the item to DynamoDB
      // If the img is the same don't do anything and just call the function above
      if (preview) {
        uploadFileToS3(file, "vsms-products", handleUrl)
      } else {
        handleUrl(item.imageUrl)
      }
    }
  }

  const closeAdd = () => {
    setAddOpen(false)
    resetStates()
  }

  const closeEdit = () => {
    setEditOpen(false)
    resetStates()
  }

  const deleteItem = async () => {
    await dispatch(deleteProduct(item))
    setConfirmDeleteOpen(false)
    resetStates()
  }

  // Columns definition
  const columns: GridColDef[] = [
    {
      field: "action",
      headerName: "Action",
      flex: 5,
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
    { field: 'id', headerName: 'ID', flex: 2, type: 'number' },
    { field: 'name', headerName: 'Nombre', flex: 10 },
    { field: 'detail', headerName: 'Detalle', flex: 10 },
    { field: 'category', headerName: 'Categoria', flex: 10 },
    { field: 'price', headerName: 'Precio', flex: 5, type: 'number' },
    { field: 'imageUrl', headerName: 'Image Url', flex: 10 },
    { field: 'stock', headerName: 'Disponibles', flex: 5, type: 'number' },

  ];
  // Hide columns
  const columnVisibilityModel: GridColumnVisibilityModel = {
    imageUrl: false
  }

  return (
    <Crud 
    title={title} rows={rows} columns={columns} columnVisibilityModel={columnVisibilityModel} 
    addTitle={addTitle} addOpen={addOpen} addItem={addItem} setAddOpen={setAddOpen} closeAdd={closeAdd}
    editItem={editItem} editOpen={editOpen} editTitle={editTitle} closeEdit={closeEdit}
    deleteItem={deleteItem} confirmDeleteOpen={confirmDeleteOpen} setConfirmDeleteOpen={setConfirmDeleteOpen}>
      <form>
        {duplicatedCode && <Alert severity="error">Codigo Existente!</Alert>}
        <TextField 
          autoFocus fullWidth required disabled={editOpen} error={emptyField && item.id <= 0}
          margin="dense" id="id" label="Codigo" type="number" variant="standard"
          value={item.id}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
            setItem({ ...item, id: Number(event.target.value) })}
        />
        <TextField
          select fullWidth autoFocus required error={emptyField && item.category === defaultItem.category}
          label="Categoria" variant="standard"
          value={item.category}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
            setItem({ ...item, category: event.target.value })}
        >
          {categories.data.map((option) => (
            <MenuItem key={option.id} value={option.name}>
              {option.name}
            </MenuItem>
          ))}
        </TextField>
        <TextField autoFocus fullWidth required error={emptyField && item.name === defaultItem.name}
          margin="dense" id="name" label="Nombre" type="text" variant="standard"
          value={item.name}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
            setItem({ ...item, name: event.target.value })}
        />
        <TextField
          autoFocus fullWidth required error={emptyField && item.detail === defaultItem.detail} multiline
          margin="dense" id="detail" label="Detalle" type="text" variant="standard" maxRows={4}
          value={item.detail}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
            setItem({ ...item, detail: event.target.value })}
        />
        <TextField
          autoFocus fullWidth required error={emptyField && item.price === defaultItem.price}
          margin="dense" id="price" label="Precio" type="number" variant="standard"
          value={item.price}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
            setItem({ ...item, price: Number(event.target.value) })}
        />
        <TextField
          autoFocus fullWidth required error={emptyField && item.stock < 0}
          margin="dense" id="stock" label="Disponibles" type="number" variant="standard"
          value={item.stock}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
            setItem({ ...item, stock: Number(event.target.value) })}
        />
        {item.imageUrl && !preview && <center>
          <Box 
            component="img" alt="Product Image" src={item.imageUrl}
            sx={{ 
              marginTop: 3,
              height: 233,
              width: 350,
              maxHeight: { xs: 233, md: 167 },
              maxWidth: { xs: 350, md: 250 },
            }}
          />
        </center>}
        <center>
          {emptyField &&
            (item.imageUrl === "" && preview === undefined) &&
            <Alert severity="error">No ha seleccionado ninguna imagen!</Alert>}
          <UploadImages setFile={setFile} setPreview={setPreview} preview={preview} file={file}></UploadImages>
        </center>
      </form>
    </Crud>
  );
}
