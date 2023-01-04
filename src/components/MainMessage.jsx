import { Box } from '@chakra-ui/react'
import React, { useContext } from 'react'
import { AuthContext } from '../context/AuthContext'
import { ChatContext } from '../context/ChatContext'

function MainMessage({ message }) {
  const { currentUser } = useContext(AuthContext)
  const { data } = useContext(ChatContext)
  return (
    <Box>
      {message?.message}
    </Box>
  )
}

export default MainMessage