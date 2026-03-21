import { useState,useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import API from "../services/Api";
import styles from "./editproduct.module.css";
function Editproduct(){
const {id}=useParams();
const navigate=useNavigate();
const [product,setProduct]=useState({
    title:"",
    price:"",
    description:"",
    stock:""
});
useEffect(()=>{
    fetchProduct();
},[id]);

const fetchProduct=async ()=>{
 try {
     const res=await API.get(`products/productbyid/${id}`);
     setProduct(res.data);
 } catch (error) {
    console.log(error);
 }
}
const Handlechange=(e)=>{
setProduct({
    ...product,
    [e.target.name]:e.target.value,
});
};
const Handlesubmit=async ()=>{
    e.preventDefault();
    try {
        await API.put(`products/${id}`,product);
        alert("products updated successfully");
        navigate("/products");

    } catch (error) {
        alert("failed to update!");
        console.log(error);
    }
};
return(
    <div className={styles.container}>
  <form onSubmit={Handlesubmit}className={styles.form}>
       <div className={styles.heading}>Edit Product</div>
    <input
    type="text"
    name="title"
    value={product.title}
    onChange={Handlechange}
    placeholder="product title"
    className={styles.input}/>
       <input
    type="text"
    name="description"
    value={product.description}
    onChange={Handlechange}
    placeholder="description"
    className={styles.input}/>
       <input
    type="number"
    name="price"
    value={product.price}
    onChange={Handlechange}
    placeholder="price"
    className={styles.input}/>
       <input
    type="number"
    name="stock"
    value={product.stock}
    onChange={Handlechange}
    placeholder="stock"
    className={styles.input}/>
     <button className={styles.button} type="submit">
        Save Changes
      </button>

  </form>
  </div>
)
}
export default Editproduct;