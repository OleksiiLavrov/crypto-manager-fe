import { TransactionModel, UserCoinModel } from '../types/models';
import store from '../store/local-store';
import { axiosInstance } from './http-client';

const TIME_TO_CACHE = 10000;

class CoinsService {
   public async getCoins(): Promise<UserCoinModel[] | undefined> {
      try {
         const cached = store.getFromStorage('coins');
         if (cached && Date.now() - cached.timestamp < TIME_TO_CACHE) {
            return cached.data;
         }
         const response = await axiosInstance.get('/coins');
         const data = response.data;
         store.setToStorage(data, 'coins');
         return data;
      } catch (error) {
         console.error(error);
      }
   }

   public async getCoin(coinId: number): Promise<UserCoinModel | undefined> {
      try {
         const cached = store.getFromStorage('coins');
         if (cached && Date.now() - cached.timestamp < TIME_TO_CACHE) {
            return cached.data.find((coin: UserCoinModel) => coin.id === coinId);
         }
         const response = await axiosInstance.get(`/coins/${coinId}`);
         return response.data;
      } catch (error) {
         console.error(error);
      }
   }

   public async getCoinTransactions(coinName: string): Promise<TransactionModel[] | undefined> {
      try {
         const response = await axiosInstance.get(`/coins/${coinName}/transactions`);
         return response.data.transactions;
      } catch (error) {
         console.error(error);
      }
   }
}

export const coinsService = new CoinsService();
