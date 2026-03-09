import { useState,useEffect } from "react";
import API from "../services/Api";
import { useNavigate }from "react-router-dom";
import styles from "./addproduct.module.css";
import { jwtDecode } from "jwt-decode";


function Addproduct(){
    const [title,setTitle]=useState("");
    const [price,setPrice]=useState("");
    const [stock,setStock]=useState("");
    const [description,setDescription]=useState("");
    const [category,setCategory]=useState([]);
    const [images,setImages]=useState(null);
    const [category_id,setCategory_id]=useState("");
      const [name, setName] = useState("Guest");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const user = jwtDecode(token);
        
        setName(user?.username || "Guest");
        
      } catch (err) {
        console.error("Invalid token", err);
      }
    }
  }, []);




    useEffect(()=>{
    fetchCategory();
},[]);
const fetchCategory= async ()=>{
    try{
        const res=await API.get("/categories");
        setCategory(res.data);
    }
    catch(err){
        console.error(err);
    }
    
};

    const Handlefilechange=(e)=>{
        setImages(e.target.files);
    };

const Handlechange= (e)=>{
     const id=e.target.value;
setCategory_id(id);
  
};
    const Handlesubmit= async (e)=>{
        e.preventDefault();

        const formdata= new FormData();
         formdata.append("title",title);
           formdata.append("price",price);
            formdata.append("description",description);
             formdata.append("category_id",category_id);
             formdata.append("stock",stock);
             for(let i=0;i< images.length;i++){
               formdata.append("images",images[i]);
             }
              

              try {
                await API.post("/products",formdata,{
                     headers: {
          "Content-Type": "multipart/form-data",
        },
                });
                alert("Product added sucessfully");

                
              } catch (error) {
                alert(`There was error in uploading the product please try again:${error.message}`);
                console.error(error);
                
              }
    };
    return(
        <div className={styles.page}>
            
            <h3 className={styles.welcome}>
  {`Hello ${name}. Thank you for choosing to sell with us. Please complete the form below to list your product on our platform.`}
</h3>
            <form onSubmit={Handlesubmit} className={styles.container}>
                
                <input type="text" placeholder="Name of the product"value={title} onChange={(e)=>setTitle(e.target.value)} required></input>
                <textarea rows="4" cols="50" placeholder="Enter description" value={description} onChange={(e)=>setDescription(e.target.value)} required></textarea>
                <input type="number"value={price} onChange={(e)=>setPrice(e.target.value)} required placeholder="price in KSH"></input>
                <select value={category_id} onChange={Handlechange}>
                    <option value="" disabled >Select category</option>
                    {category.map((cat)=>(
                        <option key={cat.id} value={cat.id}>{cat.name}</option>
                    ))}
               
                </select>
                <input type="number" placeholder="stock" value={stock} onChange={(e)=>setStock(e.target.value)}></input>
                <label>Upload Product Image:(you can add more than one image)
                <input type="file" onChange={Handlefilechange} accept="image/*" multiple required></input>
                </label>
                <button type="submit">Add Product</button>
            </form>
        </div>
    )
};
export default Addproduct;