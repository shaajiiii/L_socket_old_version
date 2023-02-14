import React, { useEffect, useState } from 'react';
import ScrollToBottom from 'react-scroll-to-bottom';

function Chat({ socket, username, room }) {
    const [currentMessage, setCurrentMessage] = useState("");
    const [messageList, setMessageList] = useState([]);

    const sentMessage = async () => {
        if (currentMessage !== "") {
            const msgData = {
                room,
                author: username,
                message: currentMessage,
                time: `${new Date(Date.now()).getHours()}:${new Date(Date.now()).getMinutes()}`
            }
            await socket.emit('send_message', msgData);
            setMessageList((list) => [...list, msgData]);
            setCurrentMessage("")
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
                <ScrollToBottom className='message-container'>
                    {messageList.map((eachMessageObj) => {
                        return (
                            <div className='message' id={username === eachMessageObj.author ? "you" : "other"}>
                                <div>
                                    <div className='message-content'>
                                        <p>{eachMessageObj.message}</p>
                                    </div>
                                    <div className='message-meta'>
                                        <p id="time">{eachMessageObj.time} </p>
                                        <p id="author"> {eachMessageObj.author}</p>

                                    </div>

                                </div>
                            </div>
                        )

                    })}
                </ScrollToBottom>
            </div>

            <div className='chat-footer'>
                <input type="text" value={currentMessage} placeholder='type message..' onChange={(e) => {
                    setCurrentMessage(e.target.value);
                }}

                    onKeyDown={((e) => {
                        e.key === "Enter" && sentMessage();

                    })}

                />
                <button onClick={sentMessage}> ▶</button>
            </div>
        </div>
    )
}

export default Chat
