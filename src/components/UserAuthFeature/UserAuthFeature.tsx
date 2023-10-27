"use client";

import React, { useState } from "react";
import { signIn, signOut, useSession } from "next-auth/react";
import SignUpModalFeature from "../SignUpModalFeature/SignUpModalFeature";
import UserAuthUI from "../UserAuthUI/UserAuthUI";

function UserAuthFeature() {
   const [isModalOpen, setIsModalOpen] = useState(false);

   const { data: session } = useSession();
   const userImageExists = session && session.user.image ? session.user.image : false;

   const handleSignUpModal = () => {
      setIsModalOpen((prev) => !prev);
   };

   const handleSignIn = () => {
      signIn();
   };

   const handleSignOut = () => {
      signOut();
   };

   return (
      <>
         <SignUpModalFeature isModalOpen={isModalOpen} handleSignUpModal={handleSignUpModal} />
         <UserAuthUI
            userImageExists={userImageExists}
            sessionData={session}
            handleSignIn={handleSignIn}
            handleSignOut={handleSignOut}
            handleSignUpModal={handleSignUpModal}
         />
      </>
   );
}

export default UserAuthFeature;
