import React from 'react'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import axios from 'axios'
import {BiPowerOff} from 'react-icons/bi'
const Logout = () => {
    const navigate = useNavigate()
    const handleChick = async() => {
        localStorage.clear("lyra-chat-user")
        navigate("/login")
    }
  return (
    <Button onClick={handleChick}>
        <BiPowerOff/>
    </Button>
  )
}
const Button = styled.button`
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0.5rem;
    border-radius: 0.5rem;
    background-color:#de0b78;
    border: none;
    cursor: pointer;
    color: white;
    svg{
        font-size: 1.3rem;
    }
`
export default Logout