import React from 'react'
import { Link, NavLink } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { checkIsAuth, logout } from '../redux/features/authSlice'
import { toast } from 'react-toastify'

export const Navbar = () => {
  const isAuth = useSelector(checkIsAuth)
  const dispatch = useDispatch()
  const activeStyles = { color: 'white' }

  const logoutHandler = () => {
    dispatch(logout())
    window.localStorage.removeItem('token')
    toast('You are logout')
  }
  return (
    <div className="flex py-4 px-6 justify-between items-center bg-gray-600">
      <div className="flex justify-center items-center w-7 h-7 bg-white text-xl font-extrabold text-gray-600 rounded">
        <NavLink to={'/'}>A</NavLink>
      </div>
      {isAuth && (
        <ul className="flex gap-7">
          <li>
            <NavLink
              to={'/'}
              className="text-gray-400 hover:text-white"
              style={({ isActive }) => (isActive ? activeStyles : undefined)}
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to={'/collects'}
              className="text-gray-400 hover:text-white"
              style={({ isActive }) => (isActive ? activeStyles : undefined)}
            >
              My collections
            </NavLink>
          </li>
          <li>
            <NavLink
              to={'/new'}
              className="text-gray-400 hover:text-white"
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
            className="flex bg-gray-500 text-xs text-white rounded px-4 py-2 hover:bg-gray-400"
          >
            Sign out
          </button>
        ) : (
          <div className="flex gap-2">
            <button className="flex bg-gray-500 text-xs text-white rounded px-4 py-2 hover:bg-gray-400">
              <Link to={'/login'}>Sign in</Link>
            </button>
            <button className="flex bg-gray-500 text-xs text-white rounded px-4 py-2 hover:bg-gray-400">
              <Link to={'/register'}>Sign up</Link>
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
