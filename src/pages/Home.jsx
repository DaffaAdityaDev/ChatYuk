import React from 'react'
import { signOut } from 'firebase/auth'
import { auth } from '../firebase'
import { Container, Grid, GridItem } from '@chakra-ui/react'
import Navbar from '../components/Navbar'
import Header from '../components/Header'
import Main from '../components/Main'
function Home() {
  return (
    <>
      <Grid
        templateAreas={`"nav header"
                        "nav main"
                        "nav main"`}
        gridTemplateRows={'50px 1fr'}
        gridTemplateColumns={'300px 1fr'}
        h='100vh'
        gap='0'
        color='blackAlpha.700'
        fontWeight='bold'
      >
        <GridItem bg='orange.300' area={'header'}>
          <Header />
        </GridItem>
        <GridItem bg='pink.300' area={'nav'}>
          <Navbar />
        </GridItem>
        <GridItem bg='green.300' area={'main'}>
          <Main />
        </GridItem>
      </Grid>
    </>
  )
}

export default Home