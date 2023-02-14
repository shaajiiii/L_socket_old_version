import React, { useState } from 'react';

function Chat({ socket, username, room }) {
    const [currentMessage, setCurrentMessage] = useState("");

    const sentMessage = async () => {
        if(currentMessage !== ""){
            const msgData = {
                room,
                author: username,
                message: currentMessage,
                time: `${new Date(Date.now()).getHours()}:${new Date(Date.now()).getMinutes()}`
            }
            console.log(msgData);
            await socket.emit('send_message', msgData);
        }
    }

    return (
        <div>
            <div className='chat-header'>
                <p>Live chat </p>
            </div>
            <div className='chat-body'>
                <span> Nill for now </span>
            </div>
            <div className='chat-footer'>
                <input type="text" placeholder='type message..' onChange={(e) => {
                    setCurrentMessage(e.target.value);
                }} />
                <button onClick={sentMessage}> ▶️ </button>
            </div>
        </div>
    )
}

export default Chat
