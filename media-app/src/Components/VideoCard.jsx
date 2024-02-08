import React from 'react'
import {
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  // MDBCardText,
  MDBCardImage,
  // MDBBtn
} from 'mdb-react-ui-kit';
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { deleteAVideo, watchVideoHistory } from '../services/allAPI';
// import { MDBInput } from 'mdb-react-ui-kit';

function VideoCard({displayData,setDeleteVideoStatus}) {

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = async() =>{
    setShow(true);
  //make an api call to get the video watch history
  const {caption,embedLink}=displayData

  //date and time
  let today =new Date()
  //console.log(today);
  const timeStamp = new Intl.DateTimeFormat('en-us',{year:'numeric',month:'2-digit',day:'2-digit',hour:'2-digit',minute:'2-digit',second:'2-digit'}).format(today);
  console.log(timeStamp);


  let videoDetails={
    caption,
    embedLink,
    timeStamp
  }
  await watchVideoHistory(videoDetails)
  } 
  //deleting a video
  const deleteVideo=async(id)=>{
    //make api call
    const response = await deleteAVideo(id)
    console.log(response);
    setDeleteVideoStatus(true)
  }

  const dragStarted=(e,id)=>{
    console.log("Drag started"+id,e);
    e.dataTransfer.setData("VideoId",id)//data transfer
   }



  return (
    <div>
       <MDBCard dragable onDragStart={(e)=>dragStarted(e,displayData?.id)} style={{width:'400px',}}>
      <MDBCardImage onClick={handleShow} style={{width:'100%',height:'250px',borderRadius:'25px'}} src={displayData.url} position='top' alt='...' />
      <MDBCardBody className='d-flex justify-content-center'>
        <MDBCardTitle><h5>{displayData.title}</h5></MDBCardTitle>
        <Modal.Title>{displayData.caption}</Modal.Title>
        <button onClick={()=>deleteVideo(displayData?.id)} className='btn ms-5' href='#'><i className='fa-solid fa-trash fs-5 fx-5'></i></button>
      </MDBCardBody>
    </MDBCard>
    <Modal show={show} onHide={handleClose} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title>{displayData.caption}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <iframe style={{borderRadius:'20px'}} width="400" height="315" src={displayData.embedLink} title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          
        </Modal.Footer>
      </Modal>
    </div>
  )
}

export default VideoCard