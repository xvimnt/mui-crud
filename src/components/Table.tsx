import { DataGrid, GridColDef, GridColumnVisibilityModel, GridRowsProp } from '@mui/x-data-grid';

interface PropsType {
  rows: GridRowsProp,
  columns: GridColDef[],
  columnVisibilityModel: GridColumnVisibilityModel
}

export default function Table(props: PropsType) {
  const { rows, columns, columnVisibilityModel } = props
  return (
    <div style={{ height: 420, width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={6}
        rowsPerPageOptions={[6]}
        columnVisibilityModel={columnVisibilityModel}
      />
    </div>
  );
}