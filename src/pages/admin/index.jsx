import { Button } from "../../components/shared/button";
import { useUserContext } from "../../hooks/use-user-context";

export const AdminPage = () => {
  const { user } = useUserContext();
  
  return (
    <div className="scrollable">
      <div className="admin-page">
        <div className="w-full center">
          <h1 className="pri px">{`welcome, ${user?.alias}!`}</h1>
        </div>
        <div className="w-full center pt">
          <Button variant={"secondary"} onClick={() => location.pathname = '/admin/items'}>Manage Items</Button>
        </div>
      </div>
    </div>
  );
} 