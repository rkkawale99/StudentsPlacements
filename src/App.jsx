import React from 'react'

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Login from './Components/Authorization/Login'
import Signup from './Components/Authorization/Signup'
import Start from './Components/Start'
import "./custom-bootstrap.scss";



const App = () => {
  return (
    <div>
      <Router>
        <Routes>
          <Route element = {<Start/>} path='/'></Route>
          <Route element = {<Login/>} path='/login'></Route>
          <Route element = {<Signup/>} path='/signup'></Route>
        </Routes>
      </Router>
    </div>
  )
}
export default App
