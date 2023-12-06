"use client";

import { useEffect } from "react";

import { useAuth } from "@clerk/nextjs";

import { useAuthContext } from "@/context/AuthContext";

type Props = {};

const LandingPageContent = ({ children }) => {
  const { setAuth, auth } = useAuthContext();
  const { userId, isLoaded, isSignedIn } = useAuth();

  useEffect(() => {
    if (isSignedIn && isLoaded && auth?.id !== userId) {
      setAuth(userId);
      debugger;
    }
  }, [isSignedIn, isLoaded, userId]);

  return <div>{children}</div>;
};

export default LandingPageContent;