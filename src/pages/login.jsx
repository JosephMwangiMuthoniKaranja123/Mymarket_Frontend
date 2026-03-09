import { useState } from "react";
import API from '../services/Api';
import { Link, useNavigate } from "react-router-dom";
import styles from './login.module.css';

function Login(){
    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("");
    const [showpassword,setShowpassword]=useState(false);
    const navigate=useNavigate();
    const Handlelogin=async (e)=>{
        e.preventDefault();

        try{
            const res= await API.post("auth/login",{email,password,});
            localStorage.setItem("token",res.data.token);
           // alert("Login successful");
            // redirect after login
            navigate("/dashboard");
        }
        catch(err){
             alert(err.response?.data?.message || "Login failed");
        }
    };
    return(
     <div className={styles.container}>
        <form onSubmit={Handlelogin} className={styles.form}>
            <h1 className={styles.textb}>Login</h1>
            <input type="email" onChange={(e)=>{setEmail(e.target.value)}} value={email} placeholder="Email" className={styles.inputField} required />
              <input type={showpassword ? "text":"password"}  onChange={(e)=>{setPassword(e.target.value)}}value={password} placeholder="password" className={styles.inputField}required />
            <div className={styles.checkboxLabel}> 
                          <label> showpassword</label>
                          <input type="checkbox" checked={showpassword} onChange={()=>{setShowpassword(!showpassword)}}/>
                           </div>
               <button type="submit" className={styles.button}>LOGIN</button>
               <p className={styles.text}>Don't have an account ? <Link to="/register">Register</Link></p>


     </form>
     </div>
    );
}
export default Login;