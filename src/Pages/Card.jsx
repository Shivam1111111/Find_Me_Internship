import axios from "axios";
import React from "react";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./PageStyle/card.css";

export default function Card() {
  const { id } = useParams();
  const [company, setCompany] = useState([]);
  const navigate = useNavigate();
  const [withSpace, setWithSpace] = useState('');


  function conformation(){
    if(localStorage.getItem('role')==2 || localStorage.getItem('role')==1){
      document.getElementById("editBtnId").style.display = "block";
      document.getElementById("deleteBtnId").style.display = "block";
      document.getElementById('addReviewBtnId').style.display = 'none';
      document.getElementById('applyBtnId').style.display = 'none';
    }
    
    // else if(localStorage.getItem('role')==1){
    //   document.getElementById("addCompId").style.display = "block";
    // }
  }

  useEffect(() => {
    conformation();
    axios
      .get(`http://localhost:3500/card/${id}`)
      .then((res) => {
        setCompany(res.data[0]);
        // console.log(res.data[0].compName)
        const withSpaceString = (res.data[0].compName).replaceAll('_', ' ');
        setWithSpace(withSpaceString);
        
      })
      .catch((error) => {
        const message = error.response.data?.error || error.message;
        window.alert(message);
      });
  }, []);

  function deleteComp(companyId,companyName){
    axios.post(`http://localhost:3500/deleteCompany/${companyId}/${companyName}`,{
      token : localStorage.getItem('token')
    })
    .then((res)=>{
      window.alert(res.data.message);
      navigate('/');
    })
    .catch((error)=>{
      const message = error.response.data?.error || error.message;
      window.alert(message)
    })
  }

  return (
    <div className="cardContainer" 
        // style={{
        //   background:'rgba(218, 214, 207, 0.652)',
        //   backgroundImage: `url(${company.logo})`,
        //   backgroundRepeat:'no-repeat',
        //   backgroundPosition:'center',
        //   }}
        >
      <div className="firstDiv">

        <div className="logoDiv">
          <img className="logoClass" src={company.logo} />
        </div>
        <br/>

        <div className="detailDiv">
          <label htmlFor="companyName" className='cmpLable'>Company Name </label>
          <br/>
          <div className="ansClass">{withSpace}</div>
          <br />

          <label htmlFor="location" className='cmpLable'>Location</label>
          <br/>
          <div className="ansClass">{company.location}</div>
          <br />

          <label htmlFor="contact" className='cmpLable'>Contact </label>
          <br/>
          <div className="ansClass">{company.contact}</div>
          <br />

          <label htmlFor="genEmail" className='cmpLable'> Email</label>
          <br/>
          <div className="ansClass">{company.generalEmail}</div>
          <br />

          <label htmlFor="ceoName" className='cmpLable'>CEO Name </label>
          <br/>
          <div className="ansClass">{company.ceoName}</div>
          <br />

          <label htmlFor="discription" className='cmpLable'>Description</label>
          <br/>
          <div className="ansClass">{company.description}</div>
        </div>
      </div>

      <div className="secondDiv">
        <h1 className="compHeading">Internship Details</h1>
        <div className="internshipDtl">

          <label htmlFor="hrName" className='cmpLable'>HR Name </label>
          <br/>
          <div className="ansClass">{company.hrName}</div>
          <br />
        
          <label htmlFor="hrEmail" className='cmpLable'>HR Email</label>
          <br/>
          <div className="ansClass">{company.hrEmail}</div>
          <br />
 
          <label htmlFor="role" className='cmpLable'>Your Role</label>
          <br/>
          <div className="ansClass">{company.role}</div>
          <br />

          <label htmlFor="technology" className='cmpLable'>Technology</label>
          <br/>
          <div className="ansClass">{company.technology}</div>

          <br />

          <label htmlFor="intMode" className='cmpLable'>Internship Mode</label>
          <br/>
          <div className="ansClass">{company.intMode}</div>

          <br />

          <label htmlFor="payStatus" className='cmpLable'>Pay Status</label>
          <br/>
          <div className="ansClass">{company.payStatus} :  {company.stipend}</div>
          <br/>
          <br/>

          <div id='ratingDiv'>
            Rating : {company.rating}/5
          </div>
        </div>

        <div className="CardBtnDiv">
          <button id='editBtnId' className="CardButtonClass" onClick={()=>navigate(`/update/${company.compId}`)}>Edit</button>
          <button id='deleteBtnId' className="CardButtonClass" onClick={()=>deleteComp(company.compId,company.compName)}>Delete</button>
          <button id='addReviewBtnId' className="CardButtonClass" onClick={()=>navigate(`/addReview/${company.compId}/${company.compName}`)}>Add Review</button>
          <button id='seeReviewBtnId' className="CardButtonClass" onClick={()=>navigate(`/reviewPage/${company.compName}`)}>See Review</button>
          <button id='applyBtnId' className="CardButtonClass">Apply</button>
      </div>
      </div>
    </div>
  );
}
