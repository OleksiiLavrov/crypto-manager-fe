import { TableCell, TableHead, TableRow } from '@mui/material';

const DashboardTableCell = ({ label }: { label: string }) => (
   <TableCell sx={{ border: '1px solid #cecece', fontWeight: 700 }}>{label}</TableCell>
);

export const DashboardTableHead = () => {
   return (
      <TableHead>
         <TableRow>
            <DashboardTableCell label="Name" />
            <DashboardTableCell label="Current price" />
            <DashboardTableCell label="Total amount" />
            <DashboardTableCell label="Average price" />
            <DashboardTableCell label="Total value" />
            <DashboardTableCell label="Total invested" />
            <DashboardTableCell label="PNL" />
            <DashboardTableCell label="Updated At" />
            <DashboardTableCell label="Created At" />
         </TableRow>
      </TableHead>
   );
};
