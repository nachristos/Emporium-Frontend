import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import { Navigation } from './components/navigation/index.jsx'
import { Profile } from './pages/profile/index.jsx'
import { Cart } from './pages/cart/index.jsx'
import { Home } from './pages/home/index.jsx'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { AuthContextProvider } from './context/auth-context/auth-context-provider.jsx'
import { UserContextProvider } from "./context/user-context/user-context-provider.jsx"
import { Signup } from './pages/signup/index.jsx'
import { Login } from './pages/login/index.jsx'


const queryClient = new QueryClient()

function App() {

  return (
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <AuthContextProvider>
          <Navigation />
          <div className="page">
              <Routes>
                <Route path={'/'} element={<Login redirect />}/>
                <Route path={'/register'} element={<Signup />}/>
                <Route path={'/home/:itemId?'} element={<Home />}/>
                <Route path={'/account'} element={<UserContextProvider children={<Profile />} />}/>
                <Route path={'/cart'} element={<UserContextProvider children={<Cart />} />}/>
              </Routes>
          </div>
        </AuthContextProvider>
      </QueryClientProvider>
    </BrowserRouter>
  )
}

export default App


