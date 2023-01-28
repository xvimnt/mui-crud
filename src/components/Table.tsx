import { DataGrid, GridColDef,GridRowsProp } from '@mui/x-data-grid';

interface PropsType {
    rows: GridRowsProp,
    columns: GridColDef[],
}

export default function Table(props: PropsType) {
  return (
    <div style={{ height: 420, width: '100%' }}>
      <DataGrid
        rows={props.rows}
        columns={props.columns}
        pageSize={6}
        rowsPerPageOptions={[6]}
        checkboxSelection
      />
    </div>
  );
}