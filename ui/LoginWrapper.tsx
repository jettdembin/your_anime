"use client";

import ReactDOM from "react-dom";

import { SignedOut } from "@clerk/nextjs";
import { useEffect, useRef, useState } from "react";

import useClickOutside from "@/hooks/useClickOutside";

import { SignIn, SignUp } from "@clerk/clerk-react";

interface FilterProps {
  children: any;
  signIn?: boolean;
  signUp?: boolean;
}

const LoginWrapper: React.FC<FilterProps> = ({ children, signIn, signUp }) => {
  const [isSigningIn, setIsSigningIn] = useState(false);
  const signUpFormRef = useRef(null);

  const toggleSignUpForm = () => {
    setIsSigningIn(!isSigningIn);
  };

  useClickOutside(signUpFormRef, toggleSignUpForm);

  // Use a state to hold the modal root element
  const [modalRoot, setModalRoot] = useState<Element | null>(null);

  useEffect(() => {
    // Set the modal root element once the component mounts
    setModalRoot(document.getElementById("modal-root"));
  }, []);

  const modalContent = isSigningIn && (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-gray-600 opacity-50"></div>
      <div className="relative z-10" ref={signUpFormRef}>
        {signIn && <SignIn />}
        {signUp && <SignUp />}
      </div>
    </div>
  );

  return (
    <SignedOut>
      <div onClick={() => setIsSigningIn(true)}>
        {children}
        {modalRoot &&
          modalContent &&
          ReactDOM.createPortal(modalContent, modalRoot)}
      </div>
    </SignedOut>
  );
};

export default LoginWrapper;
