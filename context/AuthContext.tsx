import React, { createContext, useContext, useState, ReactNode } from "react";

// Define the type for the context value
type AuthContextType = {
  auth: any; // Replace 'any' with the actual type of your auth state
  setAuth: React.Dispatch<React.SetStateAction<any>>; // Replace 'any' with the actual type of your auth state
};

// Create a context with a default value
const AuthContext = createContext<AuthContextType | null>(null);

type AuthProviderProps = {
  children: ReactNode;
};

// Create a provider component
export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [auth, setAuth] = useState<any>(null); // Replace 'any' with the actual type of your auth state

  return (
    <AuthContext.Provider
      value={{
        auth,
        setAuth,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Create a hook to use the auth context
export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (context === null) {
    throw new Error("useAuthContext must be used within an AuthProvider");
  }
  return context;
};
