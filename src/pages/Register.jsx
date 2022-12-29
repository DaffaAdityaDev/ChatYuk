import React from 'react'
import { Input, FormControl, FormLabel, FormErrorMessage, 
    FormHelperText, Container, VStack, HStack, Text, Button,
    VisuallyHidden } from '@chakra-ui/react'

import { PhoneIcon, AddIcon, WarningIcon, PlusSquareIcon } from '@chakra-ui/icons'

function Register() {
  return (
    <Container>
        <VStack>
            <span className="logo">ChatYuk</span>
            <span className="title">Register</span>
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
                <Button colorScheme="blue">Sign up</Button>
                
            </FormControl>
            <p>You do have an account? Log in</p>
        </VStack>
    </Container>
  )
}

export default Register