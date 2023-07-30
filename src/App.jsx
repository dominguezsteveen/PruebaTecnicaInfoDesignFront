import './App.css'
import ClienteList from './components/ClienteList/ClienteList'
import TramosList from './components/TramosList/TramosList'
import TramoClienteList from './components/TramosCliente/TramosCliente'

function App() {
  return (
    <>
      <h1 className='text-2xl font-bold text-center mt-10'>DASHBOARD</h1>
      <TramosList />
      <ClienteList />
      <TramoClienteList />
    </>
  )
}

export default App
