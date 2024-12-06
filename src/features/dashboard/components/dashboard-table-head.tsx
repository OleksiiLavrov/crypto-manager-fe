import { Box, TableCell, TableHead, TableRow } from '@mui/material';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import useDashboardTableStore from '../../../store/dashboard-table-store';
import { CoinModel } from '../../../types/models';

const DashboardTableCell = ({ label, source }: { label: string, source: keyof CoinModel | '' }) => {
   const { setCoinsSortingRule, coinsSortingRule } = useDashboardTableStore();

   return (
      <TableCell 
         sx={{ 
            border: '1px solid #cecece',
            fontWeight: 700,
            backgroundColor: "#1976d2",
            color: "#ffffff",
            cursor: 'pointer',
         }}
         onClick={() => source && setCoinsSortingRule(source)}
      >
         <Box sx={{ display: 'flex' }}>
            {label}
            {source === coinsSortingRule.rule && (coinsSortingRule.direction === 'ASC' ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />)}
         </Box>
      </TableCell>
   );
}

export const DashboardTableHead = () => {
   return (
      <TableHead>
         <TableRow>
            <DashboardTableCell source="name" label="Name" />
            <DashboardTableCell source="price" label="Current price" />
            <DashboardTableCell source="totalAmount" label="Total amount" />
            <DashboardTableCell source="avg" label="Average price" />
            <DashboardTableCell source="totalValue" label="Total value" />
            <DashboardTableCell source="totalInvested" label="Total invested" />
            <DashboardTableCell source="pnl" label="PNL" />
            <DashboardTableCell source="updatedAt" label="Updated At" />
            <DashboardTableCell source="createdAt" label="Created At" />
            <DashboardTableCell source="" label="" />
         </TableRow>
      </TableHead>
   );
};
