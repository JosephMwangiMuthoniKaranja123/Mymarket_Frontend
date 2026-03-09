import axios from 'axios';

const API= axios.create({baseURL:"https://mymarket-backend-production.up.railway.app",});
//atach token automatically
API.interceptors.request.use((req)=>{
    const token= localStorage.getItem("token");
    if (token){
        req.headers.Authorization=`Bearer ${token}`;
        
    }
    return req;
});
API.interceptors.response.use((response)=>
    response,(error)=>{
  if(error.response?.status===400){
    localStorage.removeItem("token");
    window.location.href ="/login";
 
    } 
  return Promise.reject(error);
}
 
    );

export default API;