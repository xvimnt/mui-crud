import { useEffect, useState } from "react";

// Components
import Table from "../../components/Table";
import FormDialog from "../../components/FormDialog";
import ConfirmDialog from "../../components/ConfimDialog";

// MUI
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { GridColDef, GridColumnVisibilityModel } from '@mui/x-data-grid';
import { Alert, Button, ButtonGroup, LinearProgress } from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';

// API
import { getAllCategories, addCategory, deleteCategory, updateCategory } from "./api";
import { selectCategories } from "./slice";
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { Category as Interface } from "./schema";

export default function Categories() {

  // Get Rows
  const rows = useAppSelector(selectCategories);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getAllCategories())
  }, [dispatch])

  // Strings
  const title = "Categorias"
  const confirm_delete = "Estas seguro de querer eliminar esta Categoria?"
  const add_message = "Asegurese de que el codigo sea diferente a alguno ya existente"
  const add_title = "Agregar Nuevo Categoria"
  const edit_message = "Para cambiar el codigo debera volver a crear el item"
  const edit_title = "Editar Categoria"

  // States 
  const [confirmDeleteOpen, setConfirmDeleteOpen] = useState(false);
  const [addOpen, setAddOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [emptyField, setEmptyField] = useState(false);
  const [duplicatedCode, setDuplicatedCode] = useState(false);

  // Item
  const defaultItem: Interface = {
    id: 0,
    name: '',
    detail: '',
  }
  const [item, setItem] = useState<Interface>(defaultItem)

  // Fields
  const fields = <form>
    {duplicatedCode && <Alert severity="error">Codigo Existente!</Alert>}
    <TextField
      autoFocus
      required
      disabled={editOpen}
      error={emptyField && item.id <= 0}
      margin="dense"
      id="id"
      label="Codigo"
      type="number"
      fullWidth
      variant="standard"
      value={item.id}
      onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
        setItem({ ...item, id: Number(event.target.value) })}
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
      onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
        setItem({ ...item, name: event.target.value })}
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
      onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
        setItem({ ...item, detail: event.target.value })}
    />
  </form>

  // Functions 
  const resetStates = () => {
    setItem(defaultItem)
    setEmptyField(false)
    setDuplicatedCode(false)
  }

  const verifyFields = () => {
    setDuplicatedCode(false)
    setEmptyField(false)
    // Verify if required fields are valid
    if (item.id > 0 && item.name && item.detail) {
      // Edit doesn't need to compare codes
      if(editOpen) return true
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
      dispatch(addCategory(item))
      resetStates()
    }
  }

  const editItem = async () => {
    // Verifying empty fields
    if (verifyFields()) {
      dispatch(updateCategory(item))
      resetStates()
      setEditOpen(false)
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
    await dispatch(deleteCategory(item))
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
          const Category: Interface = params.row
          setItem(Category)
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

  ];
  // Hide columns
  const columnVisibilityModel: GridColumnVisibilityModel = {
    imageUrl: false
  }

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
        {rows.fetchStatus === "success" && <Table rows={rows.data} columns={columns} columnVisibilityModel={columnVisibilityModel}></Table>}
      </Box>
    </>
  );
}
