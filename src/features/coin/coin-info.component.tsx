import { useParams } from "react-router-dom";
import { CoinModel, TransactionModel } from "../../types/models";
import { useEffect, useState } from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TableFooter } from '@mui/material';
import { coinsService } from "../../api";

export const CoinInfo = () => {
  const { coinName } = useParams();
  const [coin, setCoin] = useState<CoinModel | undefined>(undefined);
  const [transactions, setTransactions] = useState<TransactionModel[] | undefined>(undefined);

  useEffect(() => {
    (async () => {
      if (coinName) {
        const coin = await coinsService.getCoin(coinName);
        if (coin) {
          const transactions = await coinsService.getCoinTransactions(coin.name);
          setCoin(coin);
          setTransactions(transactions);
        }
      }
    })();
  }, [coinName]);

  if (!coin || !transactions) return <div>Coin transactions are not found</div>;

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
              <TableCell>{transaction.coinName}</TableCell>
              <TableCell>${(transaction.totalCost / transaction.coinAmount).toFixed(2)}</TableCell>
              <TableCell>${transaction.totalCost.toFixed(2)}</TableCell>
              <TableCell>{transaction.coinAmount}</TableCell>
              <TableCell>
                {new Date(transaction.createdAt).toLocaleDateString()}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableRow sx={{background: 'rgba(0,0,0,0.1)'}}>
          <TableCell sx={{ fontWeight: 'bold' }}>Total</TableCell>
          <TableCell></TableCell>
          <TableCell sx={{ fontWeight: 'bold' }}>${coin.totalInvested}</TableCell>
          <TableCell sx={{ fontWeight: 'bold' }}>{coin.totalAmount}</TableCell>
          <TableCell></TableCell>
        </TableRow>
      </Table>
    </TableContainer>
  );
};
