import React, { useState, useEffect } from "react";
import styled from "styled-components";
import logo from "../assets/logo.jpg";
const Contacts = ({ contacts, currentUser,changeChat }) => {
  const [currentUserName, setCurrentUserName] = useState(undefined);
  const [currentUserImage, setCurrentUserImage] = useState(undefined);
  const [currentSelected, setCurrentSelected] = useState(undefined);
  useEffect(() => {
    if (currentUser) {
      setCurrentUserImage(currentUser.avatarImage);
      setCurrentUserName(currentUser.username);
    }
  }, [currentUser]);
  const changeCurrentChat = (index, contact) => {
    setCurrentSelected(index)
    changeChat(contact)
  };
  return (
    <>
      {currentUserImage && currentUserName && (
        <Container>
          <div className="brand">
            <img src={logo} alt="" />
            <h3>LyraChat!</h3>
          </div>
          <div className="contacts">
            {contacts.map((contact, index) => {
              return (
                <div
                  className={`contact ${
                    index === currentSelected ? "selected" : ""
                  }`}
                  key={index}
                  onClick={()=>changeCurrentChat(index,contact)}
                >
                  <div className="avatar">
                    <img
                      src={`data:image/svg+xml;base64,${contact.avatarImage}`}
                    />
                  </div>
                  <div className="username">
                    <h3>{contact.username}</h3>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="current-user">
            <div className="avatar">
              <img
                src={`data:image/svg+xml;base64,${currentUser.avatarImage}`}
              />
            </div>
            <div className="username">
                <h2>{currentUser.username}</h2>
              </div>
          </div>
        </Container>
      )}
    </>
  );
};
const Container = styled.div`
  display: grid;
  grid-template-rows: 10% 75% 15%;
  overflow: hidden;
  background-color: #73003b;
  .brand {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 1rem;
    img {
      height: 2rem;
    }
    h3 {
      color: white;
    }
    @media screen and (max-width: 680px){
      gap: 0.5rem;
      justify-content: center;
      h3{
        display: none;
      }
    }
  }
  .contacts {
    display: flex;
    flex-direction: column;
    align-items: center;
    overflow: auto;
    gap: 0.4rem;
    &::-webkit-scrollbar{
        width: 0.4rem;
        &-thumb{
            background-color: #ffffff39;
            width: 0.1rem;
            border-radius: 1rem;
        }
    }
    .contact {
      background-color: #ffffff39;
      min-height: 5rem;
      width: 90%;
      cursor: pointer;
      border-radius: 0.5rem;
      padding: 0.4rem;
      gap: 1rem;
      align-items: center;
      display: flex;
      transition: 0.2s all ease-in-out;
      .avatar {
        img {
          height: 3rem;
        }
      }
      .username {
        h3 {
          color: white;
        }
        overflow: hidden;
      }
      @media screen and (max-width: 680px){
      gap: 0.5rem;
      justify-content: center;
      h3{
        display: none;
      }
    }
    }
    .selected {
      background-color: #de0b78;
    }
  }
  .current-user{
    background-color: #73003b;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 2rem;
    .avatar{
        img{
            height: 4rem;
            max-inline-size: 100%;
        }
    }
    .username{
        h2{
            font-size: 2rem;
            color:white;
        }
    }
    @media screen and (min-width: 720px) and (max-width:1080px){
      gap: 0.5rem;
      h2{
        font-size: 1.5rem;
      }
    }
    @media screen and (max-width: 720px){
      gap: 0.5rem;
      h2{
        display: none;
      }
    }
  }
`;
export default Contacts;
