import React from 'react'
import { signOut } from 'firebase/auth'
import { auth } from '../firebase'
function Home() {
  return (
    <div>
      <h1>Home</h1>
      <button onClick={() => signOut(auth)}>logout</button>
    </div>
  )
}

export default Home