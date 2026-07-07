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
import CompanyDashboard from './Components/CompanyModule/Dashboard'
import CompanyProfile from './Components/CompanyModule/CompanyProfile'
import CreateJob from './Components/CompanyModule/CreateJob'
import ApplicantManagement from './Components/CompanyModule/ApplicantManagement'
import Shortlisting from './Components/CompanyModule/Shortlisting'
import Interview from './Components/CompanyModule/Interview'
import FinalResult from './Components/CompanyModule/FinalResult'
import AdminDashboard from './Components/AdminModule/AdminDashboard'
import StudentManagement from './Components/AdminModule/StudentManagement/StudentManagement'
import CompanyManagement from './Components/AdminModule/CompanyManagement/CompanyManagement'
import Reports from './Components/AdminModule/ReportsModule/Reports'



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
          <Route element = {<CompanyDashboard/>} path='/company/dashboard'></Route>
          <Route element = {<CompanyProfile/>} path='/company/profile'></Route>
          <Route element = {<CreateJob/>} path='/company/createJob'></Route>
          <Route element = {<ApplicantManagement/>} path='/company/applications'></Route>
          <Route element = {<Shortlisting/>} path='/company/shortlisting'></Route>
          <Route element = {<Interview/>} path='/company/interview'></Route>
          <Route element = {<FinalResult/>} path='/company/result'></Route>
          <Route element = {<AdminDashboard/>} path='/admin/dashboard'></Route>
          <Route element = {<StudentManagement/>} path='/admin/studentManagement'></Route>
          <Route element = {<CompanyManagement/>} path='/admin/companyManagement'></Route>
          <Route element = {<Reports/>} path='/admin/reports'></Route>
        </Routes>
      </Router>
    </div>
  )
}
export default App
