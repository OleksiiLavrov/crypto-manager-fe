export type CoinModel = {
   id: number;
   totalInvested: number;
   totalAmount: number;
   totalValue: number;
   name: string;
   transactions: TransactionModel[];
   createdAt: Date;
   updatedAt: Date;
   price: number;
   marketCap: number;
   pnl: number;
   avg: number;
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
