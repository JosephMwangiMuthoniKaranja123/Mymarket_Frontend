import Navbar from "../components/navbar";
import styles from "./dashboard.module.css";
import Products from "./product";
import Sidebar from "./sidebar";
import Footer from "../components/footer.jsx";
import { useState } from "react";

function Dashboard(){
  const [sidebaropen,setSidebaropen]=useState(false);
  const showsidebar=()=>{
    setSidebaropen(!sidebaropen);
  }
    return(
   <div className={styles.container}>
    <Navbar/>
    <div className={styles.dashboard}>
        
           
            <div className={styles.sidebar}>
              <button className={styles.menuBtn} onClick={showsidebar}>
              ☰
              </button>
                <Sidebar/>
            </div>
            <div className={styles.products}>
              <Products/>
            </div>

           
          </div >
          <div className={styles.footer}>
            <Footer/>
          </div>
          
      </div>

    );
};
export default Dashboard;