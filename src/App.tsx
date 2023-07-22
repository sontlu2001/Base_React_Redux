import './App.css'
import MainLayout from './layouts/MainLayout'
import Dashboard from './pages/Dashboard'
import { Route, Routes } from 'react-router'
import About from './pages/About'
import Staff from './pages/Staff'

function App() {
  return (
    <MainLayout>
      <Routes>
        <Route path='/' element={<Dashboard></Dashboard>}></Route>
        <Route path='/about' element={<About></About>}></Route>
        <Route path='/staff/(*' element={<Staff></Staff>}></Route>
        <Route path='*' element={<div>404 Not Found</div>}></Route>
      </Routes>
    </MainLayout>
  )
}

export default App
