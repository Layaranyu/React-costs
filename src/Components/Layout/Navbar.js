import { Link } from "react-router-dom"
import styles from './Navbar.module.css'
import logo from '../../img/costs_logo.png'
import Container from "./Container"

function Navbar(){
    return(
        <nav className={styles.navbar}>
        <Container>
          <Link to='/'>
            <img src={logo} alt="costs"/>
          </Link>
          <ul className={styles.list}>
            <li className={styles.item}>
              <Link exact to='/'>Home</Link>
            </li>
            <li className={styles.item}>
              <Link to='/contact'>Contato</Link>
            </li>
            <li className={styles.item}>
              <Link to='/company'>Empresa</Link>
            </li>
            <li className={styles.item}>
              <Link to='/projects'>Projeto</Link>    
            </li>
            
          </ul>
          </Container>
          </nav>
    )
}

export default Navbar