import { Avatar, IconButton } from '@material-ui/core'
import { AttachFile, InsertEmoticon,Mic, MoreVert, SearchOutlined } from '@material-ui/icons'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import db from '../../firebase'
import { useStateValue } from '../Reducer/StateProvider'
import "./Chat.css"
import firebase from "firebase"

const Chat = () => {
    const [seed,setSeed]=useState("")
    const [input,setInput]=useState("")
    const {roomId}=useParams()
    const [roomName,setRoomName]=useState("")
    const[message,setMessage]=useState([])
    const[ {user}, dispatch]=useStateValue()

    useEffect(()=>
    {
       setSeed(Math.floor(Math.random()*5000))
    },[])
    useEffect(()=>
    {
     if(roomId)
     {
         db.collection("rooms").doc(roomId).onSnapshot(el=>
            (
                setRoomName(el.data().name)
            ))

         db.collection("rooms").doc(roomId).collection("message").orderBy("timestamp","asc").onSnapshot(el=>
            {
                setMessage(el.docs.map(doc=>doc.data()))
            })   
     }
    },[roomId])
    const sendMessage=(e)=>
    {
       e.preventDefault()

       db.collection("rooms").doc(roomId).collection("message").add({
           message:input,
           name:user.displayName,
           timestamp:firebase.firestore.FieldValue.serverTimestamp()
       })
       setInput("")
    }
  return (
    <div className="chat">
      <div className="chat_header">
          <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`}/>
          <div className="chat_headerInfo">
              <h3>{roomName}</h3>
              <p>last seen ..
                  {
               new Date(message.timestamp?.toDate()).toUTCString()
                  }
               </p>
          </div>
          <div className="chat_headerRight">
              <IconButton>
                  <SearchOutlined/>
              </IconButton>
              <IconButton>
                  <AttachFile/>
              </IconButton>
              <IconButton>
                  <MoreVert/>
              </IconButton>
          </div>
      </div>
      <div className="chat_body">
          {
              message.map(el=>
                <p className={`chat_message ${el.name===user.displayName && `chat_receiver`}`}>
                <span className="chat_name">{el.name}</span>{el.message}<span className="chat_timespan">
                    {
                        new Date(el.timestamp?.toDate()).toUTCString()
                    }
                </span>
                </p>
                )
          }
    
      </div>
      <div className="chat_footer">
          <InsertEmoticon/>
          <form >
              <input value={input} onChange={(e)=>setInput(e.target.value)} placeholder="Type a message" type=""/>
              <button onClick={sendMessage} type="submit">Send a message</button>
          </form>
          <Mic/>
      </div>
    </div>
  )
}

export default Chat
