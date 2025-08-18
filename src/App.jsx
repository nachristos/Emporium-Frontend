import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import { Navigation } from './components/navigation/index.jsx'
import { Profile } from './pages/profile/index.jsx'
import { Home } from './pages/home/index.jsx'
import { About } from './pages/about/index.jsx'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { AuthContextProvider } from './context/auth-context/auth-context-provider.jsx'
import { UserContextProvider } from "./context/user-context/user-context-provider.jsx"
import { Signup } from './pages/signup/index.jsx'
import { Login } from './pages/login/index.jsx'
import { CartContextProvider } from './context/cart-context.jsx/cart-context-provider.jsx'
import { Shop } from './pages/shop/index.jsx'
import { VerifyPage } from './pages/verify/index.jsx'
import { AdminPage } from './pages/admin/index.jsx'
import bgImage from './assets/bg.png'
import { ManageItems } from './pages/admin/manage-items/index.jsx'


const queryClient = new QueryClient()

function App() {

  return (
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <CartContextProvider>
          <AuthContextProvider>
            <Navigation />
            <div style={{ backgroundImage: `url(${bgImage})` }} className="page">
                <Routes>
                  <Route path={'/'} element={<Login redirect />}/>
                  <Route path={'/register'} element={<Signup />}/>
                  <Route path={'/about'} element={<About />}/>
                  <Route path={'/home/:itemId?'} element={<Home />}/>
                  <Route path={'/shop/:itemId?'} element={<Shop />}/>
                  <Route path={'/account'} element={<UserContextProvider children={<Profile />} />}/>
                  <Route path={'/verify/:token'} element={<VerifyPage />} />
                  <Route path={'/admin'} element={<UserContextProvider children={<AdminPage />} />}/>
                  <Route path={'/admin/items'} element={<UserContextProvider children={<ManageItems />} />}/>
                </Routes>
            </div>
          </AuthContextProvider>
        </CartContextProvider>
      </QueryClientProvider>
    </BrowserRouter>
  )
}

export default App


