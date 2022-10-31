import React from 'react'
import { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import {Global} from '../../App';
import axios from 'axios'
import './newReg.css'
import AOS from "aos";
import "aos/dist/aos.css";
AOS.init();



export default function Login({}) {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const {getState} = useContext(Global);
  const navigate = useNavigate();

  async function logedin(e) {
    e.preventDefault();
    validation();

    axios.post(`http://localhost:3500/${JSON.parse(localStorage.getItem('user'))}login`,{
      email : email,
      password : password
    })
    .then((res)=>{
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('role', res.data.role);
      window.alert(res.data.message);
      navigate('/')
      window.location.reload();
    })
    .catch((error)=>{
      const message = error.response.data?.error || error.message;
      window.alert(message)
    })
  }

  function validation(){
    if(email.includes('@charusat.ac.in')){
      localStorage.setItem('user',JSON.stringify('Admin'))
      return
    }
    else{
      localStorage.setItem('user',JSON.stringify('Student'))
    }
  }

  return (
    <div className='Container' data-aos="fade-up" data-aos-duration="1000">
      <h1 id={'heading'}>Login Form</h1>

      <form onSubmit={logedin} className='formClass' >
        <label htmlFor="email" className='lableClass'>Email</label><br/>
        <input
          id="email"
          className='inputfield'
          type="email"
          onChange={(e) => { setEmail(e.target.value) }}
          value={email}
          required
        />
        <br />
        <br />

        <label htmlFor="password" className='lableClass'>Password </label><br/>
        <input
          id="password"
          className='inputfield'
          type="text"
          onChange={(e) => { setPassword(e.target.value) }}
          value={password}
          required
        />
        <br />
        <br />
        <div className='btndiv'>
          <button type="button" className='buttonClass' onClick={()=>navigate('/newReg')}>
              Register
          </button>
          <button type="submit" className='buttonClass'>
            Login
          </button>
        </div>
      </form>
    </div>
  )
}
