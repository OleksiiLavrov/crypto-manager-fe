import { TableCell, TableRow } from '@mui/material';
import { format } from 'date-fns';
import { useState } from 'react';

export const DashboardTableRow = ({
   rowData,
   isEven,
}: {
   rowData: { [key: string]: any };
   isEven: boolean;
}) => {
   const {
      name,
      price,
      total_amount,
      avg,
      total_value,
      total_invested,
      pnl,
      updatedAt,
      createdAt,
      backgroundColor,
   } = rowData;

   const [hovered, setHovered] = useState<boolean>(false);

   return (
      <TableRow
         sx={{
            border: '1px solid #cecece',
            backgroundColor: hovered ? '#cfcfcf' : isEven ? '#f2f2f2' : '#ffffff',
            transition: '0.2s ease-in-out background-color',
            cursor: 'pointer',
         }}
         onMouseEnter={() => {
            setHovered(true);
         }}
         onMouseLeave={() => {
            setHovered(false);
         }}
      >
         <TableCell
            component="th"
            scope="row"
            sx={{ border: '1px solid #cecece', fontWeight: 700 }}
         >
            {name}
         </TableCell>
         <TableCell component="th" scope="row" sx={{ border: '1px solid #cecece' }}>
            {price}
         </TableCell>
         <TableCell sx={{ border: '1px solid #cecece' }}>{total_amount}</TableCell>
         <TableCell sx={{ border: '1px solid #cecece' }}>{avg}</TableCell>
         <TableCell sx={{ border: '1px solid #cecece' }}>{total_value}</TableCell>
         <TableCell sx={{ border: '1px solid #cecece' }}>{total_invested}</TableCell>
         <TableCell
            sx={{
               backgroundColor,
               fontWeight: 700,
               border: '1px solid #cecece',
            }}
         >
            {pnl}%
         </TableCell>
         <TableCell sx={{ border: '1px solid #cecece' }}>
            {format(new Date(updatedAt), 'MM/dd/yyyy')}
         </TableCell>
         <TableCell sx={{ border: '1px solid #cecece' }}>
            {format(new Date(createdAt), 'MM/dd/yyyy')}
         </TableCell>
      </TableRow>
   );
};
