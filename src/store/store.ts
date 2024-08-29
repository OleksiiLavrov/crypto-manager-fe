import { create } from 'zustand';
import { CoinModel, TransactionDto } from '../types/models';
import { coinsService, transactionsService } from '../api';

interface StoreState {
   coins: CoinModel[];
   getCoins: () => Promise<void>;
   createTransaction: (dto: TransactionDto) => Promise<void>;
}

const useStore = create<StoreState>((set) => ({
   coins: [],
   getCoins: async () => {
      const data = await coinsService.getCoins();
      if (data) {
         set(() => ({ coins: data }));
      }
   },
   createTransaction: async (dto: TransactionDto) => {
      await transactionsService.createTransaction(dto);
   },
}));

export default useStore;
