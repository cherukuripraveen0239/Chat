import React from 'react'
import './Messages.css'
import Message from './Message'
import ScroolToBottom from 'react-scroll-to-bottom'
const Messages = ({messages,name}) => (
    <ScroolToBottom className="messages">
        {messages.map((message,i)=><div key={i}>
         <Message  message={message} name={name}/>
        </div>)}
    </ScroolToBottom>
)


export default Messages
