import './App.css'
import { Outlet } from 'react-router-dom'
import { useLocation } from 'react-router-dom';
import Navbar from './components/Navbar'
import { QueryClient, QueryClientProvider } from 'react-query';
import { AuthProvider } from './utils/customHook/useAuth';
import SideTabProvider from './utils/customHook/SideTabProvider';
import Toast from './components/Toast';

const queryClient = new QueryClient();

function App() {
  const location = useLocation()
  const isAdmin = location.pathname.startsWith("/admin")
  const haveSideBar = isAdmin && !location.pathname.includes("/admin/login")
  return (
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        <Navbar isAdmin={isAdmin} />
        {haveSideBar ? <SideTabProvider><Outlet /></SideTabProvider> : <Outlet />}
      </QueryClientProvider>
      <Toast />
    </AuthProvider>
  )
}

export default App
