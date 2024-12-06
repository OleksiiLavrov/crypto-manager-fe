import { create } from 'zustand';
import store from './local-store';
import { CoinModel } from '../types/models';

type SortingRule = {
   rule: keyof CoinModel;
   direction: 'ASC' | 'DESC';
};

type StoreState = {
   hiddenCoinsIds: number[];
   coinsSortingRule: SortingRule;
   setHiddenCoinsIds: (ids: number[]) => void;
   setCoinsSortingRule: (rule: keyof CoinModel) => void;
};

const getInitialPropsState = (): Omit<StoreState, 'setHiddenCoinsIds' | 'setCoinsSortingRule'> => {
   const { data: hiddenCoinsIds } = store.getFromStorage('hiddenCoinsIds') || { data: [] };
   const { data: coinsSortingRule } = store.getFromStorage('coinsSortingRule') || { data: {} };
   return {
      hiddenCoinsIds: hiddenCoinsIds && hiddenCoinsIds.length ? hiddenCoinsIds : [],
      coinsSortingRule: coinsSortingRule || {
         rule: '',
         direction: 'ASC',
      },
   };
};

const useDashboardTableStore = create<StoreState>((set) => ({
   ...getInitialPropsState(),
   setHiddenCoinsIds: (ids: number[]) => {
      store.setToStorage(ids, 'hiddenCoinsIds');
      set(() => ({ hiddenCoinsIds: ids }));
   },
   setCoinsSortingRule: (rule: keyof CoinModel) => {
      set((state) => {
         const newRule: SortingRule = {
            rule,
            direction:
               rule === state.coinsSortingRule.rule
                  ? state.coinsSortingRule.direction === 'ASC'
                     ? 'DESC'
                     : 'ASC'
                  : 'ASC',
         };
         store.setToStorage(newRule, 'coinsSortingRule');
         return { coinsSortingRule: newRule };
      });
   },
}));

export default useDashboardTableStore;
