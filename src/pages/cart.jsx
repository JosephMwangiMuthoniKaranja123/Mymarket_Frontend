import { useEffect, useState } from "react";
import API from "../services/Api";
import styles from "./cart.module.css";
import { useNavigate } from "react-router-dom";

function Cart(){
    const [cart,setCart]=useState([]);

    useEffect(()=>{
        fetchcart();
    },[]);
    const fetchcart=async()=>{
        try{
        const res=await API.get("/cart");
        setCart(res.data);
        }
        catch (err){
            console.error(err);
        }
        
};
const removecart=async (id)=>{
    try{
        await API.delete(`/cart/${id}`);
        alert("item removed from cart");
        fetchcart();
    }
    catch (err){
        console.error(err);
    }
};
const navigate=useNavigate();
const startshopping=()=>{
   
    navigate("/dashboard");
};
const postorder= async ()=>{
    try{
await API.post("/checkout");
alert("order placed successfully");
fetchcart();
    }
    catch(err){
        alert(err.message);

    }
};

const carttotal=cart.reduce((sum,item)=>sum+ item.price*item.quantity,0);
return(
    <div className={styles.all}>
    <div className={styles.container}>
        <h2 className={styles.heading}>My Cart</h2>
        {cart.length===0 && 
        <div className={styles.cart}>
       
            <img  className={styles.itemImage}src="/cart.jpg" alt="cart-img"/>
                  <p className={styles.emptyCart}>Your cart is empty !</p>
                  <button onClick={startshopping} className={styles.emptyCartButton}>Start Shopping</button>
           
            </div>}
            
        {cart.map((item)=>(
              
            <div key={item.id} className={styles.cartList}>
                <img src={`http://localhost:8080${item.image}`} alt={item.name} className={styles.itemImage}/>
               <div className={styles.itemDetails}>
                <p className={styles.itemName}>{item.name}</p>
                <p className={styles.itemPrice}>Total price:KSh {item.price*item.quantity}</p>
                <p className={styles.itemQuantity}>Qty: {item.quantity}</p>
                </div>
                <button onClick={()=>removecart(item.id)} className={styles.removeButton}>Remove</button>
                
              
            </div>
            
    
            
        ))}
       
    
        </div>
         {cart.length!== 0 &&(
            <div className={styles.cartSummary}>
            <h2>Cart Summary</h2>
            <p>Sub Total: KSh {carttotal}</p>
            <button onClick={postorder} className={styles.cartSummaryButton}>Place Order</button>
        </div>
         )
}
    
    </div>
)
}
export default Cart;