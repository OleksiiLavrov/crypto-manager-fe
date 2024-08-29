import { TableCell, TableRow } from '@mui/material';

export const DashboardTableFoot = ({ rowData }: { rowData: { [key: string]: any } }) => {
   const { total_value, total_invested, pnl, backgroundColor } = rowData;
   return (
      <TableRow>
         <TableCell sx={{ border: '1px solid #cecece' }}></TableCell>
         <TableCell sx={{ border: '1px solid #cecece' }}></TableCell>
         <TableCell sx={{ border: '1px solid #cecece' }}></TableCell>
         <TableCell sx={{ border: '1px solid #cecece' }}></TableCell>
         <TableCell sx={{ border: '1px solid #cecece', fontWeight: 700 }}>{total_value}</TableCell>
         <TableCell sx={{ border: '1px solid #cecece', fontWeight: 700 }}>
            {total_invested}
         </TableCell>
         <TableCell
            sx={{
               backgroundColor,
               fontWeight: 700,
               border: '1px solid #cecece',
            }}
         >
            {pnl}%
         </TableCell>
         <TableCell sx={{ border: '1px solid #cecece' }}></TableCell>
         <TableCell sx={{ border: '1px solid #cecece' }}></TableCell>
      </TableRow>
   );
};
