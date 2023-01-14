import React, { useState } from 'react'
import { Container, Center, Text, Stack, Input, Button, FormControl, Box } from '@chakra-ui/react'
import { useNavigate, Link } from 'react-router-dom';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from '../firebase';

function Login() {
  const navigate = useNavigate();
  const [password, setPassword] = useState("")
  const [passLength, setpassLength] = useState()
  const [email, setEmail] = useState("")
  const [isValidEmail, setIsValidEmail] = useState()
  const [err, setErr] = useState()
    // TODO: useState for error
    
    const handleSubmit = async(e) => {
        e.preventDefault()
        const email = e.target[0].value
        const password = e.target[1].value
        // console.log(email, password)

        try {
          await signInWithEmailAndPassword(auth, email, password)
          navigate("/")
        } catch (error) {
          // console.log(error)
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


  
  return (
    <Box bgGradient='linear(to-r, #009FFF, #ec2F4B)' >
      <Center display='flex' height='100vh' width="100vw" justifyContent='center' alignItems='center' flexDirection='column' >
        <Box w="400px" h="fit-content" bgColor="rgba(255,255,255, 0.15)" blur="5px" borderRadius='lg'>
          <Box backdropFilter='auto' backdropBlur='20px' borderWidth='1px' borderRadius='lg'>
            <Center display="flex" flexDir="column">
              <Text fontSize='32px' as='b' color="white">ChatYuk</Text>
              <Text fontSize='24px' mb="1rem" color="white">Login</Text>
              {err && <Text color="red.500" mb="1rem" bgColor="rgba(255,255,255, 0.5)" px="1rem" borderRadius="md" fontWeight="bold">{err}</Text>}
              <form onSubmit={handleSubmit}>
                <FormControl>
                  <Stack spacing='3'>
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