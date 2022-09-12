import React, { useState } from "react";
import styled from "styled-components";
import Picker from "emoji-picker-react";
import { IoMdSend } from "react-icons/io";
import { BsEmojiSmileFill } from "react-icons/bs";
const ChatInput = ({handleSendMsg}) => {
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [msg, setMsg] = useState("");
  const handleEmojiPickerHideShow = () => {
    setShowEmojiPicker(!showEmojiPicker);
  };
  const handleEmojiClick = (event, emoji) => {
    let message = msg
    message += emoji.emoji
    setMsg(message)
  };

  const sendChat = (event)=>{
    event.preventDefault()
    if(msg.length>0){
        handleSendMsg(msg)
        setMsg("")
    }
  }
  return (
    <Container>
      <div className="button-container">
        <div className="emoji">
          <BsEmojiSmileFill onClick={handleEmojiPickerHideShow} />
          {showEmojiPicker && <Picker onEmojiClick={handleEmojiClick} />}
        </div>
      </div>
      <form className="input-container" onSubmit={(e)=>sendChat(e)}>
        <input type="text" placeholder="type your message here" value={msg} onChange={e => setMsg(e.target.value)}/>
        <button className="submit">
          <IoMdSend />
        </button>
      </form>
    </Container>
  );
};
const Container = styled.div`
  display: grid;
  grid-template-columns: 5% 95%;
  align-items: center;
  /* background-color:#73003b  ; */
  padding: 0.2rem;
  padding-bottom: 0.3rem;
  .button-container {
    display: flex;
    align-items: center;
    gap: 2rem;
    .emoji {
      position: relative;
      svg {
        font-size: 1.5rem;
        color: #ffff00;
        cursor: pointer;
      }
      .emoji-picker-react {
        position: absolute;
        top: -350px;
        background-color: #200404;
        box-shadow: 0 5px 10px #de0b78;
        border-color: #de0b78;
        .emoji-scroll-wrapper::-webkit-scrollbar{
            background-color: #200404;
            width: 5px;
            &-thumb{
                background-color: #de0b78;
                border-radius: 0.1rem;
            }
        }
        .emoji-categories{
            button{
                filter: contrast(0);
            }
        }
        .emoji-search{
            background-color: transparent;
            border-color: #de0b78;
        }
        .emoji-group::before{
            background-color:#200404;
        }
        .active-category-indicator-wrapper{
            .active-category-indicator{
                background-color: #de0b78;
            }
            
        }
      }
    }
  }
  .input-container {
    width: 100%;
    border-radius: 2rem;
    background-color: transparent;
    display: flex;
    align-items: center;
    gap: 2rem;
    background-color: #ffffff34;
    input {
      width: 90%;
      height: 60%;
      background-color: transparent;
      color: white;
      border: none;
      padding: 0.3rem;
      padding-left: 1rem;
      font-size: 1.2rem;

      &::selection {
        background-color: #de0b78;
      }
      &:focus {
        outline: none;
      }
    }
    button {
      padding: 0.3rem 2rem;
      border-radius: 2rem;
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: #de0b78;
      
      border: none;
      svg {
        transform: translateX(0.4rem);
        color: white;
        font-size: 2rem;
      }
    }
  }
`;
export default ChatInput;
