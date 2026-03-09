import { useEffect, useState } from "react";
import API from "../services/Api";
import { useParams } from "react-router-dom";
import styles from "./productdetails.module.css";

function Productdetails(){
    const [product,setProduct]=useState(null);
    const {productid}=useParams();

    useEffect( ()=>{
        fetchProduct();
    },[productid]);
      

const fetchProduct=async ()=>{
    try{
  const res= await API.get(`/products/productbyid/${productid}`);
  console.log(res.data);
  setProduct(res.data);
    }
    catch (err){
        console.error(err);
    }
}
const addcart=async ()=>{
    try {
        const res= await API.post("/cart",{listings_id:productid,quantity:1});
        alert("Added to cart");
    } catch (error) {
        console.log(error);

        
    }
}
return(
    <div className={styles.container}>
       {!product ?(
        <p className={styles.noProduct}>No Product details found</p>
       ):(
    
    <div className={styles.productCard} >
        <div>
        { product.images.map((img)=>(
            <img 
            key={img.id} src={`http://localhost:8080${img.image_url}`}
            alt={`${product.title} image`} className={img.is_primary ? styles.primaryImage:styles.productImage}/>
        ))

         }
        </div>
        <h3 className={styles.productTitle}>{`${product.title}`}</h3>
        <p className={styles.productDescription}>{`${product.description}`}</p>
        <p className={styles.productPrice}>{`PRICE:${product.price}`}</p>
        <p className={styles.productStock}>{`Units left: ${product.stock} `}</p>

          </div>
      )}
      <button className={styles.addToCartBtn} onClick={addcart}>Add to cart</button>
      </div>
  
)

}
export default Productdetails;