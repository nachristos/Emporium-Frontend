import { useState } from "react";
import { AuthContext } from ".";
import { jwtDecode } from "jwt-decode";
import { useValidate } from "../../hooks/use-validate";

export const AuthContextProvider = ({ children}) => {
  const [token, setToken] = useState(localStorage.getItem('token') || undefined);
  const { isError } = useValidate(token);
  
  if (isError) {
    localStorage.removeItem('token');
    setToken(undefined);
    return null; // or redirect to login page
  }

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