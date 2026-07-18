

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Login from './Components/Authorization/Login'
import './App.css'
import Start from './Components/Start'
import StudentSignup from './Components/Authorization/StudentSignup'
import CompanySignup from './Components/Authorization/CompanySignup'
import RoleSelection from './Components/Authorization/RoleSelection'
import AdminSignup from './Components/Authorization/AdminSignup'
import Navbar from './Components/CommonComp/NavBar'
import Dashboard from './Components/StudentModule/Dashboard'
import Profile from './Components/StudentModule/Profile'
import Applications from './Components/StudentModule/Applications'
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
import UserSignup from './Components/Authorization/UserSignup'
import ManageJobs from './Components/CompanyModule/JobModule/ManageJobs'
import UpcomingInterviews from './Components/CompanyModule/interviewModule/UpcomingInterviews'
import InterviewResults from './Components/CompanyModule/interviewModule/InterviewResults'
import GenerateOfferLetter from './Components/CompanyModule/GenerateOfferLetter'
import ManageJobs1 from './Components/StudentModule/Jobs/ManageJobs'
import CompanyList from './Components/StudentModule/CompanyList'
import JobDetails from './Components/StudentModule/Jobs/JobDetails'
import { StudentProvider } from './Components/Contexts/StudentContext'
import CompanyDetails from './Components/StudentModule/CompanyDetails'
import Interviews from './Components/StudentModule/Interviews'



const App = () => {

  return (
    <div>
      <Router>
        <StudentProvider>
         <Navbar/>
        <Routes>
          <Route element = {<Start/>} path='/'></Route>
          <Route element = {<Login/>} path='/login'></Route>
          <Route element = {<RoleSelection/>} path='/role'></Route>
          <Route element = {<UserSignup/>} path='/register'></Route>

          {/* Students */}
          <Route element = {<StudentSignup/>} path='/studentsignup'></Route>
          <Route element = {<CompanySignup/>} path='/companysignup'></Route>
          <Route element = {<AdminSignup/>} path='/adminsignup'></Route>
          <Route element = {<Dashboard/>} path='/student/dashboard'></Route>
          <Route element = {<Profile/>} path='/student/profile'></Route>
          <Route element = {<Applications/>} path='/student/applications'></Route>
          <Route element = {<CompanyList/>} path='/student/companies/companylist'></Route>
          <Route element = {<ManageJobs1/>} path='/student/companies/jobs'></Route>
          <Route path="/student/companies/jobs/:id" element={<JobDetails/>}/>
          <Route path="/student/companies/details" element={<CompanyDetails/>}/>
          <Route path="/student/interviews" element={<Interviews/>}/>

          {/* Company */}
          <Route element = {<CompanyDashboard/>} path='/company/dashboard'></Route>
          <Route element = {<CompanyProfile/>} path='/company/profile'></Route>
          <Route element = {<ManageJobs/>} path='/company/jobs'></Route>
          <Route element = {<CreateJob/>} path='/company/jobs/createJob'></Route>
          <Route element = {<ApplicantManagement/>} path='/company/jobs/applications'></Route>
          <Route element = {<Shortlisting/>} path='/company/shortlisting'></Route>
          <Route element = {<Interview/>} path='/company/interview'></Route>
          <Route element = {<UpcomingInterviews/>} path='/company/interview/upcoming'></Route>
          <Route element = {<InterviewResults/>} path='/company/interview/interviewResults'></Route>
          <Route element = {<FinalResult/>} path='/company/result'></Route>
          <Route element = {<GenerateOfferLetter/>} path='/company/result/publish'></Route>
          <Route element = {<AdminDashboard/>} path='/admin/dashboard'></Route>
          <Route element = {<StudentManagement/>} path='/admin/studentManagement'></Route>
          <Route element = {<CompanyManagement/>} path='/admin/companyManagement'></Route>
          <Route element = {<Reports/>} path='/admin/reports'></Route>
        </Routes>
      </StudentProvider>
      </Router>
    </div>
  )
}
export default App
