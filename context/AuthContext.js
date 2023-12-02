import React, { createContext, useContext, useState } from "react";

// Create a context
const AuthContext = createContext(null);

// Create a provider component
export const AuthProvider = ({ children }) => {
	const [auth, setAuth] = useState(null);

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
	return useContext(AuthContext);
};