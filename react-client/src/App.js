import './App.css';
import io from 'socket.io-client';
import { useState } from 'react'
import Chat from './components/Chat';
const socket = io.connect('http://localhost:3001');

function App() {
  const [username, SetUsername] = useState("");
  const [room, SetRoom] = useState("");

  const joinRoom = () => {
    if (username !== "" && room !== "")
    socket.emit('join_room', room); // user defined name
  }
  return (
    <div className="App">
      <h1> Join a chat </h1>
      <input type="text" placeholder="John.." onChange={(e) => {
        SetUsername(e.target.value);
      }} />
      <input type="text" placeholder="Room ID..." onChange={(e) => {
        SetRoom(e.target.value);
      }} />
      <button onClick={joinRoom}>Join a room </button>

      <Chat socket={socket} username = {username} room = {room}/>

    </div>
  );
}

export default App;
