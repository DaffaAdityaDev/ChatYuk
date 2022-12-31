import React, { useContext } from 'react'
import { Input, FormControl, FormLabel, FormErrorMessage, 
    FormHelperText, Container, VStack, HStack, Text, Button,
    VisuallyHidden } from '@chakra-ui/react'

import { PhoneIcon, AddIcon, WarningIcon, PlusSquareIcon } from '@chakra-ui/icons'
import { getAuth, createUserWithEmailAndPassword,updateProfile } from "firebase/auth";
import { auth, storage, db } from '../firebase';
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore"; 

import { useNavigate, Link } from "react-router-dom";

function Register() {
    const navigate = useNavigate();
    // TODO: useState for error
    
    const handleSubmit = async(e) => {
        e.preventDefault()
        const displayName = e.target[0].value
        const email = e.target[1].value
        const password = e.target[2].value
        const file = e.target[3].files[0]

        try {
            const res = await createUserWithEmailAndPassword(auth, email, password)

            const date = new Date().getTime();
            const storageRef = ref(storage, `${displayName + date}`);

            // Register three observers:
            // 1. 'state_changed' observer, called any time the state changes
            // 2. Error observer, called on failure
            // 3. Completion observer, called on successful completion
            await uploadBytesResumable(storageRef, file).then(() => {
                getDownloadURL(storageRef).then(async (downloadURL) => {
                  try {
                    //Update profile
                    await updateProfile(res.user, {
                      displayName,
                      photoURL: downloadURL,
                    });
                    // create user on firestore
                    await setDoc(doc(db, "users", res.user.uid), {
                      uid: res.user.uid,
                      displayName,
                      email,
                      photoURL: downloadURL,
                    });
                    await setDoc(doc(db, "users", res.user.uid), {
                        uid: res.user.uid,
                        displayName,
                        email,
                        photoURL: downloadURL,
                    });
          
                    //create empty user chats on firestore
                    await setDoc(doc(db, "userChats", res.user.uid), {});
                    navigate('/')
                  } catch (err) {
                    console.log(err);
                   
                  }
                });
              });

        } catch (error) {
            console.log(error)
        }
    }
    async function test() {
        // await setDoc(doc(db, "cities", "LA"), {
        //     name: "Los Angeles",
        //     state: "CA",
        //     country: "USA"
        //   });
        navigate ('/')
        console.log("test")
    }

  return (
    <Container>
        <VStack>
            <span className="logo">ChatYuk</span>
            <span className="title">Register</span>
            {/* <button onClick={test}>test</button> */}
            <form onSubmit={handleSubmit}>
                <FormControl>
                    <Input type="text" placeholder="display name"/>
                    <Input type="email" placeholder="email"/>
                    <Input type="password" placeholder='password'/>
                    <VisuallyHidden>
                        <Input type="file" id='file'/>
                    </VisuallyHidden> 
                    <label htmlFor='file'>
                        <HStack>
                            <PlusSquareIcon w={50} h={50} />
                        </HStack>
                    </label>          
                    <Button colorScheme="blue" type='submit'>Sign up</Button>
                </FormControl>
            </form>
            <p>You do have an account? <Link to='/login'>Log in</Link></p>
        </VStack>
    </Container>
  )
}

export default Register