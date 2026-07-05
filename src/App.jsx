import React from 'react'

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Login from './Components/Authorization/Login'

import Start from './Components/Start'
import StudentSignup from './Components/Authorization/StudentSignup'
import CompanySignup from './Components/Authorization/CompanySignup'
import RoleSelection from './Components/Authorization/RoleSelection'
import AdminSignup from './Components/Authorization/AdminSignup'
import Navbar from './Components/CommonComp/NavBar'
import Dashboard from './Components/StudentModule/Dashboard'
import Profile from './Components/StudentModule/Profile'
import Applications from './Components/StudentModule/Applications'
import CompanyList from './Components/StudentModule/CompanyList'




const App = () => {

  return (
    <div>
      <Router>
         <Navbar/>
        <Routes>
          <Route element = {<Start/>} path='/'></Route>
          <Route element = {<Login/>} path='/login'></Route>
          <Route element = {<RoleSelection/>} path='/role'></Route>
          <Route element = {<StudentSignup/>} path='/studentsignup'></Route>
          <Route element = {<CompanySignup/>} path='/companysignup'></Route>
          <Route element = {<AdminSignup/>} path='/adminsignup'></Route>
          <Route element = {<Dashboard/>} path='/student/dashboard'></Route>
          <Route element = {<Profile/>} path='/student/profile'></Route>
          <Route element = {<Applications/>} path='/student/applications'></Route>
          <Route element = {<CompanyList/>} path='/student/companylist'></Route>
        </Routes>
      </Router>
    </div>
  )
}
export default App
