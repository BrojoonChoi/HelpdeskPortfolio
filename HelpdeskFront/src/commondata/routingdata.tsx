import  { lazy } from 'react';
const Dashboard = lazy(() => import('../components/Dashboard/Dashboard'));
export const RouterData = [

               {path:`${import.meta.env.BASE_URL}dashboard`, element:<Dashboard />},
            

            
]
