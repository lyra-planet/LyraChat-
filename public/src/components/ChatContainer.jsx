import React, { useEffect,useRef, useState } from "react";
import styled from "styled-components";
import ChatInput from "./ChatInput";
import Logout from "./Logout";
import axios from "axios";
import {v4 as uuidv4} from "uuid"
import { getAllMessageRoute, sendMessageRoute } from "../utils/APIRouter";
const ChatContainer = ({ currentChat, currentUser,socket }) => {
  const [messages, setMessages] = useState([]);
  const [arrivalMessage,setArrivalMessage]= useState(null)
    const scrollRef = useRef()
  const handleSendMsg = async (msg) => {
    await axios.post(sendMessageRoute, {
      from: currentUser._id,
      to: currentChat._id,
      message: msg,
    });
    socket.current.emit("send-msg",{
        to:currentChat._id,
        from:currentUser._id,
        msg:msg
    })
    console.log(1)
    const msgs = [...messages]
    msgs.push({fromSelf:true,message:msg})
    setMessages(msgs)
  };


  const checkGetAllMessageRoute = async () => {
    if(currentChat){
    const response = await axios.post(getAllMessageRoute, {
      from: currentUser._id,
      to: currentChat._id,
    });
    setMessages(response.data);
    }
  };
  useEffect(()=>{
    if(socket.current){
        socket.current.on("msg-recieve",(msg)=>{
            console.log(msg)
            setArrivalMessage({fromSelf:false,message:msg})
        })
    }
  },[messages])
  useEffect(()=>{
    arrivalMessage && setMessages(prev=>[...prev,arrivalMessage])
  },[arrivalMessage])
  useEffect(()=>{
    scrollRef.current?.scrollIntoView({behaviour:"smooth"})
},[messages])
  useEffect(() => {
    checkGetAllMessageRoute();
  }, [currentChat]);
  return (
    currentChat && (
      <Container>
        <div className="chat-header">
          <div className="user-details">
            <div className="avatar">
              <img
                src={`data:image/svg+xml;base64,${currentChat.avatarImage}`}
              />
            </div>
            <div className="username">
              <h3>{currentChat.username}</h3>
            </div>
          </div>
          <Logout />
        </div>
        <div className="chat-messages">
          {messages.map((message) => {
            return (
              <div ref={scrollRef} key={uuidv4()}>
                <div
                  className={`message ${
                    message.fromSelf ? "sended" : "recieved"
                  }`}
                >
                  <div className="content">
                    <p>{message.message}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        <ChatInput handleSendMsg={handleSendMsg} />
      </Container>
    )
  );
};
const Container = styled.div`
padding: 0 2rem;
  padding-top: 1rem;
  display:grid ;
  grid-template-rows:10% 78% 12%;
  gap:0.1rem;
  overflow: hidden;
  @media screen and (min-width: 720px) and (max-width:1080px){
      grid-auto-rows:15% 70% 15%;
    }
  .chat-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    
    .user-details {
      display: flex;
      align-items: center;
      gap: 1rem;
      .avatar {
        img {
          height: 3rem;
        }
      }
      .username {
        h3 {
          color: white;
        }
      }
    }
  }
  .chat-messages {
        display: flex;
        flex-direction: column;
        overflow: auto;
        &::-webkit-scrollbar{
        width: 0.8rem;
        &-thumb{
            background-color: #ffffff39;
            width: 0.1rem;
            border-radius: 1rem;
        }
    }
        .message{
            display: flex;
            align-items: center;
            padding: 0.4rem;
            .content{
                max-width: 40%;
                overflow-wrap: break-word;
                padding: 1rem;
                font-size: 1.1rem;
                border-radius: 1rem;
                color: white;
            }
        }
        .sended{
            justify-content: flex-end;
            .content{
                background-color: #73003b;
            }
        }
        .recieved{
            justify-content: flex-start;
            .content{
                background-color: #730058;
            }
        }
  }
`;
export default ChatContainer;
