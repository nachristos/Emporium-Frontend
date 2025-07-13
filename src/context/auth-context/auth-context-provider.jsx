import { useState } from "react";
import { AuthContext } from ".";
import { jwtDecode } from "jwt-decode";

export const AuthContextProvider = ({ children}) => {
  const [token, setToken] = useState(localStorage.getItem('token') || undefined);

  const setAuth = (authResponse) => {
    console
    if (authResponse?.accessToken) {
      localStorage.setItem('token', authResponse.accessToken);
      setToken(authResponse.accessToken);
    } else {
      localStorage.removeItem('token');
      setToken(undefined);
    }
  }

  const value = {
    token,
    userId: token ? jwtDecode(token)?._id : undefined,
    setAuth,
  };
  
  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}