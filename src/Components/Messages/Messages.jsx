import React from 'react';
import styled from "styled-components";
import style from './style.module.css'


const MessagesWrapper = styled.div`
  width: 60vw;
  height: 600px;
  overflow: auto;
  background-color: #262c3f;
  display: flex;
  flex-direction: column;
  row-gap: 10px;
  
  &::-webkit-scrollbar {
    background: rgba(21, 21, 38, 0.8);
    width: 5px;
  }

  &::-webkit-scrollbar-thumb {
    background: #090923;
    border-radius: 5px;
  }
  @media (max-width: 768px) {
    width: 100vw;
  }
`;


const Messages = ({messages, name}) => {
    return (
        <MessagesWrapper>
            {messages.map((item, i) => {
                const isMe = item.user.name === name ? style.my : style.another;
                const isAnother = item.user.name === name;

                return (
                    <div key={i} className={`${style.message__wrapper} ${isMe}`}>
                        {isAnother ? null : <span className={style.author}>{item.user.name}</span>}
                        <div className={style.text__wrapper}>
                            <p className={style.text}>{item.message}</p>
                        </div>
                    </div>
                )
            })}
        </MessagesWrapper>
    );
};

export default Messages;