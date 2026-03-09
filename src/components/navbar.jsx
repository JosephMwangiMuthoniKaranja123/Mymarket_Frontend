import { Link, useNavigate } from "react-router-dom";
import styles from "./Navbar.module.css";
import { useState,useEffect } from "react";
import { jwtDecode } from "jwt-decode";

export default function Navbar() {
  const [name,setName]=useState("");
  const navigate=useNavigate();
  const Handlelogout=()=>{
    localStorage.removeItem("token");
    navigate("/");
    
  }
  const Handlechange=(e)=>{
    const value=e.target.value;
  
    if(value === "logout"){
      Handlelogout();
    }
    else if(value){
      navigate(value);
    }
  };
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
  return (
    <nav className={styles.navbar}>
      {/* Logo on the left */}
      <Link to="/" className={styles["logo-link"]}>
        <img src="/logo.jpg" alt="logo" />
        MyMarket
      </Link>

      {/* Links grouped together */}
      <div className={styles.links}>
        <Link to="/">HOME</Link>
        <Link to="/products">PRODUCTS</Link>
        <Link to="/dashboard">DASHBOARD</Link>
        <Link to="/addproduct">SELL PRODUCT</Link>
         <Link to="/cart" className={styles["logo-link"]}><img src="/cart.jpg" alt="cart" />Cart</Link>
         <div className={styles.accountWrapper}>
          <img src="/profile_icon.jpg " alt="proficon" className={styles.icon}/>
          
        <select defaultValue="" onChange={Handlechange} className={styles.select}>
          <option value="" disabled>{`${name}`}</option>
          <option value="/Orders">orders</option>
          <option value="/inbox">Inbox</option>
          <option value="logout">LogOut</option>
        </select>
        
       </div>
      
      </div>
        <button onClick={Handlelogout} className={styles.button}>LOGOUT</button>
    </nav>
  );
}
