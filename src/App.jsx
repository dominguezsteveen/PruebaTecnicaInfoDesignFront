import './App.css';
import { Suspense, lazy } from 'react';
import LazyLoadingTable from './components/shared/LazyLoading/LazyLoadingTable';

const TramosList = lazy(() => import('./components/TramosList/TramosList'));
const ClienteList = lazy(() => import('./components/ClienteList/ClienteList'));
const TramoClienteList = lazy(() => import('./components/TramosCliente/TramosCliente'));

function App() {
  return (
    <>
      <h1 className='text-2xl font-bold text-center mt-10'>DASHBOARD</h1>
      <Suspense fallback={<LazyLoadingTable />}>
        <TramosList />
      </Suspense>
      <Suspense fallback={<LazyLoadingTable />}>
        <ClienteList />
      </Suspense>
      <Suspense fallback={<LazyLoadingTable />}>
        <TramoClienteList />
      </Suspense>
    </>
  )
}

export default App
