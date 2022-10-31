import React from 'react'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import './newReg.css'
import axios from 'axios'
import AOS from "aos";
import "aos/dist/aos.css";
import { ImDisplay } from 'react-icons/im'
AOS.init();

export default function NewReg() {
  const [userName, setUserName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [role, setRole] = useState(0)
  const [user, setUser] = useState("")
  const navigate = useNavigate();
  const bt = document.getElementById('loginBtn');

  useEffect(()=>{
    if(JSON.parse(localStorage.getItem('user')) == null){
      setUser('Student')
    }
    else{
      setUser(JSON.parse(localStorage.getItem('user')))
    }

    if(localStorage.getItem('addAdmin')==1){
      document.getElementById('loginBtn').style.display='none';
    }
    console.log(user);
  },[bt,user])

  
  function addData(e){
    e.preventDefault()
    userName[0].toUpperCase();
    
    if(validation()){

      axios.post(`http://localhost:3500/${user}`,{
        userName : userName,
        email : email,
        password : password,

      })
      .then((res)=>{
        window.alert(res.data.message);
        if(localStorage.getItem('addAdmin') != 1){
          navigate(`/login`)
        }
        else{
          navigate(`/`)
        }
      })
      .catch((error)=>{
        const message = error.response.data?.error || error.message;
        window.alert(message)
      })
    }
  }

  function validation(){
    if(userName.length < 3 || userName.length > 20){
      window.alert("User name must contain at least 3 alphabets and at most 20 alphabets")
      return 0
    }
    if(email.length < 10 || email.length > 25){
      window.alert("Email must contain at least 10 characters and at most 20 characters")
      return 0
    }
    if(password.length < 5 || password.length > 15){
      window.alert("Your password must contain at least 5 characters and at most 15 characters")
      return 0
    }
    if((!password.includes('@')) && (!password.includes('#')) && (!password.includes('$')) && (!password.includes('%')) && (!password.includes('&'))){
      window.alert('Your password must contain at least one special character such as @, #, $, % or &')
      return 0
    }
    return 1
  }

  return (
      <div className='Container' data-aos="fade-up" data-aos-duration="1000">
        <h1 id={'heading'}>{user} Registeration Form</h1>

        <form onSubmit={addData} className='formClass'>
          <label htmlFor="userName" className='lableClass'>User Name </label>
          <br />
          <input
            id="userName"
            className='inputfield'
            type="text"
            onChange={(e)=>{setUserName(e.target.value)}}
            value={userName}
            required
          />
          <br />
          <br />

          <label htmlFor="email" className='lableClass'>Email </label>
          <br />
          <input
            id="email"
            className='inputfield'
            type="email"
            onChange={(e)=>{setEmail(e.target.value)}}
            value={email}
            required
          />
          <br />
          <br />

          <label htmlFor="password" className='lableClass'>Password  </label>
          <br />
          <input
            id="password"
            className='inputfield'
            type="password"
            onChange={(e)=>{setPassword(e.target.value)}}
            value={password}
            required
          />
          <br />
          <br />
          <div className='btndiv'>
            <button type="submit" className='buttonClass'>
              Submit
            </button>
            <button type="button" id='loginBtn' className='buttonClass' onClick={()=>navigate('/login')}>
              Login
            </button>
          </div>

        </form>
      </div>
      )
}
