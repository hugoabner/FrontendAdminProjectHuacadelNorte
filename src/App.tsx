import { Routes, Route, Outlet, useLocation, Navigate } from "react-router-dom"
import { HomePage } from "./pages/HomePage"
import { Navigation } from "./components/Navigation"
import { Sidebar } from "./components/Sidebar"
import { Calendario, DashboardPage } from "./pages"
import { Registerusers, Members } from "./pages/tables"
import { GestionContact, Gestionproyect, Gestionservicio } from "./pages/gestions"
import { Configuracion } from "./pages/config"
import { useStore } from "./store/authStore"
import { Toaster } from 'sonner';


function Layout() {
  const location = useLocation();
  const { user } = useStore((state) => state);


  return user?.token ? (
     <div className='w-full h-screen'>
     
      <div className='w-full h-full flex '>
        <div className='flex f'>
          <Sidebar />
        </div>
        <div className='w-full flex-1 overflow-x-auto overflow-y-auto'> 
          <div>
            <Navigation />
            <Outlet />
            <Toaster />

          </div>
          
        </div>
      </div>
    </div>
  ) : (
    <Navigate to="/loginHomePage" state={{ from: location }} replace />
  );
}
function App() {

  // const isAuth = useAuthStore(state => state.isAuthenticated);
  //</Route>
  return (
    <main>
      <Routes>
        <Route element={<Layout />}>
            <Route index path='/' element={<Navigate to='/dashboard' />} />
            <Route path='/dashboard' element={ <DashboardPage />}/>
            <Route path='/members' element={ <Members />}/>
            <Route path='/gestionProyectos' element={ <Gestionproyect/>}/>
            <Route path='/gestionServicios' element={ <Gestionservicio />}/>
            <Route path='/gestionContactos' element={ <GestionContact />}/>
            <Route path='/calendario' element={ <Calendario />}/>
            <Route path='/configuracion' element={ <Configuracion />}/>
            <Route path='/registerUsers' element={ <Registerusers />}/>

        </Route>            
        <Route path="/loginHomePage" element={<HomePage/>} />

      </Routes>
    </main>
  )
}

export default App
