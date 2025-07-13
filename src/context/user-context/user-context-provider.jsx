import { useUser } from "../../hooks/use-user";
import { Login } from "../../pages/login";
import { UserContext } from ".";
import { useAuthContext } from "../../hooks/use-auth-context";

export const UserContextProvider = ({ children}) => {
  const { token } = useAuthContext();
  const { data: user, isLoading, error } = useUser();
  
  if (!user && !token) {
    return <Login />;
  }

  if (token && isLoading) {
    return <div>Loading user context...</div>;
  }
  
  if (error) {
    return <div>Error: {error.message}</div>;
  } 
  
  return (
    <UserContext.Provider value={{ user }}>
        {children}
    </UserContext.Provider>
  );
}