import { useState } from "react"
import Input from "../Components/Form/Input"
import SubmitButton from "../Components/Form/SubmitButton"
import Styles from './ServiceForm.module.css'

function ServiceForm({handleSubmit, btnText,projectData}){

    const[service,setService]=useState([])


    function submit(e){
        e.preventDefault()
        projectData.services.push(service)
        handleSubmit(projectData)
    }

    function handleChange(e){
        setService({...service, [e.target.name]: e.target.value})

    }


    return(
        <form onSubmit={submit} className={Styles.form}>
            <Input
            type="text"
            text="Nome do serviço"
            name="name"
            placeholder="Insira o nome do projeto"
            handleOnChange={handleChange}
            />
             <Input
            type="number"
            text="valor do serviço"
            name="cost"
            placeholder="Insira o valor total"
            handleOnChange={handleChange}
            />
             <Input
            type="text"
            text="Descrição do serviço"
            name="description"
            placeholder="Descreva o serviço"
            handleOnChange={handleChange}
            />
            <SubmitButton text={btnText}/>
        </form>
    )
}


export default ServiceForm