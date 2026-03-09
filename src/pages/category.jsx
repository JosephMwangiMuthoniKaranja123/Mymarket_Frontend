import API from "../services/Api";
import { useEffect,useState } from "react";
import {Link, useParams} from "react-router-dom";
import styles from "./product.module.css";


function Category(){
    const [loading,setLoading]=useState(true);
    const [products,setProducts]=useState([]);
    const {categoryid}=useParams();

    useEffect(()=>{
        fetchproducts();
    },[categoryid]);

  const fetchproducts=async ()=>{
    try{
        setLoading(true);
    const res= await API.get(`/products/${categoryid}`);
    setProducts(res.data);
    }
    catch(err){
        console.error(err);
    }
    finally{
        setLoading(false);
    }
  }
  if (loading) return <h3>Loading products...</h3>
  return(
       <div className={styles.cocontainer}>
                
        
            {products.length===0 ?(
                <p>No products available</p>
            ):(products.map((product)=>(
                <div key={product.id} className={styles.productCard}>
                    <Link to={`/productdetails/${product.id}`}>
                    <img 
                    src={`http://localhost:8080${product.image}`}
                    alt={product.title}
                    className={styles.productimage}/>
                    </Link>
                    <h3>{product.title}</h3>
                    <h4>KSH {product.price}</h4>
                </div>
            )))}
        </div>
  );
}
export default Category;