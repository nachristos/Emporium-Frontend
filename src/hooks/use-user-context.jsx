import { useContext } from "react";
import { UserContext } from "../context/user-context";

export const useUserContext = () => {
  const context = useContext(UserContext);
  return context;
};