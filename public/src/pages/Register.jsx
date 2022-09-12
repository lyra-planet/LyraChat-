import React,{useState,useEffect} from 'react'
import { Link,useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import axios from 'axios'
import {ToastContainer,toast} from 'react-toastify'
import "react-toastify/dist/ReactToastify.css"
import Logo from '../assets/logo.jpg'
import { registerRoute } from '../utils/APIRouter'
const Register = () => {
    const navigate = useNavigate()
    const [values,setValues] = useState({
        username:"",
        email:"",
        password:"",
        confirmPassword:""
    })
    const toastOption = {
        position:"bottom-right",
        autoClose:8000,
        pauseOnHover:true,
        draggable:true,
        theme:"dark"
    }
    const checkLocalStorage=async()=>{
        if(localStorage.getItem("lyra-chat-user")){
            navigate("/")
        }
    }
    useEffect(()=>{checkLocalStorage()},[])
  const handleSubmit = async(e) => {
    e.preventDefault()
    if(handleValidation()){
        const {username,password,confirmPassword,email} = values
        const __data = await axios.post(registerRoute,{
            username,
            email,
            password
        })
        const data = __data.data
        if(data.status === false){
            toast.error(data.msg,toastOption)
        }
        if(data.status === true){
            localStorage.setItem('lyra-chat-user',JSON.stringify(data.user))
            navigate("/");
        }
        
    }
  }
  const handleValidation = () => {
    const {username,password,confirmPassword,email} = values
    if(password!==confirmPassword){
    toast.error("Password and confirm password should be same.",
    toastOption)
    return false
    }else if(username.length<3){
    toast.error("Username should be greater than 3 characters.",
    toastOption)
    return false
    }else if(password.length<8){
    toast.error("Password should be equal or greater than 8 characters.",
    toastOption)
    return false
    }else if(email === ''){
    toast.error("Email is required.",
    toastOption)
    }
    return true
  }
  const handleChange = (e) => {
    e.preventDefault()
    setValues({...values,[e.target.name]:e.target.value})
  }
    return (
    <>
    <FormContainer>
        <form onSubmit={(e)=>handleSubmit(e)}>
            <div className='brand'>
                <img src={Logo} alt="" />    
                <h1>LyraChat!</h1>
            </div>
            <input type="text" 
            placeholder='Username' 
            name='username' 
            onChange={e=>handleChange(e)}/>
            <input type="email" 
            placeholder='Email' 
            name='email' 
            onChange={e=>handleChange(e)}/>
            <input type="password" 
            placeholder='Password' 
            name='password' 
            onChange={e=>handleChange(e)}/>
            <input type="password" 
            placeholder='Confirm Password' 
            name='confirmPassword' 
            onChange={e=>handleChange(e)}/>
            <button type='submit'>Create User</button>
            <span>Already have a account ? 
                <Link to="/login">Login</Link>
                </span>
        </form>
    </FormContainer>
    <ToastContainer/>
    </>
  )
}

const FormContainer =  styled.div`
height:100vh;
width: 100vw;
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
gap: 1rem;
background-color: #3b051c;
.brand{
    display: flex;
    align-items: center;
    justify-content: center;
    img{
        height: 5rem;
    }
    h1{
        color: white;
    }
}
form{
    display: flex;
    flex-direction: column;
    gap:2rem;
    background-color:#250013;
    border-radius: 2rem;
    padding: 3rem 5rem;
    input{
        background-color: transparent;
        padding: 1rem;
        border: 0.1rem solid #6b3250;
        border-radius: 0.4rem;
        color: white;
        width: 100%;
        font-size:  1rem;
        &:focus{
            border: 0.1rem solid #cb5192;
            outline: none;
        }
    }
    button{
        background-color: #cb5192;
        color: white;
        padding: 1rem 2rem;
        border-radius: 0.4rem;
        border: none;
        font-weight: bold;
        cursor: pointer;
        font-size: 1rem;
        text-transform: uppercase;
        transition: all 0.4s ease-in-out;
        &:hover{
            background-color: #d32b84;
        }
    }
    span{
        color: white;
        text-transform: uppercase;
        a{
            color: #cb5192;
            font-weight: bold;
            text-decoration: none;
        }
    }
}
`

export default Register