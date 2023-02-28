import saving from '../../img/savings.svg'
import LinkButton from '../Layout/LinkButton'
import styles from './home.module.css'



function Home(){
    return(
        <section className={styles.home_container}>
            <h1>Bem-vindo ao <span>Costs</span></h1>
            <p>Comece a gerenciar os seus projetos agora mesmo!</p>
            <LinkButton to='/newproject' text="Criar projeto"/>
            <img src={saving} alt="Costs" />
        </section>
    )
}


export default Home