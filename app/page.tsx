"use client"

import { signIn, signOut, useSession } from "next-auth/react";

export default function Home() {
  const session = useSession();
  if(session.data===null){
    return <button onClick={()=>signIn()}>Login</button>
  }
  return (
    <div>
      <button onClick={()=>signOut()}>SignOut</button>

      {JSON.stringify(session?.data?.user?.name)}
    </div>
  );
}
