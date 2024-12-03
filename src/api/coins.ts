import { CoinModel } from '../types/models';
import store from '../store/local-store';

const TIME_TO_CACHE = 10000;

class CoinsService {
   public async getCoins(): Promise<CoinModel[] | undefined> {
      try {
         const cached = store.getFromStorage('coins');
         if (cached && Date.now() - cached.timestamp < TIME_TO_CACHE) {
            return cached.data;
         }
         return fetch(`${import.meta.env.VITE_API_URL}/coins`)
            .then((res) => res.json())
            .then((data: CoinModel[]) => {
               store.setToStorage(data, 'coins');
               return data;
            })
      } catch (error) {
         console.error(error);
      }
   }

   public async getCoin(coinName: string): Promise<CoinModel | undefined> {
      try {
         const cached = store.getFromStorage('coins');
         if (cached && Date.now() - cached.timestamp < TIME_TO_CACHE) {
            return cached.data.find((coin: CoinModel) => coin.name === coinName);
         }
         return fetch(`${import.meta.env.VITE_API_URL}/coins/${coinName}`)
            .then((res) => res.json())
            .then((data: CoinModel) => data);
      } catch (error) {
         console.error(error);
      }
   }
}

export const coinsService = new CoinsService();
