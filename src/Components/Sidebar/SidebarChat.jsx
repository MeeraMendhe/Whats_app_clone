import { Avatar } from '@material-ui/core'
import React, { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import db from '../../firebase'
import "./Sidebarchat.css"


const SidebarChat = ({ id, name, addNewChat }) => {
  const [seed, setSeed] = useState("")
 const [messages,setMessages]=useState("")

  useEffect(() => {
    setSeed(Math.floor(Math.random() * 5000))
  }, [])

  useEffect(()=>
  {
    if(id){
      db.collection("rooms").doc(id).collection("message").orderBy("timestamp","desc").onSnapshot(el=>
        (
         setMessages(el.docs.map(doc=>
          (
            doc.data()
          )))
        ))
    }
  })
  const createChat = () => {
    const roomName = prompt("Please enter the name for chat room")

    if (roomName) {
      //data base write
      db.collection("rooms").add({
        name: roomName
      })
    }
  }
  return !addNewChat ? (
    <Link to={`/rooms/${id}`}>
      <div className="sidebarChat">
        <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`} />
        <div className="sidebarChat_info">
          <h2>{name}</h2>
           <p>{messages[0]?.message}</p>
        </div>
      </div>
    </Link>

  ) : (<div className="sidebarChat" onClick={createChat}>
    <h2>Add new chat</h2>
  </div>
    )
}

export default SidebarChat
