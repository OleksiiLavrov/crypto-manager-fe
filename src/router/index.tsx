import { Route, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';
import { Dashboard } from '../features/dashboard';
import { AddTransaction } from '../features/transaction';
import { App } from '../App';
import NewDashboard from '../features/new-dashboard';

export const router = createBrowserRouter(
   createRoutesFromElements(
      <Route path="/" element={<App />}>
         <Route index path="/" element={<Dashboard />} />
         <Route path="/dashboard" element={<Dashboard />} />
         {/* <Route path="/new-dashboard" element={<NewDashboard />} /> */}
         <Route path="/add-transaction" element={<AddTransaction />} />
      </Route>,
   ),
);
