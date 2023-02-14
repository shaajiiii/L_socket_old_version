import React, { useEffect, useState } from 'react';

function Chat({ socket, username, room }) {
    const [currentMessage, setCurrentMessage] = useState("");
    const [messageList, setMessageList] = useState(["test"]);

    const sentMessage = async () => {
        if (currentMessage !== "") {
            const msgData = {
                room,
                author: username,
                message: currentMessage,
                time: `${new Date(Date.now()).getHours()}:${new Date(Date.now()).getMinutes()}`
            }
            await socket.emit('send_message', msgData);
        }
    }

    useEffect(() => {
        socket.on('receive_message', (data) => {
            console.log(data);
            setMessageList((list) => [...list, data]) //we can grab current state like this?
        })
    }, [socket])

    return (
        <div className='chat-window'>
            <div className='chat-header'>
                <p>Live chat </p>
            </div>
            <div className='chat-body'>
                {messageList.map((eachMessageObj) => {
                    return (
                        <h1>{eachMessageObj.message}  </h1>
                    )
                   
                })}
            </div>

            <div className='chat-footer'>
                <input type="text" placeholder='type message..' onChange={(e) => {
                    setCurrentMessage(e.target.value);
                }} />
                <button onClick={sentMessage}> Send </button>
            </div>
        </div>
    )
}

export default Chat
