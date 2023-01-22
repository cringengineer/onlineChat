import React, {useState} from 'react';
import styled from "styled-components";
import {NavLink} from "react-router-dom";


const Wrapper = styled.div`
  width: 100%;
  min-height: 100vh;
  background-image: linear-gradient(to right, #0f0c29, #221e46, #24243e);
  margin: 0 auto;
  display: flex;
  align-items: center;
`;
const Form = styled.form`
  width: 40vw;
  height: 50vh;
  background-color: ${props => props.theme.colors.dark};
  margin: 0 auto;
  align-items: center;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  border-radius: 60px;
  @media (max-width: 768px) {
    width: 300px;
  }
`;

const Input = styled.input`
  padding: 10px 20px;
  border-radius: 30px;
  border: none;
  font-size: 1em;
`;
const Btn = styled.button`
  padding: 5px 50px;
  border-radius: 30px;
  background-color: #6f5083;
  border: none;
  color: ${props => props.theme.colors.light};
  font-size: 1.5em;
  cursor: pointer;
`;

const Main = () => {
    const [data, setData] = useState({name: '', room: ''});
    const onNameChange = (value) => {
        setData({...data, name: value})
    };
    const onRoomChange = (value) => {
        setData({...data, room: value})
    };


    return (
        <Wrapper>
            <Form>
                <Input placeholder='Your name' name='username' type='text' value={data.name} minLength={3}
                       onChange={(e) => onNameChange(e.currentTarget.value)} autoComplete="off"/>
                <Input placeholder='Room name' name='room' type='text' value={data.room} minlength='3'
                       onChange={(e) => onRoomChange(e.currentTarget.value)} autoComplete="off"/>
                <NavLink to={data.name.length > 1 && data.room.length > 1 ? `/Chat?name=${data.name}&room=${data.room}` :  '/'}>
                    <Btn>Join</Btn>
                </NavLink>
            </Form>
        </Wrapper>
    );
};

export default Main;