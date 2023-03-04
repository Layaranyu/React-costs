import Message from "../Layout/Message"
import {useLocation} from 'react-router-dom'
import styles from './Projects.module.css'
import Container from "../Layout/Container"
import LinkButton from "../Layout/LinkButton"
import { useState,useEffect } from "react"
import ProjectCard from "../Project/ProjectCard"
import Loading from "../Layout/Loading"


function Projects(){
    const [projects,setProjects]=useState([])
    const [removeLoading,setRemoveLoading] =useState(false)
    const [projectMessage,setProjectMessage]= useState('')

    const location=useLocation()
    let message=''
    if(location.state){
        message =  location.state.message
    }

    useEffect(()=>{
        fetch('http://localhost:5000/Project',{
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then((resp)=>resp.json())
            .then((data)=>{
                console.log(data)
                setProjects(data)
                setRemoveLoading(true)
            })
            .catch((err)=> console.log(err))
        },[])


        function removeProject(id){
        fetch(`http://localhost:5000/Project/${id}`,{
            method:'DELETE',
            Headers:{
                'Content-Type': 'application/json'
            },
        }).then((resp)=> resp.json())
        .then(()=>{
            setProjects(projects.filter((project) => project.id !== id ));
            setProjectMessage('Projeto removido com sucesso')
        })
        .catch((err)=> console.log(err))
    }


    return (
        <div className={styles.project_container}>
            <div className={styles.title_container}>
            <h1>Meus Projetos </h1>
            <LinkButton to='/newproject' text='Criar Projeto' />
            </div>
            {message && <Message type="success" msg={message}/>}
            {projectMessage && <Message type="success" msg={projectMessage}/>}
            <Container customClass="start">
                {projects.length > 0 && 
                projects.map((project)=>(
                    <ProjectCard id={project.id}
                       name={project.name}
                     budget={project.budget}
                     category={project?.category?.name}
                     key={project.id}
                     handleRemove={removeProject}/>
                ))}
                {!removeLoading && <Loading/>}
                {removeLoading && projects.length === 0 &&(
                    <p>Não há projetos cadastrados</p>
                )
                }
            </Container>
        </div>
    )
}


export default Projects