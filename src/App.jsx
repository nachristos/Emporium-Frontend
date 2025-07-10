import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import { Navigation } from './components/navigation/index.jsx'
import { Account } from './pages/account-page/index.jsx'
import { Cart } from './pages/cart/index.jsx'
import { Home } from './pages/home/index.jsx'
import { Login } from './pages/login/index.jsx'

function App() {

  return (
    <BrowserRouter>
      <Navigation />
      <div className="page">
          <Routes>
            <Route path={'/login'} element={<Login />}/>
            <Route path={'/home'} element={<Home />}/>
            <Route path={'/account'} element={<Account />}/>
            <Route path={'/cart'} element={<Cart />}/>
          </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App


