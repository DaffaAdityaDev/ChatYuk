import { Box } from '@chakra-ui/react'
import React, { useContext, useEffect, useState } from 'react'
import MainMessage from './MainMessage'
import { ChatContext } from '../context/ChatContext'
import { doc, onSnapshot } from 'firebase/firestore'
import { db } from '../firebase'

function Main() {
  const [messages, setMessages] = useState([])
  const { data } = useContext(ChatContext)

  useEffect(() => {
    const unSub = onSnapshot(doc(db, "chats", data.chatId), (doc) => {
      doc.exists() && setMessages(doc.data().messages);
    });

    return () => {
      unSub();
    };
  }, [data.chatId]);

  console.log(messages)

  return (
    <Box>
      <MainMessage />
      {messages.map(message => <MainMessage message={message} key={message.id} />)}
    </Box>
  )
}

export default Main