import { useEffect, useMemo } from 'react';
import { TableBody, Table, TableContainer, Paper } from '@mui/material';
import { CoinModel } from '../../types/models';
import { DashboardTableFoot, DashboardTableHead, DashboardTableRow } from './components';
import useStore from '../../store/store';

export const Dashboard = () => {
   const { coins, getCoins } = useStore();
   const total = useMemo(() => {
      const totalSum = coins.reduce(
         (acc, coin: CoinModel) => {
            acc.total_value += coin.total_value;
            acc.total_invested += coin.total_invested;
            return acc;
         },
         { total_value: 0, total_invested: 0, pnl: 0 },
      );
      totalSum.pnl =
         ((totalSum.total_value - totalSum.total_invested) / Math.abs(totalSum.total_invested)) *
         100;
      return totalSum;
   }, [coins]);

   useEffect(() => {
      (async () => await getCoins())();
   }, []);

   return (
      <TableContainer component={Paper}>
         <Table sx={{ minWidth: 650 }}>
            <DashboardTableHead />
            <TableBody>
               {coins.length > 0 &&
                  coins
                     .filter((coin) => coin.total_amount > 0)
                     .map((coinModel: CoinModel, index: number) => {
                        return (
                           <DashboardTableRow
                              key={coinModel.name}
                              isEven={index % 2 === 0}
                              rowData={{
                                 ...coinModel,
                                 price: coinModel.price.toFixed(4),
                                 total_amount: coinModel.total_amount?.toFixed(3),
                                 avg: coinModel.avg?.toFixed(4),
                                 total_value: coinModel.total_value?.toFixed(2),
                                 total_invested: coinModel.total_invested?.toFixed(2),
                                 pnl: coinModel.pnl?.toFixed(1),
                                 backgroundColor: coinModel.pnl < 0 ? '#f71119' : '#27c416',
                              }}
                           />
                        );
                     })}
               <DashboardTableFoot
                  rowData={{
                     total_value: total.total_value?.toFixed(2),
                     total_invested: total.total_invested?.toFixed(2),
                     pnl: total.pnl?.toFixed(1),
                     backgroundColor: total.pnl < 0 ? '#f71119' : '#27c416',
                  }}
               />
            </TableBody>
         </Table>
      </TableContainer>
   );
};
