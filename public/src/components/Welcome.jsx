import React from 'react'
import styled from 'styled-components'
import Robot from '../assets/robot.jpg'
const Welcome = ({currentUser}) => {
  return currentUser&&(
    <Container>
        {/* <img src={Robot} alt="" /> */}
        <h1>Welcome,<span>{currentUser.username}</span></h1>
        <h3>Please select a chat to start a Messaging.</h3>
    </Container>
  )
}
const Container = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    color:white;
    img{
        height: 20rem;
        
    }
    h1{
        span{
            color:#c84d8d
        }
    }
`
export default Welcome