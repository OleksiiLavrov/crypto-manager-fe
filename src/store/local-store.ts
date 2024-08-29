class StoreData {
   public setToStorage(dto: any, key: string): void {
      const data = { data: dto, timestamp: Date.now() };
      localStorage.setItem(key, JSON.stringify(data));
   }

   public getFromStorage(key: string): { data: any; timestamp: number } | null {
      const storedData = localStorage.getItem(key);
      if (storedData) {
         return JSON.parse(storedData);
      }
      return null;
   }
}

export default new StoreData();
