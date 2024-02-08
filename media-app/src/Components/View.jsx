import React, { useEffect, useState } from 'react'
import VideoCard from './VideoCard'
import { getAllVideos } from '../services/allAPI'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';


function View({uploadVideoServerResponse}) {


  const [allVideos,setAllVideos]=useState()

  const [deleteVideoStatus,setDeleteVideoStatus]=useState(false)

  const getVideo = async()=>{
    //make api call
    const {data} = await getAllVideos()
    console.log(data);
    setAllVideos(data)
  }
  console.log(allVideos);

  useEffect(()=>{
    getVideo()
    setDeleteVideoStatus(false)
  },[uploadVideoServerResponse,deleteVideoStatus])
  return (
    <>
    <Row>
      {
        allVideos?.length>0?allVideos?.map((item)=>(
          <Col sm={12} md={6} lg={4} xxl={6}>
           <VideoCard displayData={item} setDeleteVideoStatus={setDeleteVideoStatus}/>
          </Col>
        )):"nothing to display"
      }
    </Row>
     
    </>
  )
}

export default View