import { Route, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';
import { Dashboard } from '../features/dashboard';
import { AddTransaction } from '../features/transaction';
import { App } from '../App';

export const router = createBrowserRouter(
   createRoutesFromElements(
      <Route path="/" element={<App />}>
         <Route index path="/" element={<Dashboard />} />
         <Route path="/add-transaction" element={<AddTransaction />} />
      </Route>,
   ),
);
