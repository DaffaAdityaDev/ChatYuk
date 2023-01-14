import React, { useContext, useEffect, useState } from 'react'
import { Input, FormControl, FormLabel, FormErrorMessage, 
    FormHelperText, Container, VStack, HStack, Text, Button,
    VisuallyHidden, 
    Box,
    Center,
    Stack,
    Image} from '@chakra-ui/react'

import { PhoneIcon, AddIcon, WarningIcon, PlusSquareIcon } from '@chakra-ui/icons'
import { getAuth, createUserWithEmailAndPassword,updateProfile } from "firebase/auth";
import { auth, storage, db } from '../firebase';
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore"; 

import { useNavigate, Link } from "react-router-dom";
import LoadingModal from '../components/LoadingModal';

function Register() {
    const navigate = useNavigate();
    const [password, setPassword] = useState("")
    const [passLength, setpassLength] = useState()
    const [email, setEmail] = useState("")
    const [isValidEmail, setIsValidEmail] = useState()
    const [selectedFile, setSelectedFile] = useState()
    const [preview, setPreview] = useState()
    const [isRedirect, setIsRedirect] = useState(false)
    const [err, setErr] = useState()

    useEffect(() => {
      if (!selectedFile) {
        setPreview(undefined)
        return
      }

      const objectUrl = URL.createObjectURL(selectedFile)
      setPreview(objectUrl)

      // free memory when ever this component is unmounted
      return () => URL.revokeObjectURL(objectUrl)
  }, [selectedFile])
    
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
            setIsRedirect(true)

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
                    setErr(err)
                  }
                });
              });

        } catch (error) {
          console.log(error)
          setErr(error.message)
        }
    }
    function handlePass(e) {
      setPassword(e.target.value)
      if (e.target.value.length <= 6) {
        setpassLength(true)
      } else {
        setpassLength(false)
      }
    }
    function handleEmail(e) {
      setEmail(e.target.value)
      let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      if ( re.test(email) ) {
          // this is a valid email address
          // call setState({email: email}) to update the email
          // or update the data in redux store.
        setIsValidEmail(false)
      }
      else {
          // invalid email, maybe show an error to the user.
        setIsValidEmail(true)
      }
    }

    function handleImg(e) {
      if (!e.target.files || e.target.files.length === 0) {
        setSelectedFile(undefined)
        return
      }

      // I've kept this example simple by using the first image instead of multiple
      setSelectedFile(e.target.files[0])
    }

    // function test() {
    //   setIsRedirect(true)
    // }

    
  return (
    <Box bgGradient='linear(to-r, #009FFF, #ec2F4B)' > 
      <Center display='flex' height='100vh' width="100vw" justifyContent='center' alignItems='center' flexDirection='column'>
        <Box w="400px" h="fit-content" bgColor="rgba(255,255,255, 0.15)" blur="5px" borderWidth='1px' borderRadius='lg'>
          <VStack>
            <Text fontSize='32px' as='b' color="white">ChatYuk</Text>
            <Text fontSize='24px' mb="1rem" color="white">Register</Text>
            <LoadingModal isRedirect={isRedirect}/>
            {/* <button onClick={test}>Test</button> */}
            {err && <Text color="red.500" mb="1rem" bgColor="rgba(255,255,255, 0.5)" px="1rem" borderRadius="md" fontWeight="bold">{err}</Text>}
            <form onSubmit={handleSubmit}>
                <FormControl>
                  <Stack spacing='3' mb="1rem">
                    <Input type="text" color="white" placeholder="Nama Akun"  height='48px' width='322px' variant="outline"
                    focusBorderColor='lime'/>
                    {isValidEmail ? <Text fontSize='14px' color="red">Email tidak valid</Text> 
                    : isValidEmail === false ? <Text fontSize='14px' color="#94FDB9">Email valid</Text>
                    : null}
                    <Input type="email" color="white" height='48px' width='322px' variant="outline" placeholder="email"
                    onChange={(e) => handleEmail(e)} value={email} focusBorderColor={!isValidEmail ? "lime" : "crimson"}/>
                    {passLength ? <Text fontSize='14px' color="red">Password harus lebih dari 6 karakter</Text> 
                    : passLength === false ? <Text fontSize='14px' color="#94FDB9">Password harus lebih dari 6 karakter</Text> 
                    : null}
                    <Input type="password" color="white" height='48px' width='322px' variant="outline" placeholder='password' 
                    onChange={(e) => handlePass(e)} value={password} focusBorderColor={!passLength ? "lime" : "crimson"}/>
                  </Stack>
                    <VisuallyHidden>
                      <Input type="file" id='file' onChange={handleImg}/>
                    </VisuallyHidden> 
                    <label htmlFor='file' >
                      <Center>
                        <HStack>
                          {selectedFile ? <Image src={preview} alt="profile" boxSize="50px" borderRadius="full" /> :
                          <PlusSquareIcon w={50} h={50} />}
                          <Text fontSize='16px' color="white">Upload Foto Profil kamu</Text>
                        </HStack>
                      </Center>
                    </label>   
                    <Center mt="1rem">
                      <Button height='48px' width='155px' colorScheme='blue' type='submit'>Sign up</Button>
                    </Center>       
                </FormControl>
              </form>

              <Text fontSize='14px' mt="1rem" pb="1rem" color="white">Sudah punya akun? 
                <Text as='b' color="teal.200">
                  <Link to='/login'> Log in</Link>
                </Text>
              </Text>
          </VStack>
        </Box>
        
      </Center>
    </Box>
  )
}

export default Register