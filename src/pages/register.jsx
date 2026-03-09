import { useState } from "react";
import API from '../services/Api';
import { Link, useNavigate } from "react-router-dom";
import styles from './login.module.css';

function Register(){
    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("");
    const [username,setUsername]=useState("");
    const [showpassword,setShowpassword]=useState(false);
    const navigate=useNavigate();
    const Handleregister=async (e)=>{
        e.preventDefault();

        try{
             await API.post("/users/register",{email,password,username});
            alert("Registration successful");
            
            
            navigate("/login");
        }
        catch(err){
             alert(err.response?.data?.message || "Registration failed");
        }
    };
    return(
     <div className={styles.container}>
        <form onSubmit={Handleregister} className={styles.form}>
            <h2 className={styles.textb}>Register</h2>
            <input type="text" onChange={(e)=>{setUsername(e.target.value)}} value={username}placeholder="Username,," className={styles.inputField}required/>
            <input type="email" onChange={(e)=>{setEmail(e.target.value)}} value={email} placeholder="Email" className={styles.inputField}required />
               <input type={showpassword ? "text":"password"}  onChange={(e)=>{setPassword(e.target.value)}}value={password} placeholder="password" className={styles.inputField}required />
             <div className={styles.checkboxLabel}> 
              <label> showpassword</label>
              <input type="checkbox" checked={showpassword} onChange={()=>{setShowpassword(!showpassword)}}/>
               </div>
               <button type="submit"className={styles.button}>Next</button>
             <p className={styles.text}>Already have an account ? <Link to="/login">Login</Link></p>


     </form>
     </div>
    );
};
export default Register;