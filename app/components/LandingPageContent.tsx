"use client";

import { useEffect } from "react";

import { useAuth } from "@clerk/nextjs";

import { useAuthContext } from "@/context/AuthContext";

type Props = {
  children: React.ReactNode;
};

const LandingPageContent = ({ children }: Props) => {
  const { userId, isLoaded, isSignedIn } = useAuth();

  const { setAuth, auth } = useAuthContext();

  useEffect(() => {
    if (isSignedIn && isLoaded && auth?.id !== userId) {
      setAuth(userId);
      debugger;
    }
  }, [isSignedIn, isLoaded, userId]);

  return <div>{children}</div>;
};

export default LandingPageContent;
