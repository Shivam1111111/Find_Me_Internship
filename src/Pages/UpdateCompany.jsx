import React from 'react'
import { useState, useContext  } from 'react'
import { useNavigate , useParams} from 'react-router-dom'
import "./PageStyle/CompForm.css";
import { Global } from '../App';
import axios from 'axios'
import AOS from "aos";
import "aos/dist/aos.css";
import { ImDisplay } from 'react-icons/im'
import { useEffect } from 'react';
AOS.init();

export default function UpdateCompany() {

    const {getName} = useContext(Global); 
    const { id } = useParams();

    const [data, setData] = useState([]);

    
    const [compName, setCompName] = useState(``);
    const [location, setLocation] = useState('');
    const [technology, setTechnology] = useState('');
    const [genEmailId, setGenEmailId] = useState('');
    const [genContact, setContact] = useState('');
    const [ceoName, setCeoName] = useState('');
    const [hrName, setHrName] = useState('');
    const [hrEmailId, setHrEmailId] = useState('');
    const [description, setDescription] = useState('');
    const [payOpt, setPayOpt] = useState('free');
    const [payment, setPayment] = useState('0');
    const [role, setRole] = useState('');
    const [intMode, setintMode] = useState('');
    const navigate = useNavigate();


    useEffect(()=>{
        axios.get(`http://localhost:3500/card/${id}`)
        .then((res)=>{
            // console.log(res.data[0]);
            setData(res.data[0]);
            // console.log(res.data[0].compName);
        })
        .catch((error)=>{
            const message = error.response.data?.error || error.message;
            window.alert(message);
        })
    },[id])

    useEffect(()=>{
        if(data){
            setCompName(data.compName);
            setLocation(data.location);
            setTechnology(data.technology);
            setGenEmailId(data.generalEmail);
            setContact(data.contact);
            setCeoName(data.ceoName);
            setHrName(data.hrName);
            setHrEmailId(data.hrEmail);
            setDescription(data.description);
            setPayOpt(data.payStatus);
            setPayment(data.stipend);
            setRole(data.role);
            setintMode(data.intMode);
        }
    },[data])

    const handlePaidChange = (e) => {
        const value = e.target.value;
        setPayOpt(value.toLowerCase());
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const nameWithSpace = compName[0].toUpperCase() + compName.slice(1)
        const strUnderscores = nameWithSpace.replaceAll(' ', '_');
        console.log(strUnderscores)
        
        getName(compName);
        
        if(validation()){
            axios.post(`http://localhost:3500/updateComp/${data.compId}/${data.compName }`,{
                token : localStorage.getItem('token'),
                compName : strUnderscores,
                location : location,
                technology : technology,
                intMode : intMode[0].toUpperCase() + intMode.slice(1),
                role : role[0].toUpperCase() + role.slice(1),
                genContact : genContact,
                genEmailId : genEmailId,
                ceoName : ceoName[0].toUpperCase() + ceoName.slice(1),
                hrName : hrName[0].toUpperCase() + hrName.slice(1),
                hrEmailId : hrEmailId,
                description : description,
                payOpt : payOpt[0].toUpperCase() + payOpt.slice(1),
                payment : payment
            }).
            then((res)=>{
                window.alert(res.data.message);
                navigate(`/logoForm/${strUnderscores}`)
            })
            .catch((error)=>{
                const message = error.response.data?.error || error.message;
                window.alert(message)
            })
        }
    }

    
    function validation(){
        if(compName.length < 3 || compName.length > 25){
          window.alert("Company name must contain at least 3 alphabets and at most 20 alphabets")
          return 0
        }
        if(genContact.length != 10){
          window.alert("Contect number must be of 10 digit")
          return 0;  
        }
        
        return 1;
      }

    return (
        <div className='CompContainer' data-aos="fade-up" data-aos-duration="1000">
            <h1 id={'Compheading'}>Company Registeration</h1>

            <form  className='CompformClass' onSubmit={handleSubmit}>
                <label htmlFor="companyName" className='ComplableClass'>Company Name </label>
                <br />
                <input
                    id='companyName'
                    className='Compinputfield'
                    type="text"
                    value={compName}
                    onChange={(e)=>{setCompName(e.target.value)}}
                    required
                />
                <br />
                <br />

                <label htmlFor="location" className='ComplableClass'>Location</label>
                <br/>
                <textarea
                    id='location'
                    className='Comptextfield'
                    type='text'
                    onChange={(e)=>{setLocation(e.target.value)}}
                    value={location}
                    required
                    />
                <br/>
                <br/>

                <label htmlFor="technology" className='ComplableClass'>Technologies</label>
                <br/>
                <textarea
                    id='technology'
                    className='Comptextfield'
                    type='text'
                    onChange={(e)=>{setTechnology(e.target.value)}}
                    value={technology}
                    required
                    />
                <br/>
                <br/>

                <label htmlFor="mode" className='ComplableClass'>Mode Of Internship</label>
                <br/>
                <input
                    id='mode'
                    className='Compinputfield'
                    type="text"
                    onChange={(e)=>{setintMode(e.target.value)}}
                    value={intMode}
                    placeholder='Online / Offline'
                    required
                />
                <br/>
                <br/>

                <label htmlFor="role" className='ComplableClass'>Your Role</label>
                <br/>
                <input
                    id='role'
                    className='Compinputfield'
                    type="text"
                    onChange={(e)=>{setRole(e.target.value)}}
                    value={role}
                    placeholder='eg: Web-Developer'
                    required
                />
                <br/>
                <br/>

                <label htmlFor="email" className='ComplableClass'>Email</label>
                <br />
                <input
                    id='email'
                    className='Compinputfield'
                    type="email"
                    onChange={(e)=>{setGenEmailId(e.target.value)}}
                    value={genEmailId}
                    required
                />
                <br />
                <br />

                <label htmlFor="contact" className='ComplableClass'>Contact</label>
                <br />
                <input
                    id='contact'
                    className='Compinputfield'
                    type='number'
                    onChange={(e)=>{setContact(e.target.value)}}
                    value={genContact}
                    required
                />
                <br />
                <br />

                <label htmlFor="ceoName" className='ComplableClass'>CEO Name</label>
                <br />
                <input
                    id='ceoName'
                    className='Compinputfield'
                    type="text"
                    onChange={(e)=>{setCeoName(e.target.value)}}
                    value={ceoName}
                    required
                />
                <br />
                <br />

                <label htmlFor="hrName" className='ComplableClass'>HR Name</label>
                <br />
                <input
                    id='hrName'
                    className='Compinputfield'
                    type="text"
                    onChange={(e)=>{setHrName(e.target.value)}}
                    value={hrName}
                    required
                />
                <br />
                <br />

                <label htmlFor="hrEmail" className='ComplableClass'>HR Email</label>
                <br />
                <input
                    id='hrEmail'
                    className='Compinputfield'
                    type="email"
                    onChange={(e)=>{setHrEmailId(e.target.value)}}
                    value={hrEmailId}
                    required
                />
                <br />
                <br />

                <label htmlFor="description" className='ComplableClass'>Description</label>
                <br/>
                <textarea
                    id='description'
                    className='Comptextfield'
                    type='text'
                    onChange={(e)=>{setDescription(e.target.value)}}
                    value={description}
                    required
                    />
                <br/>
                <br/>
                
                <lable htmlFor="InsternshipStatus" className='ComplableClass'>Internship Status</lable>
                <div className="radio">
                    <label htmlFor="option" className='ComplableClass'>
                        <input className='payOptionClass' type="radio" value="Free" name='option'
                            id='option'
                            onChange={handlePaidChange}
                            checked={payOpt === 'free'}
                            />
                        Free
                    </label>
                </div>
                <div className="radio" >
                    <label htmlFor="paidOptId" className='ComplableClass'>
                        <input id='paidOptId' type="radio" value="Paid" name='option' 
                             
                            onChange={handlePaidChange}
                            checked={payOpt === 'paid'}
                        />
                        Paid
                    </label>
                    <br></br>

                    {payOpt === 'paid' && <input
                        id='payInputText'
                        type="text"
                        onChange={(e)=>{setPayment(e.target.value)}}
                        value={payment}
                        required
                    />}
                </div>

                <div className='Compbtndiv'>
                    <button type="submit" className='CompbuttonClass'>
                        Submit
                    </button>
                </div>
            </form>
        </div>
    )
}
