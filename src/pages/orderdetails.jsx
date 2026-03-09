import { useEffect, useState } from "react";
import API from "../services/Api";
import styles from "./orderdetails.module.css";
import { useParams } from "react-router-dom";

function Orderdetails(){
    const [orders,setOrders]=useState([]);
    const {id}=useParams();

    useEffect(()=>{
        fetchorders();
    },[id]);

    const fetchorders=async()=>{
        try{
            const res= await API.get(`/orders/${id}`);
            setOrders(res.data);

        }
        catch(err){
            console.log(err.message);
        }
    };

    return(
        <div className={styles.container}>
            {orders.map((order)=>(
                <div key={order.id} className={styles.orderCard}>
                    <div className={styles.orderHeader}>
                    <p>order no:{order.id}</p>
                    <p>{order.quantity} items</p>
                    <p>placed on:{order.purchased_at}</p>
                
                    </div>
                    <div className={styles.itemDetails}>

                        <img src={`http://localhost:8080${order.image}`}
                                 alt={order.product}
                               className={styles.itemImage}  />
                                 <div className={styles.itemDetails}>
                                 <h4 >{order.product}</h4>
                                 <p >price:{order.price}</p>
                                 <p>Qty: {order.quantity}</p>
                                 <p>{order.description}</p>
                                 <p >{order.status}</p>
                                 </div>
                             
                  </div>
                </div>
            ))}
        </div>
    )
}
export default Orderdetails;