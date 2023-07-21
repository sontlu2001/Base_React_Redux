import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import MainLayout from './layouts/MainLayout'
import Dashboard from './pages/Dashboard'
import { Route, Routes } from 'react-router'
import About from './pages/About'
import Staff from './pages/Staff'
import StaffItem from './components/StaffItem'
import AddStaff from './components/AddStaff'
import StaffList from './components/StaffList'

function App() {
  return (
    <MainLayout>
      <Routes>
        <Route path='/' element={<Dashboard></Dashboard>}></Route>
        <Route path='/about' element={<About></About>}></Route>
        <Route path='/staff' element={<Staff></Staff>}>
          <Route path=':id' element={<StaffItem></StaffItem>}></Route>
          <Route path='add' element={<AddStaff></AddStaff>}></Route>
          <Route index element={<StaffList></StaffList>}></Route>
        </Route>
        <Route path='*' element={<div>404 Not Found</div>}></Route>
      </Routes>
    </MainLayout>
  )
}

export default App
