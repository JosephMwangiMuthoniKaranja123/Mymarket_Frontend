import API from "../services/Api";
import { useState,useEffect } from "react";
import styles from "./product.module.css";
import Sidebar from "./sidebar";
import { Link } from "react-router-dom";

function Products(){
    const [products,setProducts]=useState([]);
    const [loading,setLoading]=useState(true);
    const [search,setSearch]=useState("");

    useEffect(()=>{
        fetchProducts();
    },[]);

    const fetchProducts=async ()=>{
        try{
          const  res= await API.get("/products");
            setProducts(res.data);
        }
        catch (error){
            console.error(error);
        }
        finally{
            setLoading(false);
        }
    };
    useEffect(()=>{
        const delaydebounce=setTimeout(()=>{
            if (search.trim()!==""){
                Handlesearch();
            }
            else if(search.trim()==""){
                fetchProducts();
            }
        }, 500);
        return ()=> clearTimeout(delaydebounce);
    },[search]);
    const Handlesearch= async ()=>{
        try {
             const res= await API.get(`/search?q=${search}`);
             setProducts(res.data);
        } catch (error) {
            console.log(error.message);
        }
    };

    if (loading) return <h1>Loading products....</h1>;

    return(
    <div className={styles.container}>
        <div className={styles.search}>
          <input
          className={styles.input}
           type="text" placeholder="search products,," value={search}
           onChange={(e)=>setSearch(e.target.value)}/> 
          <button onClick={Handlesearch} className={styles.searchbtn}>search</button> 
          </div>
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
    </div>
    );
}
export default Products;