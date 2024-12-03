import { styled, TableCell, TableRow } from '@mui/material';

const StyledTableCell = styled(TableCell)(() => ({
   border: '1px solid #cecece',
   textAlign: 'center',
   color: "#ffffff" 
}));

export const DashboardTableFoot = ({ rowData }: { rowData: { [key: string]: any } }) => {
   const { total_value, total_invested, pnl, backgroundColor } = rowData;
   return (
      <TableRow sx={{ backgroundColor: "#1976d2"}}>
         <StyledTableCell
            sx={{ fontWeight: 700, textTransform: 'uppercase', textAlign: 'left' }}
         >
            Total
         </StyledTableCell>
         <StyledTableCell></StyledTableCell>
         <StyledTableCell></StyledTableCell>
         <StyledTableCell></StyledTableCell>
         <StyledTableCell sx={{ fontWeight: 700 }}>
            {total_value}
            <sup style={{color: (total_value - total_invested) > 0 ? '#90ee90' : '#fc4454'}}>
               {total_value - total_invested > 0 ? ' +' : ' -'}
               {(total_value - total_invested).toFixed(2)}$
            </sup>
         </StyledTableCell>
         <StyledTableCell sx={{ fontWeight: 700 }}>
            {total_invested}$
         </StyledTableCell>
         <StyledTableCell
            sx={{
               backgroundColor,
               fontWeight: 700,
               border: '1px solid #cecece',
            }}
         >
            {pnl}%
         </StyledTableCell>
         <StyledTableCell></StyledTableCell>
         <StyledTableCell></StyledTableCell>
         <StyledTableCell></StyledTableCell>
      </TableRow>
   );
};
