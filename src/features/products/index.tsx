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
import { getAllProducts, addProduct, deleteProduct, updateProduct  } from "./api";
import { useEffect } from "react";
import { selectProducts } from "./slice";
import { useAppSelector, useAppDispatch } from '../../app/hooks';

const columns: GridColDef[] = [
  { field: 'id', headerName: 'ID', width: 70 },
  { field: 'detail', headerName: 'Detalle', width: 430 },
  { field: 'name', headerName: 'Nombre', width: 430 },
  { field: 'price', headerName: 'Precio', width: 430 },
  {
    field: "action",
    headerName: "Action",
    width: 130,
    sortable: false,
    renderCell: (params) => {
      const onClick = (e: any) => {
        e.stopPropagation(); // don't select this row after clicking

        const api: GridApi = params.api;
        const thisRow: Record<string, any> = {};

        api
          .getAllColumns()
          .filter((c) => c.field !== "__check__" && !!c)
          .forEach(
            (c) => (thisRow[c.field] = params.row[c.field])
          );

        return alert(JSON.stringify(thisRow, null, 4));
      };

      return (
        <ButtonGroup variant="contained" aria-label="outlined primary button group">
          <Button size="small" onClick={onClick}><EditIcon></EditIcon></Button>
          <Button size="small" onClick={onClick}><DeleteIcon></DeleteIcon></Button>
        </ButtonGroup>
      );
    }
  },
];

export default function Products() {

  const products = useAppSelector(selectProducts);
  const dispatch = useAppDispatch();
  
  useEffect(() => {
    dispatch(getAllProducts())
  }, [dispatch])
  
  return (
    <>
      <Box sx={{ width: '100%', height: '100%' }}>
        <Typography variant="h3" gutterBottom>
          Productos
        </Typography>
        <FormDialog title="Agregar Nuevo Producto" button_title={"Agregar nuevo"}>
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
        <Button variant="outlined">Borrar Seleccionados</Button>
        {products.fetchStatus === "error" && <Alert severity="error">Ocurrio un error al obtener los datos!</Alert>}
        {products.fetchStatus === "loading" && <Box sx={{ display: 'flex' }}><LinearProgress /></Box>}
        {products.fetchStatus === "success" && <Table rows={products.data} columns={columns}></Table>}
      </Box>
    </>
  );
}
