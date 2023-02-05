import { useEffect, useState } from "react";

// MUI
import TextField from '@mui/material/TextField';
import { GridColDef, GridColumnVisibilityModel } from '@mui/x-data-grid';
import { Autocomplete, Box, Button, ButtonGroup, Grid, Typography } from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import { Add, Delete } from "@mui/icons-material";

// API
import { getAllOrders, addOrder, deleteOrder, updateOrder } from "./api";
import { selectOrders } from "./slice";
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { Order as Interface, OrderItem } from "./schema";

// Services
import Crud from "../../components/Crud";
import { getAllProducts } from "../products/api";
import { selectProducts } from "../products/slice";
import { Product } from "../products/schema";

export default function Orders() {

  // Get Rows
  const rows = useAppSelector(selectOrders);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getAllOrders())
  }, [dispatch])

  const products = useAppSelector(selectProducts);
  useEffect(() => {
    dispatch(getAllProducts())
  }, [dispatch])


  // Strings
  const title = "Ordenes"
  const addTitle = "Agregar Orden"
  const editTitle = "Editar Orden"

  // States 
  const [confirmDeleteOpen, setConfirmDeleteOpen] = useState(false);
  const [addOpen, setAddOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [, setEmptyField] = useState(false);
  const [quantity, setQuantity] = useState(0);
  const [inputValue, setInputValue] = useState('');
  // Item
  const defaultItem: Interface = {
    id: 0,
    date: '',
    state: 'pending',
    items: []
  }

  const [item, setItem] = useState<Interface>(defaultItem)

  // Functions 
  const resetStates = () => {
    setItem(defaultItem)
    setEmptyField(false)
  }

  const verifyFields = () => {
    setEmptyField(false)

    // Verify if required fields are valid
    if (item.id > 0 && item.date && item.state) {
      // Edit doesn't need to compare codes
      if (editOpen) return true
      // Look for existing code
      const index = rows.data.findIndex((e) => e.id === item.id);
      if (index === -1) {
        return true
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
      dispatch(addOrder(item))
      resetStates()
    }
  }

  const editItem = async () => {
    // Verifying empty fields
    if (verifyFields()) {
      dispatch(updateOrder(item))
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
    await dispatch(deleteOrder(item))
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
          const Order: Interface = params.row
          setItem(Order)
          // Do any action
          submitFunction()
        };

        return (
          <ButtonGroup variant="contained" aria-label="outlined primary button group">
            <Button size="small" onClick={(e) => onClick(e, () => setEditOpen(true))}><EditIcon></EditIcon></Button>
          </ButtonGroup>
        );
      }
    },
    { field: 'id', headerName: 'ID', flex: 2, type: 'number' },
    { field: 'date', headerName: 'Fecha', flex: 10 },
    { field: 'state', headerName: 'Estado', flex: 10 },

  ];
  // Hide columns
  const columnVisibilityModel: GridColumnVisibilityModel = {
    imageUrl: false
  }

  // Add new Item
  const addNewItem = () => {
    // Obtaining the id from the select label
    const id =  Number(inputValue.split('-')[0].trim())
    const product = products.data.find(e => e.id === id)
    if(product) {
      const existProduct = item.items.find(e => e.id === id)
      if(existProduct) {
        // Updating quantity
        const newItem = {...existProduct}
        newItem.quantity += quantity
        let newItems = [...item.items]
        // Removing and ading the updated item
        newItems = newItems.filter(el => el.id !== id)
        newItems = [...newItems, newItem]
        setItem({ ...item, items: newItems })
      }
      else {
        // Creating a new Order Item and adding to the Order
        const newItem = {
          id:  id,
          name:  product.name,
          imageUrl: product.imageUrl,
          quantity: quantity,
          price: product.price,
        }
        const newItems = [...item.items, newItem]
        setItem({ ...item, items: newItems })
      }
    }
  }

  const removeItem = (name: string) => {
    let newItems = [...item.items]
    newItems = newItems.filter(el => el.name !== name)
    setItem({...item, items: newItems})
  }

  return (
    <>
      <Crud
        title={title} rows={rows} columns={columns} columnVisibilityModel={columnVisibilityModel}
        addTitle={addTitle} addOpen={addOpen} addItem={addItem} setAddOpen={setAddOpen} closeAdd={closeAdd}
        editItem={editItem} editOpen={editOpen} editTitle={editTitle} closeEdit={closeEdit}
        deleteItem={deleteItem} confirmDeleteOpen={confirmDeleteOpen} setConfirmDeleteOpen={setConfirmDeleteOpen}>
        <form>
          <Grid container sx={{ marginTop: 2 }}>
            <Grid item md={8} sx={{ padding: 1 }}>
              <Autocomplete
                options={products.data}
                getOptionLabel={(option: Product) => `${option.id} - ${option.name}`}
                inputValue={inputValue}
                onInputChange={(event, newInputValue) => {
                  setInputValue(newInputValue);
                }}
                renderInput={(params) => <TextField {...params} label="Producto" />}
              />
            </Grid>
            <Grid item md={2} sx={{ padding: 1 }}>
              <TextField type="number" label="Cantidad" value={quantity} onChange={e => setQuantity(Number(e.target.value))}></TextField>
            </Grid>
            <Grid item md={2} sx={{ padding: 1 }} >
              <Button variant="contained" sx={{ height: '100%' }} onClick={addNewItem} ><Add /></Button>
            </Grid>
            <Grid container spacing={3}>
              {item.items?.map((item: any) => (
                <Grid item key={item.name} xs={12} sm={12} md={6}>
                  <center>
                    <Box
                      component="img" alt={item.name} src={item.imageUrl}
                      sx={{
                        marginTop: 3,
                        height: 233,
                        width: 250,
                        maxHeight: { xs: 233, md: 167 },
                        maxWidth: { xs: 350, md: 250 },
                      }}
                    />
                    <Box>
                      <Typography variant="subtitle1">
                        <strong>{item.name}</strong>
                      </Typography>
                      <Typography variant="subtitle2">
                        {`Cantidad: ${item.quantity}`}<br />
                      </Typography>
                      <Typography variant="subtitle2">
                        {`Precio Unitario: Q.${item.price}`}
                      </Typography>
                      <Button variant="outlined" color="error" size="small" onClick={() => removeItem(item.name)}><Delete /></Button>
                    </Box>
                  </center>
                </Grid>
              ))}
            </Grid>
          </Grid>
        </form>
      </Crud>
    </>
  );
}
