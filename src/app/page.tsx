"use client"

import {signIn, useSession, signOut} from 'next-auth/react'

export default function Home() {
  const {data} = useSession()

  return (
    <div>
      <button  onClick={()=> signIn()}>Login</button>
      <button  onClick={()=> signOut()}>Logout</button>
      <h1>{data?.user?.email}</h1>
    </div>
  )
}
