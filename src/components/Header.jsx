import { Box, Button, Text } from '@chakra-ui/react'
import React, { useContext } from 'react'
import { signOut } from 'firebase/auth'
import { auth } from '../firebase'
import { ChatContext } from '../context/ChatContext'

function Header() {
  const { data } = useContext(ChatContext)
  // console.log(data)
  
  return (
    <Box>
      <Text>{data.user?.displayName}</Text>
      <Button onClick={() => signOut(auth)}>Logout</Button>
    </Box>
  )
}

export default Header