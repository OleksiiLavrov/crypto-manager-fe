export type CoinModel = {
   _id: string;
   total_invested: number;
   total_amount: number;
   total_value: number;
   name: string;
   transactions: string[];
   createdAt: Date;
   updatedAt: Date;
   price: number;
   market_cap: number;
   pnl: number;
   avg: number;
};

export type ExtendedCoinModel = CoinModel & {
   hidden: boolean;
};

export type TransactionModel = {
   _id: string;
   coin_amount: number;
   total_cost: number;
   coin_name: string;
   createdAt: Date;
};

export type TransactionDto = Omit<TransactionModel, '_id' | 'createdAt'>;
