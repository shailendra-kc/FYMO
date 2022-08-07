import React, { createContext, useReducer } from 'react'
import { Route,Routes } from 'react-router-dom'
import  Navbar from './components/Navbar/Navbar'
import Home from './components/Home/Home'
import Contact from './components/Contact/Contact'
import Login from './components/Login/Login'
import Register from './components/Register/Register'
import Status from './components/Status/Status'
import Logout from './components/Logout/Logout'
import Details from './components/Details/Details'
import Person from './components/Person/Person'
import Error from './components/Error/Error'
import {reducer,intialState} from '../src/reducer/UseReducer'


export const UserContext=createContext();


const App=()=>{

  const [state,dispatch]=useReducer(reducer,intialState);
  return (
    <div>
  
     <UserContext.Provider value={{state,dispatch}}>
      <Navbar/>
      <Routes>
        <Route exact path='/' element={<Home/>} />
        <Route exact path='/contact' element={<Contact/>} />
        <Route exact path='/register' element={<Register/>} />
        <Route exact path='/login' element={<Login/>} />
        <Route exact path='/status' element={<Status/>} />
        <Route exact path='/person' element={<Person/>} />
        <Route exact path='/details' element={<Details/>} />
        <Route exact path='/logout' element={<Logout/>} />
        <Route  path='*' element={<Error/>} />
      </Routes>
      </UserContext.Provider>
    </div>
  )
}
export default App