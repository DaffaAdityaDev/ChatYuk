import { Box, Flex, Image, Text } from '@chakra-ui/react'
import React from 'react'

function User({ name, photo}) {
  return (
    <Box>
        <Flex align="center" gap="1rem">
          <Image borderRadius='full' boxSize='50px' src={photo} alt="Segun Adebayo" />
          <Text width="100%" isTruncated>{name}</Text>
        </Flex>
    </Box>
  )
}

export default User