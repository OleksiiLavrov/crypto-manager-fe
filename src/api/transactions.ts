import { TransactionDto, TransactionModel } from '../types/models';
import { axiosInstance } from './http-client';

class TransactionsService {
   public async createTransaction(dto: TransactionDto): Promise<TransactionModel | undefined> {
      try {
         const { amount, coinName, cost } = dto;
         const response = await axiosInstance.post<TransactionModel>('/transactions', {
            amount,
            coinName,
            cost,
         });
         return response.data;
      } catch (error) {
         console.error(error);
      }
   }
}

export const transactionsService = new TransactionsService();
