import { Link } from "react-router";
import styles from "./footer.module.css";

function Footer(){
    return(
        <div className={styles.container}>
            <div>
            <Link to="/about">About us</Link>
            <Link to="/contact">Contact Us</Link>
            <Link to="/terms">Terms and conditions</Link>
            </div>
            <div>
            <Link to="/howtosell">How to sell with my market</Link>
            <Link to="/how to buy">How to order a product</Link>
            <Link to="/privacy">Privacy policy</Link>
            </div>
            <div>
            <Link to="/settings">Account settings</Link>
            <Link to="/forgot password">Forgot password?</Link>
            </div>
        </div>
    )
}
export default Footer;