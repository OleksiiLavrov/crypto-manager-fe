import { useEffect, useMemo } from 'react';
import { TableBody, Table, TableContainer, Paper } from '@mui/material';
import { CoinModel } from '../../types/models';
import { DashboardTableFoot, DashboardTableHead, DashboardTableRow, Toolbar } from './components';
import useStore from '../../store/store';
import useDashboardTableStore from '../../store/dashboard-table-store';

export const Dashboard = () => {
   const { coins, getCoins } = useStore();
   const { hiddenCoinsIds, coinsSortingRule } = useDashboardTableStore();

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

   const sortedCoins = useMemo(() => {
      if (!coinsSortingRule.rule || !coinsSortingRule.rule.length) return coins;
      return coins.sort((a, b) => {
         if (typeof a[coinsSortingRule.rule] === 'number' && typeof b[coinsSortingRule.rule] === 'number') {
            return coinsSortingRule.direction === 'ASC' 
               ? (Number(a[coinsSortingRule.rule]) - Number(b[coinsSortingRule.rule])) 
               : (Number(b[coinsSortingRule.rule]) - Number(a[coinsSortingRule.rule]));
         }
         if (typeof a[coinsSortingRule.rule] === 'string' && typeof b[coinsSortingRule.rule] === 'string') {
            return coinsSortingRule.direction === 'ASC' 
               ? (a[coinsSortingRule.rule]?.toString().localeCompare(b[coinsSortingRule.rule]?.toString())) 
               : (b[coinsSortingRule.rule]?.toString().localeCompare(a[coinsSortingRule.rule]?.toString()));
         }
         if (a[coinsSortingRule.rule] instanceof Date && b[coinsSortingRule.rule] instanceof Date) {
            const dateA = a[coinsSortingRule.rule] as Date;
            const dateB = b[coinsSortingRule.rule] as Date;
            return coinsSortingRule.direction === 'ASC' 
               ? dateA.getTime() - dateB.getTime()
               : dateB.getTime() - dateA.getTime();
         }
         return 0;
      });
   }, [coins, coinsSortingRule]);

   useEffect(() => {
      (async () => await getCoins())();
   }, []);

   if (!coins.length) {
      return null;
   }

   return (
      <TableContainer component={Paper} sx={{ boxShadow: 'none' }}>
         <Toolbar />
         <Table sx={{ minWidth: 650 }}>
            <DashboardTableHead />
            <TableBody>
               {sortedCoins.length > 0 &&
                  sortedCoins
                     .filter((coin) => !hiddenCoinsIds.includes(coin._id))
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
                                 backgroundColor: coinModel.pnl < 0 ? '#fc4454' : '#90ee90',
                              }}
                           />
                        );
                     })}
               <DashboardTableFoot
                  rowData={{
                     total_value: total.total_value?.toFixed(2),
                     total_invested: total.total_invested?.toFixed(2),
                     pnl: total.pnl?.toFixed(1),
                     backgroundColor: total.pnl < 0 ? '#fc4454' : '#90ee90',
                  }}
               />
            </TableBody>
         </Table>
      </TableContainer>
   );
};
