import React from 'react'
import { Flex, Spacer,  Box, Grid, GridItem, Input } from '@chakra-ui/react'
import OtherUser from './OtherUser'

function Navbar() {
  return (
    <>
      <Flex direction="column" justify="space-between" align="center" h="100%">
        <Box w='80%'>
          <Input placeholder="Search" size="md" />
          <OtherUser />
          <OtherUser />
          <OtherUser />
        </Box>
        <Box w='80%' h='80px' bg='red.400' >
          <OtherUser />
        </Box>
      </Flex>
    </>
  )
}

export default Navbar