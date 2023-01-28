import { DataGrid, GridColDef, GridRowsProp } from '@mui/x-data-grid';

interface PropsType {
  rows: GridRowsProp,
  columns: GridColDef[],
}

export default function Table(props: PropsType) {
  const { rows, columns } = props
  return (
    <div style={{ height: 420, width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={6}
        rowsPerPageOptions={[6]}
        checkboxSelection
      />
    </div>
  );
}