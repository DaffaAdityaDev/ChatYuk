import { Box, Flex, Image, Text } from '@chakra-ui/react'
import React from 'react'

function OtherUser() {
  return (
    <Box bg="red">
        <Flex align="center" gap="1rem">
            <Image borderRadius='full' boxSize='50px' src="https://bit.ly/sage-adebayo" alt="Segun Adebayo" />
            <Text>Segun Adebayo</Text>
        </Flex>
    </Box>
  )
}

export default OtherUser