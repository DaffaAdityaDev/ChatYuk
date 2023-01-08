import { Box, Image } from '@chakra-ui/react'
import React, { useContext, useEffect, useState } from 'react'
import MainMessage from './MainMessage'
import { ChatContext } from '../context/ChatContext'
import { doc, onSnapshot } from 'firebase/firestore'
import { db } from '../firebase'
import { AuthContext } from '../context/AuthContext'

function Main() {
  const [messages, setMessages] = useState([])
  const { data } = useContext(ChatContext)
  const { currentUser } = useContext(AuthContext);

  useEffect(() => {
    const unSub = onSnapshot(doc(db, "chats", data.chatId), (doc) => {
      doc.exists() && setMessages(doc.data().messages);
    });

    return () => {
      unSub();
    };
  }, [data.chatId]);

  // console.log(messages)

  return (
    <>
    <Box>
      {messages.map((message) => {
        return (
          <Box>
          <Image src={message.senderId === currentUser.uid 
            ? currentUser.photoURL
            : data.user.photoURL} />
          <p>{message.text}</p>
          {message.img && <Image src={message.img} />}

        </Box>
        )
      })}

    </Box>
    <MainMessage />
    </>
  )
}

export default Main