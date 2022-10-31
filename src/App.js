import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import About from './Pages/About';
import Home from './Pages/Home';
import NewReg from './Pages/Userlogin/NewReg';
import Login from './Pages/Userlogin/Login';
import AuthLogin from './Pages/Userlogin/AuthLogin';
import { createContext, useState } from 'react';
import CompanyForm from './Pages/CompanyForm';
import LogoUpload from './Pages/LogoUpload';
import Footer from './components/Footer';
import Card from './Pages/Card';
import UpdateCompany from './Pages/UpdateCompany';
import AddReview from './Pages/AddReview'
import ReviewPage from './Pages/ReviewPage';

export const Global = createContext();

function App() {
  
  const [Cname, setCname] = useState("");

  const getName = (compName)=>{
    setCname(compName)
  }
  return (
    <>
      <BrowserRouter>
        <Global.Provider value={{getName : getName, CName : Cname  }}>
          <Navbar />
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/about' element={<About />} />
            <Route path='/newReg' element={<NewReg />} />
            <Route path='/login' element={<Login />} />
            <Route path='/compForm' element={<CompanyForm />} />
            <Route path='/logoForm/:companyName' element={<LogoUpload /> } />
            <Route path='/card/:id' element={<Card /> } />
            <Route path='/update/:id' element={<UpdateCompany /> } />
            <Route path='/addReview/:id/:compName' element={<AddReview /> } />
            <Route path='/reviewPage/:compName' element={<ReviewPage /> } />
          </Routes>
          <Footer/>
        </Global.Provider>
      </BrowserRouter>
    </>
  );
}

export default App;
