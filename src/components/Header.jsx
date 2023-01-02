import { Box, Button, Text } from '@chakra-ui/react'
import React from 'react'
import { signOut } from 'firebase/auth'
import { auth } from '../firebase'

function Header() {
  
  return (
    <Box>
        <Text>Segun adebayo</Text>
        <Button onClick={() => signOut(auth)}>Logout</Button>
    </Box>
  )
}

export default Header