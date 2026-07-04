import React from 'react'

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Login from './Components/Authorization/Login'

import Start from './Components/Start'
import StudentSignup from './Components/Authorization/StudentSignup'
import CompanySignup from './Components/Authorization/CompanySignup'
import RoleSelection from './Components/Authorization/RoleSelection'
import AdminSignup from './Components/Authorization/AdminSignup'




const App = () => {
  return (
    <div>
      <Router>
        <Routes>
          <Route element = {<Start/>} path='/'></Route>
          <Route element = {<Login/>} path='/login'></Route>
          <Route element = {<RoleSelection/>} path='/role'></Route>
          <Route element = {<StudentSignup/>} path='/studentsignup'></Route>
          <Route element = {<CompanySignup/>} path='/companysignup'></Route>
          <Route element = {<AdminSignup/>} path='/adminsignup'></Route>
        </Routes>
      </Router>
    </div>
  )
}
export default App
