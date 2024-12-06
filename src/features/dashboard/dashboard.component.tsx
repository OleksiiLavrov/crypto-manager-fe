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
            acc.totalValue += coin.totalValue;
            acc.totalInvested += coin.totalInvested;
            return acc;
         },
         { totalValue: 0, totalInvested: 0, pnl: 0 },
      );
      totalSum.pnl =
         ((totalSum.totalValue - totalSum.totalInvested) / Math.abs(totalSum.totalInvested)) *
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
                     .filter((coin) => !hiddenCoinsIds.includes(coin.id))
                     .map((coinModel: CoinModel, index: number) => {
                        return (
                           <DashboardTableRow
                              key={coinModel.name}
                              isEven={index % 2 === 0}
                              rowData={{
                                 ...coinModel,
                                 price: coinModel.price.toFixed(4),
                                 totalAmount: coinModel.totalAmount?.toFixed(3),
                                 avg: coinModel.avg?.toFixed(4),
                                 totalValue: coinModel.totalValue?.toFixed(2),
                                 totalInvested: coinModel.totalInvested?.toFixed(2),
                                 pnl: coinModel.pnl?.toFixed(1),
                                 backgroundColor: coinModel.pnl < 0 ? '#fc4454' : '#90ee90',
                              }}
                           />
                        );
                     })}
               <DashboardTableFoot
                  rowData={{
                     totalValue: total.totalValue?.toFixed(2),
                     totalInvested: total.totalInvested?.toFixed(2),
                     pnl: total.pnl?.toFixed(1),
                     backgroundColor: total.pnl < 0 ? '#fc4454' : '#90ee90',
                  }}
               />
            </TableBody>
         </Table>
      </TableContainer>
   );
};
