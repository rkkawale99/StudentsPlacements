import React from 'react'

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Login from './Components/Authorization/Login'

import Start from './Components/Start'
import StudentSignup from './Components/Authorization/StudentSignup'




const App = () => {
  return (
    <div>
      <Router>
        <Routes>
          <Route element = {<Start/>} path='/'></Route>
          <Route element = {<Login/>} path='/login'></Route>
          <Route element = {<StudentSignup/>} path='/signup'></Route>
        </Routes>
      </Router>
    </div>
  )
}
export default App
