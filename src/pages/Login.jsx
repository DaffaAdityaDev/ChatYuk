import React from 'react'
import { Container, Center, Text, Stack, Input, Button, FormControl, Box } from '@chakra-ui/react'
import { useNavigate, Link } from 'react-router-dom';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from '../firebase';

function Login() {
  const navigate = useNavigate();
    // TODO: useState for error
    
    const handleSubmit = async(e) => {
        e.preventDefault()
        const email = e.target[0].value
        const password = e.target[1].value
        console.log(email, password)

        try {
          await signInWithEmailAndPassword(auth, email, password)
          navigate("/")
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
    <Box bgGradient='linear(to-r, #009FFF, #ec2F4B)' >
      <Center display='flex' height='100vh' width="100vw" justifyContent='center' alignItems='center' flexDirection='column'>
        <Box w="400px" h="fit-content" bgColor="rgba(255,255,255, 0.15)" blur="5px">
          <Box backdropFilter='auto' backdropBlur='20px'>
            <Center display="flex" flexDir="column">
              <Text fontSize='32px' as='b' color="white">ChatYuk</Text>
                <Text fontSize='24px' mb="1rem" color="white">Login</Text>
                <form onSubmit={handleSubmit}>
                  <FormControl>
                    <Stack spacing='3'>
                      <Input type="email" height='48px' width='322px' placeholder='Alamat Email' variant="filled"/>
                      <Input type="password" height='48px' width='322px' placeholder='Password' variant="filled"/>
                    </Stack>
                    <Center pt="2rem">
                      <Button height='48px' width='155px' colorScheme='blue' type='submit'>Sign In</Button>
                    </Center>
                  </FormControl>
                </form>
              <Text fontSize='14px' mt="1rem" mb="1rem" color="white">Tidak punya akun? 
                <Text as='b' color="teal.200">
                  <Link to='/register'> Daftar Sekarang</Link>
                </Text > 
                </Text>
            </Center>
          </Box>
        </Box>
      </Center>
    </Box>
  )
}
 
export default Login