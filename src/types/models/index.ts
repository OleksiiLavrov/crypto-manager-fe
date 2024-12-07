export type BaseCoinModel = {
   id: number;
   name: string;
   totalInvested: number;
   totalAmount: number;
   updatedAt: Date;
   createdAt: Date;
};

export type CoinModel = BaseCoinModel & {
   totalValue: number;
   price: number;
   marketCap: number;
   pnl: number;
   avg: number;
   transactions: TransactionModel[];
};

export type ExtendedCoinModel = CoinModel & {
   hidden: boolean;
};

export type TransactionModel = {
   id: number;
   coinAmount: number;
   totalCost: number;
   coinName: string;
   createdAt: Date;
};

export type TransactionDto = Omit<TransactionModel, 'id' | 'createdAt'>;
