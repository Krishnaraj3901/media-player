import React, { useEffect, useState } from 'react'
import { MDBTable, MDBTableHead, MDBTableBody } from 'mdb-react-ui-kit';
import { getVideoHsitory } from '../services/allAPI';



function Watchhistory() {

  const [history,setHistory]=useState([])

  const handleHistory=async()=>{
    //make an api call to get video history
    const {data}= await getVideoHsitory()
    console.log(data);
    setHistory(data)
  }
  console.log(history);

  useEffect(()=>{
    handleHistory()
  },[])
  return (
    <>
      <div className="container">
        <h3 className='m-3'>Watch History</h3>
      <MDBTable hover>
      <MDBTableHead>
        <tr>
          <th scope='col'>Id</th>
          <th scope='col'>Caption</th>
          <th scope='col'>URL</th>
          <th scope='col'>Timestamp</th>
        </tr>
      </MDBTableHead>
      <MDBTableBody>
        {
          history?history.map((item)=>(
            <tr>
            <th scope='row'>{item.id}</th>
            <td>{item.caption}</td>
            <td><a href={item.embedLink}>{item.embedLink}</a></td>
            <td>{item.timeStamp}</td>
          </tr>
          )):"no history found"
        }
        
       
      </MDBTableBody>
    </MDBTable>
      </div>
      <div className="btn">
        <a href="/"><button className='btn btn-secondary'><i className='fa-solid fa-home'></i>Home</button></a>
      </div>
    </>
  )
}

export default Watchhistory