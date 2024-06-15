import { CoinModel } from '../../../types/models';

class StoreData {
   public setToStorage(coins: CoinModel[]): void {
      localStorage.setItem('coins', JSON.stringify(coins));
   }

   public getFromStorage(): CoinModel[] {
      const storedData = localStorage.getItem('coins');
      if (storedData) {
         return JSON.parse(storedData);
      }
      return [];
   }
}

export default new StoreData();
