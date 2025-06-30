import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import { Page1 } from './components/page-1'
import { Navigation } from './navigation'
import { Page2 } from './components/page-2'
import { Page3 } from './components/page-3'

function App() {

  return (
    <BrowserRouter>
      <Navigation />
      <Routes>
        <Route path={'/page-1'} element={<Page1 />}/>
        <Route path={'/page-2'} element={<Page2 />}/>
        <Route path={'/page-3'} element={<Page3 />}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App


