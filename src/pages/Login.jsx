import React from 'react'
import { Container, Center, Text, Stack, Input, Button, Link } from '@chakra-ui/react'

function Login() {
  return (
    <Container>
      <Center display='flex' height='100vh' justifyContent='center' alignItems='center' flexDirection='column' gap='20px'>
        <Text fontSize='32px' as='b'>ChatYuk</Text>
        <Text fontSize='24px'>Login</Text>
        <Stack spacing='3'>
          <Input height='48px' width='322px' placeholder='Alamat Email' />
          <Input height='48px' width='322px' placeholder='Password' />
        </Stack>
        <Button height='48px' width='155px' colorScheme='blue'>Sign In</Button>
        <Text fontSize='14px'>Tidak punya akun? <Link color='#9C30B7' href='#'>Daftar Sekarang</Link></Text>
      </Center>
    </Container>
  )
}
 
export default Login