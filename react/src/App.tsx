import Blog from './pages/blog'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { Fragment } from 'react'

function App() {
  return (
    <Fragment>
      <ToastContainer></ToastContainer>
      <Blog></Blog>
    </Fragment>
  )
}

export default App
