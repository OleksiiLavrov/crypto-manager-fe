import { useParams } from "react-router-dom";
import { UserCoinModel, TransactionModel } from "../../types/models";
import { useEffect, useState } from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import { coinsService } from "../../api";

export const CoinInfo = () => {
  const { coinName } = useParams();
  const [userCoin, setUserCoin] = useState<UserCoinModel | undefined>(undefined);
  const [transactions, setTransactions] = useState<TransactionModel[] | undefined>(undefined);

  useEffect(() => {
    (async () => {
      if (coinName) {
        const data = await coinsService.getCoin(coinName);
        if (data?.coin) {
          const transactions = await coinsService.getCoinTransactions(data.coin.name);
          setUserCoin(data);
          setTransactions(transactions);
        }
      }
    })();
  }, [coinName]);

  if (!userCoin || !transactions) return <div>Coin transactions are not found</div>;

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="transactions table">
        <TableHead>
          <TableRow>
            <TableCell sx={{ fontWeight: 'bold' }}>Coin</TableCell>
            <TableCell sx={{ fontWeight: 'bold' }}>Price</TableCell>
            <TableCell sx={{ fontWeight: 'bold' }}>Total Cost</TableCell>
            <TableCell sx={{ fontWeight: 'bold' }}>Amount</TableCell>
            <TableCell sx={{ fontWeight: 'bold' }}>Date</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {transactions.map((transaction) => (
            <TableRow
              key={transaction.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell>{userCoin.coin.name}</TableCell>
              <TableCell>${(transaction.cost / transaction.amount).toFixed(2)}</TableCell>
              <TableCell>${transaction.cost.toFixed(2)}</TableCell>
              <TableCell>{transaction.amount}</TableCell>
              <TableCell>
                {new Date(transaction.createdAt).toLocaleDateString()}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableRow sx={{background: 'rgba(0,0,0,0.1)'}}>
          <TableCell sx={{ fontWeight: 'bold' }}>Total</TableCell>
          <TableCell></TableCell>
          <TableCell sx={{ fontWeight: 'bold' }}>${userCoin.invested.toFixed(2)}</TableCell>
          <TableCell sx={{ fontWeight: 'bold' }}>{userCoin.amount.toFixed(2)}</TableCell>
          <TableCell></TableCell>
        </TableRow>
      </Table>
    </TableContainer>
  );
};
