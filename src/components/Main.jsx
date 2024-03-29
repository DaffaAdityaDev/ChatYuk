import { Box, Flex, Image, Text } from '@chakra-ui/react'
import React, { useContext, useEffect, useRef, useState } from 'react'
import InputText from './InputText'
import { ChatContext } from '../context/ChatContext'
import { doc, onSnapshot } from 'firebase/firestore'
import { db } from '../firebase'
import { AuthContext } from '../context/AuthContext'
import Notification from '../assets/notification-sound.mp3'

function Main() {
  const [messages, setMessages] = useState([])
  const { data } = useContext(ChatContext)
  const { currentUser } = useContext(AuthContext);

  const ref = useRef()

  useEffect(() => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
    if(messages[messages.length - 1]?.senderId !== currentUser.uid) {
      new Audio(Notification).play();
    }
    return () => {
      new Audio(Notification).pause();
    }
  }, [messages])


  useEffect(() => {
    const unSub = onSnapshot(doc(db, "chats", data.chatId), (doc) => {
      doc.exists() && setMessages(doc.data().messages);
    });

    return () => {
      unSub();
    };
    
  }, [data.chatId]);


  return (
    <>
    <Box>
      {messages.map((message) => {
        return (
        // <Box>
          
        //   <Image src={message.senderId === currentUser.uid 
        //     ? currentUser.photoURL
        //     : data.user.photoURL} />
        //   <p>{message.text}</p>
        //   {message.img && <Image src={message.img} />}

        // </Box>
        <Flex direction="column" ref={ref}>
          {currentUser && message.senderId === currentUser.uid ? <Flex alignSelf="flex-end" flexDirection="row-reverse" mt="1rem" mx="1rem">
            <Image src={currentUser.photoURL} borderRadius="full" boxSize="80px" alt="your chat" ml="1rem"/>
            <Flex flexDirection="column" borderRadius="md" maxW="600px">
              <Text bgColor="white" borderRadius="lg" px="0.5rem" mb="0.5rem">{message.text}</Text>
              {message.img && <Image src={message.img} boxSize="max-content"/>}
            </Flex>
            </Flex> : <Flex mt="1rem" mx="1rem" >
              <Image src={data.user.photoURL} borderRadius="full" boxSize="80px" mr="1rem"
              alt={`${data.user.displayName} chat`} fallbackSrc='https://via.placeholder.com/150'/>
              <Flex flexDirection="column" borderRadius="md" maxW="600px">
                <Text bgColor="white" borderRadius="lg" px="0.5rem" mb="0.5rem">{message.text}</Text>
                {message.img && <Image src={message.img} boxSize="max-content" />}
              </Flex>
            </Flex>
          }
        </Flex>
        )})}

    </Box>
    
    </>
  )
}

export default Main