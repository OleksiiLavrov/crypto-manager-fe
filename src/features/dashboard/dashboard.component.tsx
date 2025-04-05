import { useEffect, useMemo } from 'react';
import { TableBody, Table, TableContainer, Paper } from '@mui/material';
import { UserCoinModel } from '../../types/models';
import { DashboardTableFoot, DashboardTableHead, DashboardTableRow, Toolbar } from './components';
import useStore from '../../store/store';
import useDashboardTableStore from '../../store/dashboard-table-store';

export const Dashboard = () => {
   const { coins, getCoins } = useStore();
   const { hiddenCoinsIds, coinsSortingRule } = useDashboardTableStore();

   useEffect(() => {
      (async () => await getCoins())();
   }, []);

   const total = useMemo(() => {
      if (!coins.length) return { totalValue: 0, totalInvested: 0, pnl: 0 };
      const totalSum = coins.reduce(
         (acc, coin: UserCoinModel) => {
            acc.totalValue += coin.totalValue;
            acc.totalInvested += coin.invested;
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
      if (!coins.length) return [];
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
                     .map((coinModel: UserCoinModel, index: number) => {
                        return (
                           <DashboardTableRow
                              key={coinModel.coin.name}
                              isEven={index % 2 === 0}
                              rowData={{
                                 id: coinModel.id,
                                 name: coinModel.coin.name,
                                 price: coinModel?.coin?.price?.toFixed(4),
                                 percentageFromTotalInvested: ((coinModel.invested / total.totalInvested) * 100).toFixed(2),
                                 totalAmount: coinModel.amount?.toFixed(3),
                                 avg: coinModel?.avg?.toFixed(4),
                                 totalValue: coinModel?.totalValue?.toFixed(2),
                                 totalInvested: coinModel?.invested?.toFixed(2),
                                 pnl: coinModel.pnl?.toFixed(1),
                                 backgroundColor: coinModel.pnl < 0 ? '#fc4454' : '#90ee90',
                                 updatedAt: coinModel.coin.updatedAt,
                                 createdAt: coinModel.coin.createdAt,
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
