import { useEffect, useMemo } from 'react';
import { TableBody, Table, TableContainer, Paper } from '@mui/material';
import { UserCoinModel } from '../../types/models';
import { DashboardTableFoot, DashboardTableHead, DashboardTableRow, Toolbar } from './components';
import useStore from '../../store/store';
import useDashboardTableStore from '../../store/dashboard-table-store';

export const Dashboard = () => {
   const { coins: userCoins, getCoins } = useStore();
   const { hiddenCoinsIds, coinsSortingRule } = useDashboardTableStore();

   useEffect(() => {
      (async () => await getCoins())();
   }, []);

   const total = useMemo(() => {
      if (!userCoins.length) return { totalValue: 0, totalInvested: 0, pnl: 0 };
      const totalSum = userCoins.reduce(
         (acc, userCoin: UserCoinModel) => {
            acc.totalValue += userCoin.totalValue;
            acc.totalInvested += userCoin.invested;
            return acc;
         },
         { totalValue: 0, totalInvested: 0, pnl: 0 },
      );
      totalSum.pnl =
         ((totalSum.totalValue - totalSum.totalInvested) / Math.abs(totalSum.totalInvested)) *
         100;
      return totalSum;
   }, [userCoins]);

   const sortedCoins = useMemo(() => {
      if (!userCoins.length) return [];
      if (!coinsSortingRule.rule || !coinsSortingRule.rule.length) return userCoins;
      return userCoins.sort((a, b) => {
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
   }, [userCoins, coinsSortingRule]);

   if (!userCoins.length) {
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
                     .filter((userCoin) => !hiddenCoinsIds.includes(userCoin.coin.id))
                     .map((userCoinModel: UserCoinModel, index: number) => {
                        return (
                           <DashboardTableRow
                              key={userCoinModel.coin.name}
                              isEven={index % 2 === 0}
                              rowData={{
                                 id: userCoinModel.coin.id,
                                 name: userCoinModel.coin.name,
                                 price: userCoinModel?.coin?.price?.toFixed(4),
                                 percentageFromTotalInvested: ((userCoinModel.invested / total.totalInvested) * 100).toFixed(2),
                                 totalAmount: userCoinModel.amount?.toFixed(3),
                                 avg: userCoinModel?.avg?.toFixed(4),
                                 totalValue: userCoinModel?.totalValue?.toFixed(2),
                                 totalInvested: userCoinModel?.invested?.toFixed(2),
                                 pnl: userCoinModel.pnl?.toFixed(1),
                                 backgroundColor: userCoinModel.pnl < 0 ? '#fc4454' : '#90ee90',
                                 updatedAt: userCoinModel.coin.updatedAt,
                                 createdAt: userCoinModel.coin.createdAt,
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
