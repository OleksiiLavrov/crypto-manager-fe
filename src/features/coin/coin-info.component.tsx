import { useParams } from "react-router-dom";
import { CoinModel, TransactionModel } from "../../types/models";
import { useEffect, useState } from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import { coinsService, transactionsService } from "../../api";

export const CoinInfo = () => {
  const { coinName } = useParams();
  const [coin, setCoin] = useState<CoinModel | undefined>(undefined);
  const [transactions, setTransactions] = useState<TransactionModel[] | undefined>(undefined);

  useEffect(() => {
    (async () => {
      if (coinName) {
        const coin = await coinsService.getCoin(coinName);
        if (coin) {
          const transactions = await transactionsService.getTransactionsPerCoin(coin.name);
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
            <TableCell sx={{ fontWeight: 'bold' }}>Total Cost</TableCell>
            <TableCell sx={{ fontWeight: 'bold' }}>Amount</TableCell>
            <TableCell sx={{ fontWeight: 'bold' }}>Date</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {transactions.map((transaction) => (
            <TableRow
              key={transaction._id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell>{transaction.coin_name}</TableCell>
              <TableCell>${transaction.total_cost.toFixed(2)}</TableCell>
              <TableCell>{transaction.coin_amount}</TableCell>
              <TableCell>
                {new Date(transaction.createdAt).toLocaleDateString()}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
