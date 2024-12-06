import { useState } from 'react';
import { IconButton, Typography, Box } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import useDashboardTableStore from '../../../store/dashboard-table-store';
import useStore from '../../../store/store';

export const Toolbar = () => {
  const [openDropDown, setOpenDropDown] = useState<boolean>(false);
  const { hiddenCoinsIds, setHiddenCoinsIds } = useDashboardTableStore();
  const { coins } = useStore();

  return (
  <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: '16px', gap: '16px' }}>
    <Typography sx={{ fontWeight: 700, backgroundColor: "#1976d2", color: "#ffffff", padding: '8px 16px', borderRadius: '15px' }}>
       Owned coins: {coins.filter((coin) => coin.totalAmount > 0).length}
    </Typography>
    <Box 
       sx={{ position: 'relative', width: '175px', textAlign: 'center', cursor: 'pointer' }} 
       onClick={() => setOpenDropDown(prev => !prev)}
    >
       <Typography 
          sx={{ fontWeight: 700, backgroundColor: "#1976d2", color: "#ffffff", padding: '8px 16px', borderRadius: '15px', cursor: 'pointer' }}
       >
          Hidden coins: {hiddenCoinsIds.length}
       </Typography>
       {openDropDown && hiddenCoinsIds.length > 0 && (
          <Box 
             sx={{ 
                position: 'absolute', 
                top: '110%', 
                left: 0, 
                width: '175px', 
                boxSizing: 'border-box',
                backgroundColor: '#ffffff', 
                padding: '8px 16px', 
                borderRadius: '15px',
                border: '2px solid #1976d2'
             }}
          >
             {coins.map((coin) => {
                if (!hiddenCoinsIds.includes(coin.id)) return null;
                return (
                   <Box 
                      sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '8px', borderBottom: '1px solid #cecece' }}
                   >
                      <Typography sx={{ fontWeight: 700, color: "#000000" }}>
                         {coin.name}
                      </Typography>
                      <IconButton onClick={() => {setHiddenCoinsIds(hiddenCoinsIds.filter((id) => id !== coin.id))}}>
                         <VisibilityIcon sx={{'&:hover': {color: '#1976d2'}}} />
                      </IconButton>
                   </Box>
                )
             })}
          </Box>
       )}
    </Box>
  </Box>
  )
}
