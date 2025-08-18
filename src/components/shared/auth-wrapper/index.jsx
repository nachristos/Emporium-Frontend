import { useUser } from "../../../hooks/use-user";

const ADMIN_ACCESS_LEVEL = 2;
  
export const AuthWrapper = ({ children }) => {
  const { data: user } = useUser();

  if (!user || user.accessLevel !== ADMIN_ACCESS_LEVEL) {
    return null;
  }

  return <>{children}</>;
};