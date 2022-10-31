import axios from 'axios'
import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import './PageStyle/reviewPage.css'

export default function ReviewPage() {
  const {compName} = useParams()
  const [data,setData] = useState([])

  useEffect(()=>{
    console.log(compName)
    axios
      .get(`http://localhost:3500/companyReview/${compName}`)
      .then((res) => {
        console.log(res.data)
        setData(res.data);
      })
      .catch((error) => {
        const message = error.response.data?.error || error.message;
        window.alert(message);
        console.log(error);
      });
  },[]);

  return (
    <div className='ReviewContainer'>
        <h1 className='reviewHeading'>{compName.replaceAll('_', ' ')} Reviews</h1>
        <table className='tableClass'>
          <thead>
            <tr>
              <th>Sr No.</th>
              <th>Name</th>
              <th>Email</th>
              <th>Rating</th>
              <th>Comment</th>
            </tr>
          </thead>
          <tbody>
          {
            data.map((item,i)=>
              <tr key={i}>
                <td>{i}</td>
                <td>{item.userName}</td>
                <td>{item.email}</td>
                <td>{item.rating}</td>
                <td>{item.comments}</td>
              </tr>
            )
          }
          </tbody>
        </table>
    </div>
  )
}
