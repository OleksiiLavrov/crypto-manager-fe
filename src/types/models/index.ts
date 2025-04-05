export type BaseUserCoinModel = {
   id: number;
   userId: number;
   coinId: number;
   invested: number;
   amount: number;
   updatedAt: Date;
   createdAt: Date;
   coin: CoinModel;
};

export type TransactionModel = {
   id: number;
   amount: number;
   cost: number;
   createdAt: Date;
   updatedAt: Date;
   userCoinId: number;
   coinId: number;
   userId: number;
};

export type CoinModel = {
   id: number;
   name: string;
   marketCap: number;
   price: number;
   updatedAt: Date;
   createdAt: Date;
};

export type UserModel = {
   id: number;
   name: string;
   email: string;
   createdAt: Date;
   updatedAt: Date;
};

export type TransactionDto = Omit<TransactionModel, 'id' | 'createdAt'>;

export type UserCoinModelPercentage = {
   percentageFromTotalInvested: number;
   percentageFromTotalPrice: number;
};

export type UserCoinModel = BaseUserCoinModel &
   UserCoinModelPercentage & {
      totalValue: number;
      pnl: number;
      avg: number;
      transactions: TransactionModel[];
   };

export type ExtendedUserCoinModel = UserCoinModel & {
   hidden: boolean;
};
