export type CoinModel = {
   _id: string;
   total_invested: number;
   total_amount: number;
   total_value: number;
   name: string;
   transactions: string[];
   createdAt: string;
   updatedAt: string;
   price: number;
   market_cap: number;
   pnl: number;
   avg: number;
};

export type TransactionModel = {
   _id: string;
   coin_amount: number;
   total_cost: number;
   coin_name: string;
   createdAt: string;
};

export type TransactionDto = Omit<TransactionModel, '_id' | 'createdAt'>;
