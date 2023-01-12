import { Box, Button, Divider, Flex, Spacer, Text } from '@chakra-ui/react'
import React, { useContext } from 'react'
import { signOut } from 'firebase/auth'
import { auth } from '../firebase'
import { ChatContext } from '../context/ChatContext'

function Header() {
  const { data } = useContext(ChatContext)
  // console.log(data)
  
  return (

    <Flex alignItems='center' height="100%" px="1rem">
      <Text fontSize="2xl">{data.user?.displayName}</Text>
      <Divider orientation='vertical' h="24px" ml="0.5rem" />
      <Spacer />
      <Button onClick={() => signOut(auth)}>Logout</Button>
    </Flex>
  )
   
}

export default Header