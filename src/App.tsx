import './App.css'
import MainLayout from './layouts/MainLayout'
import Dashboard from './pages/Dashboard'
import { Route, Routes, useRoutes } from 'react-router'
import About from './pages/About'
import Staff from './pages/Staff'
import StaffItem from './components/StaffItem'
import AddStaff from './components/AddStaff'
import NotFound from './components/NotFound'

function App() {
  const elements = useRoutes([
    {
      path: '/',
      element: <Dashboard />
    },
    {
      path: '/about',
      element: <About />
    },
    {
      path: '/staff',
      element: <Staff />,
      children: [
        {
          path: ':id',
          element: <StaffItem />
        },
        {
          path: 'add',
          element: <AddStaff />
        }
      ]
    },
    {
      path: '*',
      element: <NotFound />
    }
  ])
  return (
    <MainLayout>
      {/* <Routes>
        <Route path='/' element={<Dashboard></Dashboard>}></Route>
        <Route path='/about' element={<About></About>}></Route>
        <Route path='/staff/(*' element={<Staff></Staff>}></Route>
        <Route path='*' element={<div>404 Not Found</div>}></Route>
      </Routes> */}
      {elements}
    </MainLayout>
  )
}

export default App
