import React from 'react'
import { signOut } from 'firebase/auth'
import { auth } from '../firebase'
import { Box, Container, Grid, GridItem } from '@chakra-ui/react'
import Navbar from '../components/Navbar'
import Header from '../components/Header'
import Main from '../components/Main'
import InputText from '../components/InputText'
function Home() {
  return (
    <>
      <Grid
        templateAreas={`"nav header"
                        "nav main"
                        "nav main"
                        "nav input"`}
        gridTemplateRows={'55px calc(90vh - 55px)'}
        gridTemplateColumns={'20vh auto'}
        color='blackAlpha.700'
        fontWeight='bold'
      >
        <GridItem bg='gray.800' boxShadow="base" area={'header'} >
          <Header />
        </GridItem>
        <GridItem bg='gray.900' area={'nav'}>
          <Navbar />
        </GridItem>
        <GridItem bg='gray.700' area={'main'} overflow="auto">
          <Box height="100px">
            <Main />
          </Box>
        </GridItem>
        
        <GridItem bg='gray.700' area={'input'} overflow="auto">
          <Box height="100px">
            <InputText />
          </Box>
        </GridItem>
      </Grid>
    </>
  )
}

export default Home