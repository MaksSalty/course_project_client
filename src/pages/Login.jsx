import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { checkIsAuth, loginUser } from '../redux/features/authSlice'
import { toast } from 'react-toastify'

export const Login = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const { status } = useSelector((state) => state.auth)
  const isAuth = useSelector(checkIsAuth)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    if (status) toast(status)
    if (isAuth) navigate('/')
  }, [status, isAuth, navigate])

  const handleSubmit = () => {
    try {
      dispatch(loginUser({ username, password }))
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <div className="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8">
        <form onSubmit={(e) => e.preventDefault()} className="mt-8 space-y-6">
          <h1 className="text-2xl text-center font-bold text-gray-600">
            Sign in
          </h1>
          <label className="text-xs text-gray-400">
            User Name:
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter your name"
              className="w-full rounded border border-gray-400 px-3 py-2 text-gray-700 focus:border-gray-600 focus:outline-none sm:text-sm"
            />
          </label>

          <label className="text-xs text-gray-400">
            Password:
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
              className="w-full rounded border border-gray-400 px-3 py-2 text-gray-700 focus:border-gray-600 focus:outline-none sm:text-sm"
            />
          </label>

          <div className="flex gap-8 justify-center mt-4">
            <button
              type="submit"
              onClick={handleSubmit}
              className="flex w-full justify-center rounded bg-gray-600 py-2 px-4 text-white hover:bg-gray-500"
            >
              SIGN IN
            </button>
          </div>
          <div>
            <Link
              to="/register"
              className="flex justify-center text-gray-600 hover:text-gray-500"
            >
              Create an account
            </Link>
          </div>
        </form>
      </div>
    </div>
  )
}
