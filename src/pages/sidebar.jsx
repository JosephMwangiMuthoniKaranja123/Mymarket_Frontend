import { Link, useNavigate } from "react-router-dom";
import { useEffect,useState } from "react";
import API from "../services/Api";
import styles from "./sidebar.module.css";

function Sidebar(){
const [category,setCategory]=useState([]);


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
  const navigate=useNavigate();
const Handlechange= async (e)=>{
  const categoryid=e.target.value;
  navigate(`/products/category/${categoryid}`);
};


return(
    <div className={styles.sidebar}>
        <h1 className={styles.title}>Categories :</h1>
        <Link className={styles.categoryItem} to={"/products"}>All Products</Link>
 <select defaultValue="" onChange={Handlechange} className={styles.select}>
  <option value="" disabled >
    Select Category
  </option>

  {category.map((cate) => (
    <option key={cate.id} value={cate.id}>
      {cate.name}
    </option>
  ))}
</select>

</div>
);
};
export default Sidebar;