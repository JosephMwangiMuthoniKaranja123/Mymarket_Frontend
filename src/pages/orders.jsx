import { useEffect, useState } from "react";
import API from "../services/Api";
import styles from './orders.module.css';
import Sidebar from "./sidebar";
import { Link } from "react-router-dom";

function Orders(){
const [orders,setOrders]=useState([]);
useEffect(()=>{
    fetchOrders();
},[]);

const fetchOrders= async ()=>{
    try{
    const res= await API.get("/orders");
    setOrders(res.data);
    }
    catch (err){
        console.error(err);
    }
};
return(
    <div className={styles.container}>
        <div className={styles.sidebar}>
             <Sidebar/>
        </div>
       <div>
        <h1 className={styles.title}>My Orders:</h1>
        {orders.length===0 ? ( <p className={styles.empty}>No Orders yet</p>):(
            <div>
        {orders.map((order)=>(
           <div key={order.id} className={styles.card}>
            
             <img src={`http://localhost:8080${order.image}`}
             alt={order.product}
             className={styles.image}/>
             <div>
             <h4 className={styles.product}>{order.product}</h4>
             <p className={styles.orderNo}>{`Order NO:${order.id}`}</p>
             <p className={styles.status}>{order.status}</p>
             </div>
             <div>
                <p className={styles.paragraph}>{`Purchase Time:${order.purchased_at}`}</p>
             </div>
             <div>
               <Link to={`/orders/${order.id}`} className={styles.link}>See Details:</Link> 
             </div>
           </div> 
        ))}
        </div>
        )}
        </div>
    </div>

);
}
export default Orders;