import React, { useState, useEffect } from 'react'
import {NavLink , useNavigate} from 'react-router-dom';
import './style/navbar.css'
// import { FaInstagramSquare, FaGithubSquare} from 'react-icons/fa';
import { GiHamburgerMenu } from 'react-icons/gi';
import { ImCross } from 'react-icons/im'

export default function Navbar() {
  const [menuIcon, setMenuIcon] = useState(false);
  // const [screenWidth, setScreenWidth] = useState(window.innerWidth)
  const addComp = document.getElementById("addCompId");
  const addAdmin = document.getElementById("addAdminId");
  const navigate = useNavigate()


function logedOut(){
  localStorage.clear();
  navigate('/');
  window.location.reload();

}

function addAdminfunk(){
  localStorage.setItem('addAdmin',JSON.stringify(1))
}

function conformation(){
  if(localStorage.getItem('role')==2){
    document.getElementById("addAdminId").style.display = "block";
    document.getElementById("addCompId").style.display = "block";
  }
  else if(localStorage.getItem('role')==1){
    document.getElementById("addCompId").style.display = "block";
  }
}

  useEffect(() => {
    
    conformation();
    
  }, [])
  
  return (
    <div className='cont'>
      <nav className='navbar'>
        {/* <div className='logoDiv'> */}
          <NavLink to='/' ><img className="logo"  src={process.env.PUBLIC_URL+"image/Logo5.png"} alt="Find Me Hostel"></img></NavLink>
        {/* </div> */}
        <ul className={menuIcon ? 'navlinksMobile' : 'navlinks'} onClick={()=>{setMenuIcon(false)}}>
              <NavLink to="/" className='liItems' activeclass="active"><li>Home</li></NavLink>
              <NavLink to="/about"  className='liItems' activeclass="active"><li>About</li></NavLink>
              <NavLink id="addCompId" to="/compForm" className='liItems'  activeclass="active"><li>Add Company</li></NavLink>
              <NavLink id="addAdminId" to="/NewReg"  className='liItems' activeclass="active" onClick={addAdminfunk} ><li>Add Admin</li></NavLink>
              {!localStorage.getItem('token') ? <NavLink to="/newReg" className='liItems loginId' activeclass="active"><li>Login</li></NavLink> : <NavLink to="/" className='liItems loginId' activeclass="active" onClick={logedOut}><li>Logout</li></NavLink>}
        </ul>
          {/* {(menuIcon || screenWidth > 700) && (
              <ul className="list">
                <li className='liclass'><NavLink  className="items" to="/" activeclass="active" >Home</NavLink></li>
                <li className='liclass'><NavLink  className="items" to="/about" activeclass="active" >About</NavLink></li>
                {!localStorage.getItem('token') ? <li className='liclass'><NavLink  className="items" to="/newReg" activeclass="active" >Login</NavLink></li> : <li className='liclass'><NavLink  className="items" to="/" activeclass="active" onClick={logedOut}>LogOut</NavLink></li>}
                <li className='liclass'><NavLink  className="items" id="addCompId" to="/compForm" activeclass="active" >Add Company</NavLink></li>
                <li className='liclass'><NavLink  className="items" id="addAdminId" to="/NewReg" activeclass="active" onClick={addAdminfunk}>Add Admin</NavLink></li>
              </ul>
            )} */}
        <button className="btn" onClick={()=>setMenuIcon(!menuIcon)}>{menuIcon ? <ImCross size={25}/> : <GiHamburgerMenu size={25}/>}</button>
      </nav>
    </div>
  )
}
