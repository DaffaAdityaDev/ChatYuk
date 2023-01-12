import { Box, Button, Center, Flex, HStack, Image, Input, Text } from '@chakra-ui/react'
import React, { useContext, useEffect, useRef, useState } from 'react'
import { AuthContext } from '../context/AuthContext'
import { ChatContext } from '../context/ChatContext'
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { db, storage } from '../firebase';
import { v4 as uuid } from "uuid";
import { Timestamp, arrayUnion, doc, serverTimestamp, updateDoc } from 'firebase/firestore';
import { PlusSquareIcon } from '@chakra-ui/icons';

function InputText({ message }) {
  const [text, setText] = useState("");
  const [img, setImg] = useState(null);
  const [preview, setPreview] = useState();

  const { currentUser } = useContext(AuthContext);
  const { data } = useContext(ChatContext);

  useEffect(() => {
    if(!img) {
      return
    }
  
    const objectUr = URL.createObjectURL(img)
    setPreview(objectUr)

    return () => URL.revokeObjectURL(objectUr)
  }, [img])


  const handleSend = async () => {
    if(text.length === 0 && !img) return
    setText("");
    setImg(null);
    if (img) {
      const storageRef = ref(storage, uuid());

      const uploadTask = uploadBytesResumable(storageRef, img);

      uploadTask.on(
        (error) => {
          //TODO:Handle Error
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
            await updateDoc(doc(db, "chats", data.chatId), {
              messages: arrayUnion({
                id: uuid(),
                text,
                senderId: currentUser.uid,
                date: Timestamp.now(),
                img: downloadURL,
              }),
            });
          });
        }
      );
    } else {
      await updateDoc(doc(db, "chats", data.chatId), {
        messages: arrayUnion({
          id: uuid(),
          text,
          senderId: currentUser.uid,
          date: Timestamp.now(),
        }),
      });
    }

    await updateDoc(doc(db, "userChats", currentUser.uid), {
      [data.chatId + ".lastMessage"]: {
        text,
      },
      [data.chatId + ".date"]: serverTimestamp(),
    });

    await updateDoc(doc(db, "userChats", data.user.uid), {
      [data.chatId + ".lastMessage"]: {
        text,
      },
      [data.chatId + ".date"]: serverTimestamp(),
    });
    
  };


  return (
    <Flex align="center" height="100%" gap="1rem" mx="1rem" color="white">
      <Input
        color="white"
        type="file"
        onChange={(e) => setImg(e.target.files[0])}
        style={{ display: "none" }}
        id="file"
      />
      <label htmlFor="file">
      <Center>
        <HStack>
          {img ? <Image src={preview} alt="profile" boxSize="50px" borderRadius="full" /> :
          <PlusSquareIcon w={50} h={50} />}
        </HStack>
      </Center>
      </label>
      <Input
        color="white"
        type="text"
        value={text}
        placeholder="Type a message"
        size="lg"
        onChange={(e) => setText(e.target.value)}
      />
      
      <Button onClick={handleSend}  colorScheme='messenger'>Send</Button>
    </Flex>
  )
}

export default InputText