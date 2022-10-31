import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import "./PageStyle/home.css";
import { useNavigate } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";
// import { ImDisplay } from "react-icons/im";
import { BiPhoneCall, BiSearchAlt, BiSearch } from "react-icons/bi";
AOS.init();

export default function Home() {
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:3500/companyList")
      .then((res) => {
        setData(res.data);
      })
      .catch((error) => {
        const message = error.response.data?.error || error.message;
        window.alert(message);
        console.log(error);
      });
  }, []);

  function search(e){
    e.preventDefault()
    const searchValue = e.target.value
    const CapitalSearch = searchValue.toUpperCase()
    let companyCards = document.getElementsByClassName('OuterContainer') 
    Array.from(companyCards).forEach((element)=>{
      let compName = element.getElementsByClassName('companyName');
      let location = element.getElementsByClassName('compLocation');
      let trueCompName = compName[0].innerText;
      let CapitalTrueCompName = trueCompName.toUpperCase()

      let trueLocation = location[0].innerText
      let CapitalTrueLocation = trueLocation.toUpperCase()

      if(CapitalTrueCompName.includes(CapitalSearch) || CapitalTrueLocation.includes(CapitalSearch)){
        element.style.display="block";
      }
      else{
        element.style.display="none";
      }
    })     
  }
  

  return(
    <div className="homeContainer"> 
      <div className="listHeader">
        <h1 id={"homeHeading"}>COMPANY LIST</h1>
        <div>
          <span id='spanLogo'><BiSearch size={20}/></span><input id='serachBar' placeholder="Search Company / Location" onChange={search} />
        </div>
      </div>

      <div
        className="companyListContainer"
        data-aos="fade-up" data-aos-duration="1000"
      >
        {data.map((item, i) => (
          <div className="OuterContainer"  key={i}>
          <div className="companyCard" key={i} onClick={()=>localStorage.getItem('token')?navigate(`card/${item.compId}`):window.alert('Please Login')}>
            <div className="compLogo">
              <img className='imgClass' src={item.logo} />
            </div>
            
            <div className="detailCard">
              <div className="companyName field" >{(item.compName).replaceAll('_', ' ')}</div>
              <div className="compContact field">
                {item.contact}
                <span> </span>
                <BiPhoneCall />
              </div>
              <div className="compRating field">Rating : {item.rating}/5</div>
              <div className="compLocation ">{item.location}</div>
            </div>
          </div>
          </div>
        ))}
      </div>
    </div>
  );
}
