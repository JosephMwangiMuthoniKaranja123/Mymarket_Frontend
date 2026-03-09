import Navbar from "../components/navbar";
import styles from "./dashboard.module.css";
import Products from "./product";
import Sidebar from "./sidebar";
import Footer from "../components/footer.jsx";

function Dashboard(){
    return(
   <div className={styles.container}>
    <Navbar/>
    <div className={styles.dashboard}>
        
           
            <div className={styles.sidebar}>
                <Sidebar/>
            </div>
            <div className={styles.products}>
              <Products/>
            </div>

           
          </div>
          <Footer/>
      </div>

    );
};
export default Dashboard;