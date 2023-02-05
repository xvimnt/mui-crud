import { useEffect, useState } from "react";

// MUI
import TextField from '@mui/material/TextField';
import { GridColDef, GridColumnVisibilityModel } from '@mui/x-data-grid';
import { Alert, Button, ButtonGroup } from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

// API
import { getAllCategories, addCategory, deleteCategory, updateCategory } from "./api";
import { selectCategories } from "./slice";
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { Category as Interface } from "./schema";
import Crud from "../../components/Crud";

export default function Categories() {

  // Get Rows
  const dispatch = useAppDispatch();
  const rows = useAppSelector(selectCategories);
  useEffect(() => {
    dispatch(getAllCategories())
  }, [dispatch])

  // Strings
  const title = "Categorias"
  const addTitle = "Agregar Nuevo Categoria"
  const editTitle = "Editar Categoria"
  const text = "Para cambiar el codigo de la categoria debera eliminarla y volverla a crear"

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
    <Crud 
    title={title} rows={rows} columns={columns} columnVisibilityModel={columnVisibilityModel} text={text}
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
      </form>
    </Crud>
    </>
  );
}
