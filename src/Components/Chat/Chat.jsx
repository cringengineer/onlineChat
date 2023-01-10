import React, {useEffect, useState} from 'react';
import io from 'socket.io-client';
import {useLocation, useNavigate} from "react-router-dom";
import styled from "styled-components";
import emoji from './../../img/lol.png';
import EmojiPicker from "emoji-picker-react";
import Messages from "../Messages/Messages";

const socket = io.connect('https://socket-service-tpop.onrender.com');


const Wrapper = styled.div`
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  width: 100%;
  background-image: linear-gradient(to right, #0f0c29, #221e46, #24243e);
  align-items: center;
`;
const Title = styled.h2`
  font-size: 2em;
  color: beige;
  @media (max-width: 768px) {
    font-size: 1.5em;
  }
`;
const Header = styled.div`
  display: flex;
  align-items: center;
  width: 60vw;
  justify-content: space-between;
  background-color: #34394d;
  margin-top: 20px;
  border-radius: 15px 15px 0px 0px;
  height: 50px;
  @media (max-width: 768px) {
    width: 100vw;
    margin-top: 0;
    border-radius: 0;
  }
`;
const LeftButton = styled.button`
  padding: 5px 10px;
  background-color: #962727;
  border: none;
  color: white;
  font-size: 1.1em;
  border-radius: 50px;
  cursor: pointer;
  margin-right: 5px;
  @media (max-width: 768px) {
    font-size: 1em;
  }
`;

const StyledForm = styled.form`
  display: flex;
  background-color: #34394d;
  width: 60vw;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 40px;
  border-radius: 0px 0px 15px 15px;
  @media (max-width: 768px) {
    width: 100vw;
    border-radius: 0;
  }
`;
const StyledInput = styled.input`
  padding: 5px 40px;
  border-radius: 10px;
  margin-left: 20px;
  margin-right: 30px;
  border: none;
  width: 50vw;
  background-color: #34394d;
  color: white;

  &:focus {
    border: none;
    outline: 0;
  }

  
`
const StyledImg = styled.img`
  width: 30px;
  height: 30px;
  cursor: pointer;
  vertical-align: middle;
`;
const StyledP = styled.p`
  color: white;
  font-size: 1.1em;
  margin-left: 5px;
`;
const StyledContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`
const StyledSubmit = styled.input`
  padding: 3px 10px;
  background-color: #4d4d96;
  border-radius: 20px;
  border: none;
  color: white;
  font-size: 1.1em;
  cursor: pointer;
`
const StyledEmojiPicker = styled.div`
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  bottom: 100%;
  @media (max-width: 768px) {
    left: 80%;
    transform: translateX(-80%);
  }
`
const StyledEmojiContainer = styled.div`
  position: relative;
`
const Chat = () => {
    const {search} = useLocation();
    const [params, setParams] = useState({user: '', room: ''});
    const [state, setState] = useState([]);
    const [isOpen, setOpen] = useState(false);
    const [message, setMessage] = useState('');
    const [usersCount, setUsersCount] = useState(0);
    const navigate = useNavigate();

    useEffect(() => {
        const searchParams = Object.fromEntries(new URLSearchParams(search));
        setParams(searchParams);
        socket.emit('join', searchParams);
    }, [search]);

    useEffect(() => {
        socket.on('message', ({data}) => {
            setState((prevState) => [...prevState, data]);
        })
    }, []);

    useEffect(() => {
        socket.on('room', ({data: {users}}) => {
            setUsersCount(users.length);
        })
    }, []);

    const onEmojiClick = ({emoji}) => {
        setMessage(`${message}${emoji}`)
    };
    const onMessageChange = (value) => {
        setMessage(value)
    };

    const sendMessage = (e) => {
        e.preventDefault()
        if (!message) return;

        socket.emit('sendMessage', {message, params});
        setMessage('')
    };

    const leaveRoom = () => {
        socket.emit('leaveRoom', {params});
        navigate('/')
    }

    return (
        <Wrapper>
            <Header>
                <StyledP>{usersCount} users</StyledP>
                <Title>{params.room}</Title>
                <LeftButton onClick={() => leaveRoom()}>Leave room</LeftButton>
            </Header>
            <Messages messages={state} name={params.name}/>
            <StyledForm onSubmit={sendMessage}>
                <StyledInput placeholder='Write a your message' name='room' type='text' value={message}
                             onChange={(e) => onMessageChange(e.currentTarget.value)} autoComplete="off"/>
                <StyledContainer>
                    <StyledEmojiContainer>
                        <StyledImg alt='emoji' src={emoji} onClick={() => setOpen(!isOpen)}></StyledImg>
                        {isOpen ?
                            <StyledEmojiPicker><EmojiPicker width="250px" height="350px" theme="auto" onEmojiClick={(emoji) => onEmojiClick(emoji)}/></StyledEmojiPicker> : null}
                    </StyledEmojiContainer>
                    <StyledSubmit value='Send' type="submit" onClick={(e) => sendMessage(e)}/>
                </StyledContainer>
            </StyledForm>
        </Wrapper>
    );
};

export default Chat;