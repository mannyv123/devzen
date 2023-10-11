"use client";

import React from "react";
import { signIn, signOut, useSession } from "next-auth/react";

function AuthTest() {
   const { data: session } = useSession();

   if (session) {
      return <div onClick={() => signOut()}>Logout user {session.user?.name}</div>;
   }

   return <div onClick={() => signIn()}>Login</div>;
}

export default AuthTest;
