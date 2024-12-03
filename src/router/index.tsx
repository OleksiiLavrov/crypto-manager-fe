import { Route, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';
import { Dashboard } from '../features/dashboard';
import { AddTransaction } from '../features/transaction';
import { CoinInfo } from '../features/coin';
import { App } from '../App';

export const router = createBrowserRouter(
   createRoutesFromElements(
      <Route path="/" element={<App />}>
         <Route index path="/" element={<Dashboard />} />
         <Route path="/dashboard" element={<Dashboard />} />
         <Route path="/add-transaction" element={<AddTransaction />} />
         <Route path="/coin/:coinName" element={<CoinInfo />} />
      </Route>,
   ),
);
