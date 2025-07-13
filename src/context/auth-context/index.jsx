import { createContext } from "react";

export const AuthContext = createContext({
  token: undefined,
  userId: undefined,
  accessLevel: undefined,
  setAuth: () => {},
});