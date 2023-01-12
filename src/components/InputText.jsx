import { Box, Button, Flex, Image, Input } from '@chakra-ui/react'
import React, { useContext, useEffect, useRef, useState } from 'react'
import { AuthContext } from '../context/AuthContext'
import { ChatContext } from '../context/ChatContext'
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { db, storage } from '../firebase';
import { v4 as uuid } from "uuid";
import { Timestamp, arrayUnion, doc, serverTimestamp, updateDoc } from 'firebase/firestore';

function InputText({ message }) {
  const [text, setText] = useState("");
  const [img, setImg] = useState(null);

  const { currentUser } = useContext(AuthContext);
  const { data } = useContext(ChatContext);
  // console.log()

  const handleSend = async () => {
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

    setText("");
    setImg(null);
  };
  return (
    <Flex align="center" height="100%" gap="1rem" mx="1rem">
      <Input
        type="file"
        onChange={(e) => setImg(e.target.files[0])}
        style={{ display: "none" }}
        id="file"

      />
      <label htmlFor="file">Upload</label>
      <Input
        type="text"
        value={text}
        placeholder="Type a message"
        size="lg"
        onChange={(e) => setText(e.target.value)}
      />
      
      
      <Button onClick={handleSend}>Send</Button>
    </Flex>
  )
}

export default InputText