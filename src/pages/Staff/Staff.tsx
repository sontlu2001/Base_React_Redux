import { NavLink, Outlet } from 'react-router-dom'

export default function Staff() {
  return (
    <div>
      <h1 className='mb-6 text-lg'>Staff</h1>
      <div className='border-b border-gray-200 text-center text-sm font-medium text-gray-500  '>
        <ul className='-mb-px flex flex-wrap'>
          <li className='mr-2'>
            <NavLink
              to='/staff'
              end
              className={({ isActive }) => `inline-block rounded-t-lg border-b-2 
              ${
                isActive
                  ? 'border-blue-600 p-4 text-blue-600'
                  : 'border-transparent p-4 hover:border-gray-300 hover:text-gray-600 '
              } `}
            >
              List
            </NavLink>
          </li>
          <li className='mr-2'>
            <NavLink
              to='/staff/add'
              className={({ isActive }) => `inline-block rounded-t-lg border-b-2 p-4 
                ${
                  isActive
                    ? 'border-blue-600  text-blue-600'
                    : 'border-transparent hover:border-gray-300 hover:text-gray-600 '
                } `}
              aria-current='page'
            >
              Add
            </NavLink>
          </li>
        </ul>
      </div>
      <Outlet context={{ data: 'Data outlet' }}></Outlet>
    </div>
  )
}
