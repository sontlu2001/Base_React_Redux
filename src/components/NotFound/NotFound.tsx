import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const NotFound = () => {
  const navigate = useNavigate()
  useEffect(() => {
    const timeOut = setTimeout(() => {
      navigate('/', {
        state: 'Redirect from notfound'
      })
    }, 2000)
  }, [navigate])

  return <div>Trang web không tồn tại !</div>
}

export default NotFound
