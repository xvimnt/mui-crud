import Table from "../../components/Table";
import FormDialog from "../../components/FormDialog";
// MUI
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { GridApi, GridColDef, GridRowsProp } from '@mui/x-data-grid';
import { Button, ButtonGroup } from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

// Data
const columns: GridColDef[] = [
  { field: 'id', headerName: 'ID', width: 70 },
  { field: 'firstName', headerName: 'First name', width: 430 },
  { field: 'lastName', headerName: 'Last name', width: 430 },
  {
    field: 'age',
    headerName: 'Age',
    type: 'number',
    width: 90,
  },
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
            (c) => (thisRow[c.field] = params.getValue(params.id, c.field))
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

const rows: GridRowsProp = [
  { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
  { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
  { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
  { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 },
  { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
  { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
  { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
  { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
  { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
];

export default function Products() {
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
        <Table rows={rows} columns={columns}></Table>
      </Box>
    </>
  );
}
