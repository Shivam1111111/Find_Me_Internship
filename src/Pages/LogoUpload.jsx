import React from 'react'
import axios from 'axios';
import { useState , useContext  } from 'react'
import { useNavigate } from 'react-router-dom'
import "./PageStyle/CompForm.css";
import AOS from "aos";
import "aos/dist/aos.css";
import { ImDisplay } from 'react-icons/im'
import { Global } from '../App';
AOS.init();


function LogoUpload() {

  const {CName} = useContext(Global); 
  const withSpaceString = CName.replaceAll('_', ' ');
  // setWithSpace(withSpaceString);
  // console.log(withSpaceString)
  // console.log(CName)

  const navigate = useNavigate();
  const [file, setFile] = useState();
  const [fileName, setFileName] = useState("");
  const [withSpace, setWithSpace] = useState(withSpaceString);
  // setWithSpace(withSpaceString);

  
  function skipFunk(){
    navigate('/')
  }

  const saveFile = (e) => {
    setFile(e.target.files[0]);
    setFileName(e.target.files[0].name);
  };

  const uploadFile = async (e) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("fileName", fileName);
    try {
      const res = await axios.post(
        `http://localhost:3500/upload/${CName}`,
        formData
      );
      navigate('/');
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className='CompContainer' data-aos="fade-up" data-aos-duration="1000">
      <h1 id='heading'>Upload Logo Of {withSpace} </h1>
      <input className='inputfield' type="file" onChange={saveFile} />
      <br />
      <br />
      <div className='btndiv'>
        <button className='buttonClass' onClick={uploadFile}>Upload</button>
        <button className='buttonClass' onClick={skipFunk}>Skip</button>
      </div>
    </div> 
  );
}

export default LogoUpload;
