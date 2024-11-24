import { TransactionDto, TransactionModel } from '../types/models';

class TransactionsService {
   public async createTransaction(dto: TransactionDto): Promise<TransactionModel | undefined> {
      try {
         const { coin_amount, coin_name, total_cost } = dto;
         return fetch(`${import.meta.env.VITE_API_URL}/transactions`, {
            method: 'POST',
            headers: {
               'Content-Type': 'application/json',
            },
            body: JSON.stringify({
               coin_amount,
               coin_name,
               total_cost,
            }),
         })
            .then((res) => res.json())
            .then((data: TransactionModel) => data);
      } catch (error) {
         console.error(error);
      }
   }
}

export const transactionsService = new TransactionsService();
