import React, { useEffect } from 'react'
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { MDBInput } from 'mdb-react-ui-kit';
import { addCategory, deleteCategory, getAVideo, getCategory, updateCategory } from '../services/allAPI';
import VideoCard from './VideoCard';
import Row from 'react-bootstrap/esm/Row'
import Col from   'react-bootstrap/esm/Col'

function Category() {

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [categoryName,setCategoryName]=useState('')//to hold category name

  const [categoryData,setCategoryData]=useState([])//to hold category data
  console.log(categoryName);

  const handleCategory=async()=>{
    if(categoryName){
      //make an api call
      const reqBody={
        categoryName
      }
      const response = await addCategory(reqBody)
      console.log(response);
      alert('category added successfully')
      handleClose()
      setCategoryName('')
      getCategoryVideos()
    }
    else{
      alert("please provide a category name")
    }
  }

  const getCategoryVideos=async()=>{
    //make an api call
    const {data}=await getCategory()
    console.log(data);
    setCategoryData(data)
  }
  console.log(categoryData);

  useEffect(()=>{
    getCategoryVideos()
  },[])


  const deleteData=async(id)=>{
     await deleteCategory(id);
     getCategoryVideos()
  }


  const videoDrop=async(e,categoryId)=>{
    console.log("video dropped at" + categoryId);
    const videoId = e.dataTransfer.getData("videoId")
    console.log("videoCardId:" + videoId);

    //api call for get video
    const {data}=await getAVideo(videoId)
    console.log(data);

    //get category details
    const selectedCategory = categoryData?.find(item=>item.id==categoryId)
    console.log(selectedCategory);

    //video details push to all videos array
    selectedCategory.allVideos.push(data)
    //make an api call to update details
    await updateCategory(categoryId,selectedCategory)
  }

  const dragOver=(e)=>{
    console.log('drag over');
    e.preventDefault()
  }
  return (
    <div className='text-center'>
      <button onClick={handleShow} className='btn'>Add cateogry</button>

      <div>
        {
          categoryData.length>0?categoryData.map((item)=>(
            <div droppable onDragOver={(e)=>dragOver(e)} onDrop={(e)=>videoDrop(e,item.id)} className='container border border-4 m-3 shadow'>
              <div className='d-flex justify-content-between p-4'>
                <h3>{item.categoryName}</h3>
                <button onClick={()=>deleteData(item.id)} className='btn'><i className='fa-solid fa-trash'></i></button>
              </div>

              <Row>
                {
                  item.allVideos.map((data)=>(
                    <Col>
                      <VideoCard displayData={data}/>
                    </Col>
                  ))
                }
              </Row>
            </div>
          )):"no category selected"
        }
      </div>

      <Modal 
      show={show} 
      onHide={handleClose} 
      animation={false}>
        <Modal.Header closeButton>
          <Modal.Title>Add category</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        {/* <MDBInput  label='Cateogry ID' id='typeText' type='text' /> */}
        <br />
        <MDBInput onChange={(e)=>setCategoryName(e.target.value)} label='Category Name' id='typeText' type='text' />
        <br />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button onClick={()=>handleCategory()} variant="primary">
            Add
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}

export default Category