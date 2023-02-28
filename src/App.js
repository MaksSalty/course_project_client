import { Layout } from './components/Layout.jsx'
import { Routes, Route } from 'react-router-dom'

import { Main } from './pages/Main'
import { Collects } from './pages/Collects'
import { Collect } from './pages/Collect'
import { CollectAdd } from './pages//CollectAdd'
import { CollectEdit } from './pages/CollectEdit'
import { Register } from './pages/Register'
import { Login } from './pages/Login'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { getMe } from './redux/authSlice.js'

function App() {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getMe())
  }, [dispatch])

  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="collects" element={<Collects />} />
        <Route path=":id" element={<Collect />} />
        <Route path=":id/edit" element={<CollectEdit />} />
        <Route path="new" element={<CollectAdd />} />
        <Route path="register" element={<Register />} />
        <Route path="login" element={<Login />} />
      </Routes>

      <ToastContainer position="bottom-right" theme="dark" />
    </Layout>
  )
}

export default App
