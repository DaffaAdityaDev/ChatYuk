import React from 'react'
import { Container, Center, Text, Stack, Input, Button, FormControl } from '@chakra-ui/react'
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
    <Container>
      <Center display='flex' height='100vh' justifyContent='center' alignItems='center' flexDirection='column' gap='20px'>
        <Text fontSize='32px' as='b'>ChatYuk</Text>
        <Text fontSize='24px'>Login</Text>
        <form onSubmit={handleSubmit}>
          <FormControl>
            <Stack spacing='3'>
              <Input type="email" height='48px' width='322px' placeholder='Alamat Email' />
              <Input type="password" height='48px' width='322px' placeholder='Password' />
            </Stack>
            <Button height='48px' width='155px' colorScheme='blue' type='submit'>Sign In</Button>
          </FormControl>
        </form>
        <Text fontSize='14px'>Tidak punya akun? <Link to='/register'>Daftar Sekarang</Link></Text>
      </Center>
    </Container>
  )
}
 
export default Login