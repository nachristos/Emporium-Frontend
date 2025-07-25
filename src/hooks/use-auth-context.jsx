import { useContext } from "react";
import { AuthContext } from "../context/auth-context";

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  return context;
};