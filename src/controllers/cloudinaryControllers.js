import {v2 as cloudinary} from 'cloudinary';
          
 export function configCloudinary(cloud_name, api_key, api_secret) {
    cloudinary.config({
      cloud_name,
      api_key,
      api_secret,
    });
  }

 export async function UploadPicture(file) {
    try {
      const { path } = file;
  
      const res = await cloudinary.uploader.upload(path, {
        resource_type: "image",
      });
  
      return res;
    } catch (ex) {
      console.log(ex);
    }
  }
  