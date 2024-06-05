import './App.css'
import { Outlet } from 'react-router-dom'
import Navbar from './components/Navbar'
import { QueryClient, QueryClientProvider } from 'react-query';
import { AuthProvider } from './utils/customHook/useAuth';

const queryClient = new QueryClient();

function App() {
  return (
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        <Navbar />
        <Outlet />
      </QueryClientProvider>
    </AuthProvider>
  )
}

export default App
