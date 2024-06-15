import { useEffect, useState } from 'react';
import { format } from 'date-fns';
import {
   TableBody,
   Table,
   TableCell,
   TableContainer,
   TableHead,
   TableRow,
   Paper,
} from '@mui/material';
import { CoinModel } from '../../types/models';
import store from './store';

export const Dashboard = () => {
   const [coins, setCoins] = useState<CoinModel[]>([]);

   const getCoins = async () => {
      try {
         const coins: CoinModel[] = await fetch('http://localhost:8080/coins').then((res) =>
            res.json(),
         );
         console.log(coins);
         store.setToStorage(coins);
         return coins;
      } catch (error) {
         console.log(error);
         return store.getFromStorage();
      }
   };

   useEffect(() => {
      const stored = store.getFromStorage();
      setCoins(stored);
      (async () => setCoins(await getCoins()))();
   }, []);

   useEffect(() => {
      const interval = setInterval(async () => {
         setCoins(await getCoins());
      }, 60000);
      return () => clearInterval(interval);
   }, []);

   return (
      <TableContainer component={Paper}>
         <Table sx={{ minWidth: 650 }}>
            <TableHead>
               <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell>Current price</TableCell>
                  <TableCell>Total amount</TableCell>
                  <TableCell>Average price</TableCell>
                  <TableCell>Total value</TableCell>
                  <TableCell>Total invested</TableCell>
                  <TableCell>PNL</TableCell>
                  <TableCell>Updated At</TableCell>
                  <TableCell>Created At</TableCell>
               </TableRow>
            </TableHead>
            <TableBody>
               {coins.length
                  ? coins.map((coinModel: CoinModel) => (
                       <TableRow
                          key={coinModel.name}
                          sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                       >
                          <TableCell component="th" scope="row">
                             {coinModel.name}
                          </TableCell>
                          <TableCell component="th" scope="row">
                             {coinModel.price.toFixed(4)}
                          </TableCell>
                          <TableCell>{coinModel.total_amount.toFixed(3)}</TableCell>
                          <TableCell>{coinModel.avg.toFixed(4)}</TableCell>
                          <TableCell>{coinModel.total_invested.toFixed(2)}</TableCell>
                          <TableCell>{coinModel.total_value.toFixed(2)}</TableCell>
                          <TableCell
                             sx={{
                                color: coinModel.pnl < 0 ? '#d61a20' : '#27c416',
                                fontWeight: 700,
                             }}
                          >
                             {coinModel.pnl.toFixed(1)}%
                          </TableCell>
                          <TableCell>
                             {format(new Date(coinModel.updatedAt), 'MM/dd/yyyy')}
                          </TableCell>
                          <TableCell>
                             {format(new Date(coinModel.createdAt), 'MM/dd/yyyy')}
                          </TableCell>
                       </TableRow>
                    ))
                  : null}
            </TableBody>
         </Table>
      </TableContainer>
   );
};
