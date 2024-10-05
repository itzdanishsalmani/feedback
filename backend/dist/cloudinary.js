"use strict";
// import { v2 as cloudinary } from "cloudinary"
// import fs from "fs"
// cloudinary.config({
//     cloud_name:,
//     api_key:,
//     api_secret:,
// })
// const uploadOnCloudinary = async (localFilePath:any) => {
//     try {
//         if(!localFilePath){
//             return null
//         }
//         const response = await cloudinary.uploader.upload(localFilePath,{
//             resource_type:"auto"
//         })
//         console.log("file uploaded",response.url)
//         return response
//     } catch (error) {
//         fs.unlinkSync(localFilePath)
//         //removing the temporary file after upload  
//     }
// }
// export { uploadOnCloudinary }
