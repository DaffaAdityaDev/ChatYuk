import React, { cloneElement, useState } from 'react'
import { Flex, Spacer,  Box, Grid, GridItem, Input, Image, Text } from '@chakra-ui/react'
import OtherUser from './OtherUser'
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from '../firebase'
import { async } from '@firebase/util';

function Navbar() {
  const [userName, setUserName] = useState('')
  const [user, setUser] = useState('')

  const handeSearch = async() => {
    const q = query(
      collection(db, "users"),
      where("displayName", "==", userName)
    );
    
    try {
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        setUser(doc.data());
      });
    } catch (err) {
      console.log(err)
    }
  }
  const handleKey = (e) => {
    e.code === 'Enter' && handeSearch()
  }
  return (
    <>
      <Flex direction="column" justify="space-between" align="center" h="100%">
        <Box w='80%'>
          <Input placeholder="Search" size="md" onKeyDown={handleKey} onChange={e => setUserName(e.target.value)}/>
          <Box>
            <Image borderRadius='full' boxSize='50px' src={user?.photoURL} alt={user?.name} />
            <Text>{user?.displayName}</Text>
          </Box>
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