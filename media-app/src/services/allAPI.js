import { commonAPI } from "./commonAPI";
import { serverUrl } from "./serverURL";

//1 upload a video api call - post method = reqBody
export const uploadVideo = async(reqBody)=>{
    return await commonAPI("post",`${serverUrl}/videos`,reqBody)
}
//2 get all videos
export const getAllVideos =  async()=>{
  return await commonAPI("get",`${serverUrl}/videos`,'')
}
//3 get a particular video
export const getAVideo = async(id)=>{
  return await commonAPI("get",`${serverUrl}/videos/${id}`,'')  
}


//4 delete a video

export const deleteAVideo = async(id)=>{
  return await commonAPI ("delete",`${serverUrl}/videos/${id}`,{})
}

//5 store watching video history to json server
export const watchVideoHistory=async (videoDetails)=>{
  return await commonAPI("post",`${serverUrl}/history`,videoDetails)
}

//get video history from json server

export const  getVideoHsitory=async()=>{
  return await commonAPI("get",`${serverUrl}/history`,'')
}

//add category
export const addCategory=async(reqBody)=>{
  return await commonAPI("post",`${serverUrl}/categories`,reqBody)
}

//get category
export const getCategory = async()=>{
  return await commonAPI("get",`${serverUrl}/categories`,'')
}

//delete category
export const deleteCategory = async(id)=>{
  return await commonAPI("delete",`${serverUrl}/categories/${id}`,{})
}

//update a category
export const updateCategory=async(id,reqBody)=>{
  return await commonAPI("put",`${serverUrl}/categories/${id}`,reqBody)

}