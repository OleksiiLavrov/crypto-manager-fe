import { Box } from '@mui/material';
import { Link, Outlet } from 'react-router-dom';

export const App = () => {
   return (
      <Box>
         <Box
            sx={{
               display: 'flex',
               justifyContent: 'center',
               gap: '10px',
               borderBottom: '1px solid rgba(0,0,0,0.1)',
            }}
            py={3}
            mb={2}
         >
            <Link to="/dashboard">Dashboard</Link>
            <Link to="/add-transaction">Add transaction</Link>
         </Box>
         <Outlet />
      </Box>
   );
};
