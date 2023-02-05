import ConfirmDialog from './ConfimDialog';
import FormDialog from './FormDialog';
import Table from "../components/Table";

// MUI
import { Alert, Box, LinearProgress, Typography } from '@mui/material';
import Button from '@mui/material/Button';
import { GridColDef, GridColumnVisibilityModel } from '@mui/x-data-grid';
import AddIcon from '@mui/icons-material/Add';

interface PropsType {
    title: String,
    rows: any,
    columns: GridColDef[],
    columnVisibilityModel: GridColumnVisibilityModel,
    children: any,
    addTitle: string,
    addOpen: boolean,
    addItem: any,
    closeAdd: any,
    setAddOpen: any,
    editTitle: string,
    editOpen: boolean,
    editItem: any,
    closeEdit: any,
    confirmDeleteOpen: any,
    setConfirmDeleteOpen: any,
    deleteItem: any,
}

export default function Crud(props: PropsType) {
    const {
        title,
        rows,
        columns,
        columnVisibilityModel,
        children,
        addOpen,
        addTitle,
        addItem,
        closeAdd,
        editOpen,
        setAddOpen,
        editTitle,
        closeEdit,
        editItem,
        confirmDeleteOpen,
        setConfirmDeleteOpen,
        deleteItem
    } = props;

    return (
        <Box sx={{ width: '100%', height: '100%' }}>
            <Typography variant="h3" gutterBottom>
                <strong>
                    {title}
                </strong>
                <Button sx={{ marginLeft: 2 }} size="small" variant="contained" onClick={() => setAddOpen(true)}>
                    <AddIcon />
                </Button>
            </Typography>
            <ConfirmDialog
                title="Eliminar?"
                open={confirmDeleteOpen}
                setOpen={setConfirmDeleteOpen}
                onConfirm={deleteItem}
            >
                Seguro desea eliminar este elemento?
            </ConfirmDialog>
            <FormDialog title={addTitle} open={addOpen} text="Asegurese de que el codigo sea diferente a alguno ya existente" subscribe={addItem} setClose={closeAdd}>
                {children}
            </FormDialog>
            <FormDialog title={editTitle} open={editOpen} text="Para cambiar el codigo debera eliminar y volver a crear" subscribe={editItem} setClose={closeEdit}>
                {children}
            </FormDialog>
            {rows.fetchStatus === "error" && <Alert severity="error">Ocurrio un error al obtener los datos!</Alert>}
            {rows.fetchStatus === "loading" && <Box sx={{ width: '100%' }}><LinearProgress /></Box>}
            {rows.fetchStatus === "success" && <Table rows={rows.data} columns={columns} columnVisibilityModel={columnVisibilityModel}></Table>}
        </Box>
    );
}