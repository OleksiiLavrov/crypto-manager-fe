import { IconButton, styled, TableCell, TableRow } from '@mui/material';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { format } from 'date-fns';
import { useCallback, useState } from 'react';
import useDashboardTableStore from '../../../store/dashboard-table-store';
import { useNavigate } from 'react-router-dom';

const StyledTableCell = styled(TableCell)(() => ({
   border: '1px solid #cecece',
   textAlign: 'center',
   maxWidth: '100px',
   overflow: 'hidden',
   textOverflow: 'ellipsis',
   whiteSpace: 'nowrap',
}));

export const DashboardTableRow = ({
   rowData,
   isEven,
}: {
   rowData: { [key: string]: any };
   isEven: boolean;
}) => {
   const navigate = useNavigate();
   const {
      _id,
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
   const { hiddenCoinsIds, setHiddenCoinsIds } = useDashboardTableStore();

   const handleHideCoin = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation();
      setHiddenCoinsIds([...hiddenCoinsIds, _id]);
   }, [_id, hiddenCoinsIds, setHiddenCoinsIds]);

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
         onClick={() => {
            navigate(`/coin/${name}`);
         }}
      >
         <StyledTableCell
            component="th"
            scope="row"
            sx={{
               fontWeight: 700,
               textAlign: 'left',
            }}
         >
            {name}
         </StyledTableCell>
         <StyledTableCell component="th" scope="row">
            {price}
         </StyledTableCell>
         <StyledTableCell>{total_amount}</StyledTableCell>
         <StyledTableCell>{avg}</StyledTableCell>
         <StyledTableCell sx={{fontWeight: 700}}>{total_value}</StyledTableCell>
         <StyledTableCell sx={{fontWeight: 700}}>{total_invested}</StyledTableCell>
         <StyledTableCell
            sx={{
               backgroundColor,
            }}
         >
            {pnl}%
         </StyledTableCell>
         <StyledTableCell>
            {format(new Date(updatedAt), 'MM/dd/yyyy')}
         </StyledTableCell>
         <StyledTableCell>
            {format(new Date(createdAt), 'MM/dd/yyyy')}
         </StyledTableCell>
         <StyledTableCell>
            <IconButton onClick={handleHideCoin}>
               <VisibilityOffIcon sx={{'&:hover': {color: '#1976d2'}}} />
            </IconButton>
         </StyledTableCell>
      </TableRow>
   );
};
