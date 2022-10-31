import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import './newReg.css'

export default function AuthLogin() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const navigate = useNavigate();

  function logedin(e) {
    e.preventDefault()

    axios.post('http://localhost:3500/authorityLogin',{
      email : email,
      password : password
    })
    .then((res)=>{
      localStorage.setItem('token', res.data.token);
      window.alert(res.data.message);
      navigate('/')
    })
    .catch((error)=>{
      const message = error.response.data?.error || error.message;
      window.alert(message)
    })
  }

  return (
    <div className='Container'>
      <h1 id={'heading'}>Hostel Authority Login Form</h1>

      <form onSubmit={logedin} className='formClass'>
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
          <button type="button" className='buttonClass' onClick={()=>navigate('/authReg')}>
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
