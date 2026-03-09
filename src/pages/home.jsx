import { Link} from "react-router-dom";
import styles from "./home.module.css";

 export default function Home(){
    const token=localStorage.getItem("token");
    return(
    <div className={styles.container}>

        <img src="/logo.jpg" alt="logo" className={styles.logo}/>
        <h1 className={styles.title}> WELCOME TO MYMARKET ONLINE SHOPPING</h1>
        <div className={styles.actions}>
            <Link to="/products" style={{fontSize:"2rem",color:"ButtonText",fontWeight:"bold"}}>see products</Link>
           {token ? (
      <Link to="/dashboard" className={styles.button}>DASHBOARD</Link>
    ) : (
      <>
        <Link to="/register" className={styles.button}>REGISTER</Link>
        <Link to="/login" style={{ marginLeft: "10px" }} className={styles.button}>LOGIN</Link>
      
      </>
    )}
  
    </div>
    </div>
    );
}
