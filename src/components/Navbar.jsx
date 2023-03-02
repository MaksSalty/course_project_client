import React from 'react'
import { Link, NavLink } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { checkIsAuth, logout } from '../redux/authSlice'
import { toast } from 'react-toastify'

export const Navbar = () => {
  const isAuth = useSelector(checkIsAuth)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const activeStyles = { color: 'black' }

  const logoutHandler = () => {
    dispatch(logout())
    window.localStorage.removeItem('token')
    toast('You are logout')
    navigate('/')
  }
  return (
    <div className="flex bg-white border mx-auto sticky top-0">
      <div className="flex py-3 px-6 container mx-auto justify-between max-w-7xl">
        <div className="flex justify-center items-center w-7 h-7 bg-gray-600 text-xl font-extrabold text-white rounded">
          <NavLink to={'/'}>A</NavLink>
        </div>
        {isAuth && (
          <ul className="flex gap-7 my-auto">
            <li>
              <NavLink
                to={'/'}
                className="text-gray-500 hover:text-gray-600"
                style={({ isActive }) => (isActive ? activeStyles : undefined)}
              >
                Main
              </NavLink>
            </li>
            <li>
              <NavLink
                to={'/collects'}
                className="text-gray-500 hover:text-gray-600"
                style={({ isActive }) => (isActive ? activeStyles : undefined)}
              >
                My collections
              </NavLink>
            </li>
            <li>
              <NavLink
                to={'/new'}
                className="text-gray-500 hover:text-gray-600"
                style={({ isActive }) => (isActive ? activeStyles : undefined)}
              >
                Add collection
              </NavLink>
            </li>
          </ul>
        )}

        <div>
          {isAuth ? (
            <button
              onClick={logoutHandler}
              className="flex bg-gray-600 text-xs text-white rounded px-4 py-2 hover:bg-red-500"
            >
              Sign out
            </button>
          ) : (
            <div className="flex gap-2">
              <button className="flex bg-gray-600 text-xs text-white rounded px-4 py-2 hover:bg-green-500">
                <Link to={'/login'}>Sign in</Link>
              </button>
              <button className="flex bg-gray-600 text-xs text-white rounded px-4 py-2 hover:bg-yellow-500">
                <Link to={'/register'}>Sign up</Link>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
