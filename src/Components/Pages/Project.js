import { useParams } from 'react-router-dom'
import styles from './Project.module.css'
import { useState,useEffect } from 'react'
import Loading from '../Layout/Loading'
import Container from '../Layout/Container'
import ProjectForm from '../Project/ProjectForm'
import Message from '../Layout/Message'
import ServiceCard from '../../Service/ServiceCard'
import ServiceForm from '../../Service/ServiceForm'

import {parse, v4 as uuidv4} from 'uuid'


function Project(){
    let {id}=useParams()
    const [project,setproject]=useState([])
    const [services,setServices]=useState([])
    const [showProjectForm,setShowProjectForm]=useState(false)
    const [showServiceForm,setShowServiceForm]=useState(false)
    const [message,setmessage] =useState('')
    const [type,setType]=useState('success')

    useEffect(()=>{
        setTimeout(()=>{
            fetch(`http://localhost:5000/Project/${id}`,{
            method:'GET',
            headers:{
                'Content-Type': 'application/json'
            },
        }).then((resp)=> resp.json())
        .then((data)=> {
            setproject(data)
            setServices(data.services)
        })
        .catch((err)=>console.log(err))
        },300)
    },[id])

    function editPost(project){
        setmessage('')

        if (project.budget < project.cost){
            setmessage( 'o orçamento nao poder ser menor do que o projeto')
            setType('error')
            return false
        }

       fetch(`http://localhost:5000/Project/${project.id}`,{
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(project),
        })
        .then((resp)=> resp.json())
        .then((data)=> {
            setproject(data)
            setShowProjectForm(true)
            setmessage( 'atualizado com sucesso')
            setType('success')
        })
        .catch(err => console.log(err))
    }

    function createService(project){
        setmessage('')

        const lastService=project.services[project.services.length -1]

        lastService.id= uuidv4()

        const lastServiceCost=lastService.cost

        const newCost=parseFloat(project.cost) + parseFloat(lastServiceCost)
        
        if(newCost > parseFloat(project.budget)){
            setmessage('Orçamento Ultrapassado, verifique o valor do serviço')
            setType('error')
            project.services.pop()
            return false

        }
        project.cost= newCost
        fetch(`http://localhost:5000/Project/${project.id}`,{
            method:'PATCH',
            headers:{
                'Content-Type': 'application/json'
            },
            body:JSON.stringify(project)
        }).then((resp)=> resp.json())
        .then((data)=>{ 
            console.log(data)
            setServices(data.services)
            setShowServiceForm(false)

        }).catch((err)=>console.log(err))
    }

    function removeService(id,cost){
        const servicesUpdated= project.services.filter(
        (service )=> service.id !==id
        )

        const projectUpdate= project

        projectUpdate.services= servicesUpdated
        projectUpdate.cost=parseFloat(projectUpdate.cost)- parseFloat(cost)

        fetch(`http://localhost:5000/Project/${projectUpdate.id}`,{
            method:'PATCH',
            headers:{
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(projectUpdate)
        }).then((resp)=> resp.json)
        .then((data)=>{
            setproject(projectUpdate)
            setServices(servicesUpdated)
            setmessage('Serviço removido com sucesso')
        })
        .catch(err=>console.log(err))



    }

    function toggleProjectForm(){
        setShowProjectForm(!showProjectForm)
    }
    function toggleServiceForm(){
        setShowServiceForm(!showServiceForm)
    }



    return(
       <>
       {project.name ? (
       <div className={styles.project_details}>
        <Container customClass='column'>
            {message && <Message type={type} msg=
            {message}/>}
            <div className={styles.details_container}>
                <h1>Projeto:{project.name}</h1>
                <button className={styles.btn} onClick={toggleProjectForm}>
                    {(showProjectForm) ? 'Editar projeto' : 'Fechar'}
                </button>
                {(showProjectForm) ? (
                    <div className={styles.project_info}>
                        <p>
                            <span> Categoria:</span>{project.category.name}
                        </p>
                        <p>
                            <span>Total de Orçamento:</span> R$ {project.budget}
                        </p>
                        <p>
                            <span>Total Utilizado:</span> R$ {project.cost}
                        </p>
                    </div>
                ):(
                    <div className={styles.project_info}>
                        <ProjectForm handleSubmit={editPost} btnText="Concluir edição" projectData={project}/>
                    </div>)}
            </div>
                        <hr/>
            <div className={styles.service_form_container}>
                    <h2>Adicione um serviço:</h2>
                    <button className={styles.btn} onClick={toggleServiceForm}>
                    {(showServiceForm) ? 'Adicionar serviço' : 'Fechar'}
                </button>
                <div className={styles.project_info}>
                    {!showServiceForm && <ServiceForm handleSubmit={createService} btnText="Adicionar Serviço" projectData={project}/>}
                </div>
                <h2>Serviços</h2>
                <Container customClass="start"> 
                    {services.length > 0 &&
                    services.map((service)=>(
                        <ServiceCard 
                        id={service.id}
                        name={service.name}
                        cost={service.cost}
                        description={service.description}
                        key={service.name}
                        handleRemove={removeService}/>
                    ))
                    
                    }
                    {services.length ===0 && <p>Não há cadastro</p>}
                    
                </Container>
            </div>
            <hr/>
        </Container>
       </div>
       ): (
        <Loading/>
       )}
       </>
    )
}


export default Project