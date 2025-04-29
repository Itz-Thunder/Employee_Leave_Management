import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import LoginPage from './pages/Login'
import EmployeeDashboard from './pages/EmployeeDashboard'
import AdminDashboard from './pages/AdminDashboard'

const App = () => {
  return (
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<LoginPage/>} />
      <Route path='/employee' element={<EmployeeDashboard/>} />
      <Route path='/admin' element={<AdminDashboard/>} />
    </Routes>
    </BrowserRouter>
  )
}

export default App