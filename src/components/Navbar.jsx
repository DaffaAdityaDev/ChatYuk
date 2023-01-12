import React, { cloneElement, useContext, useEffect, useState } from 'react'
import { Flex, Spacer,  Box, Grid, GridItem, Input, Image, Text } from '@chakra-ui/react'
import User from './User'
import { collection, query, where, getDocs, setDoc, doc, updateDoc, serverTimestamp, getDoc, onSnapshot } from "firebase/firestore";
import { db } from '../firebase'
import { async } from '@firebase/util';
import { AuthContext } from '../context/AuthContext';
import { ChatContext } from '../context/ChatContext';

function Navbar() {
  const [userName, setUserName] = useState('')
  const [user, setUser] = useState('')
  const [chats, setChats] = useState([])
  const [err, setErr] = useState('')
  
  const { currentUser } = useContext(AuthContext)
  const { dispatch } = useContext(ChatContext)

  // console.log(currentUser)

  useEffect(() => {
    const getChats = () => {
      const unsub = onSnapshot(doc(db, "userChats", currentUser.uid), (doc) => {
        setChats(doc.data());
      });

      return () => {
        unsub();
      };
    };
    currentUser.uid && getChats();
   
  }, [currentUser.uid]);


  // console.log(Object.entries(chats))
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
  
  const handleSelect = async () => {
    //check whether the group(chats in firestore) exists, if not create
    const combinedId =
      currentUser.uid > user.uid
        ? currentUser.uid + user.uid
        : user.uid + currentUser.uid;
    try {
      const res = await getDoc(doc(db, "chats", combinedId));

      if (!res.exists()) {
        //create a chat in chats collection
        await setDoc(doc(db, "chats", combinedId), { messages: [] });

        //create user chats
        await updateDoc(doc(db, "userChats", currentUser.uid), {
          [combinedId + ".userInfo"]: {
            uid: user.uid,
            displayName: user.displayName,
            photoURL: user.photoURL,
          },
          [combinedId + ".date"]: serverTimestamp(),
        });

        await updateDoc(doc(db, "userChats", user.uid), {
          [combinedId + ".userInfo"]: {
            uid: currentUser.uid,
            displayName: currentUser.displayName,
            photoURL: currentUser.photoURL,
          },
          [combinedId + ".date"]: serverTimestamp(),
        });
      }
    } catch (err) {

      
    }
    setUser(null)
    setUserName('')
  }

  const handleSelectChat = (user) => {
    dispatch({type: 'CHANGE_USER', payload: user})
  }
  return (
    <>
      <Flex direction="column" justify="space-between" align="center" h="100%">
        <Box w='80%'>
          <Input placeholder="Find User" size="md" onKeyDown={handleKey} onChange={e => setUserName(e.target.value)} value={userName} mt="1rem"/>
          {user && <Box onClick={handleSelect} my="1rem">
            <Text>Result</Text>
            <Image borderRadius='full' boxSize='50px' src={user?.photoURL} 
            alt={user?.name} fallbackSrc='https://via.placeholder.com/150'/>
            <Text>{user?.displayName}</Text>
          </Box>
          }
          
          <Text>Last massages</Text>
          {Object.entries(chats)?.sort((a,b) => b[1].date - a[1].date).map(([key, value]) => (
            
            <Flex key={key} onClick={() => handleSelectChat(value.userInfo)} align="center" gap="1rem" my="0.5rem">
              <Image borderRadius='full' boxSize='50px' src={value?.userInfo?.photoURL} 
              alt={value?.userInfo?.name} fallbackSrc='https://via.placeholder.com/150' />
              <Text>{value?.userInfo?.displayName}</Text>
            </Flex>
          ))}
        </Box>
        <Box w='80%' h='80px' >
          <User 
            name={currentUser.displayName} 
            photo={currentUser.photoURL}/>
        </Box>
      </Flex>
    </>
  )
}

export default Navbar