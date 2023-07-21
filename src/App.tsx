import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import MainLayout from './layouts/MainLayout'
import Dashboard from './pages/Dashboard'
import { Route, Routes } from 'react-router'
import About from './pages/About'
import StaffList from './pages/StaffList'

function App() {
  return (
    <MainLayout>
      <Routes>
        <Route path='/' element={<Dashboard></Dashboard>}></Route>
        <Route path='/about' element={<About></About>}></Route>
        <Route path='/staff' element={<StaffList></StaffList>}></Route>
      </Routes>
    </MainLayout>
  )
}

export default App
