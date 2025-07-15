import { CardBase } from "../../components/shared/card-base";
import { useItems } from "../../hooks/use-items";

export const Home = () => {
  const { data, isLoading } = useItems();
  
    if (!data && isLoading) {
    return <div>Loading user context...</div>;
  }
  
  return (
    <div className="scrollable">
      <div className="w-full wrap center">
        {data.map(item => (
          <div className="p">
            <CardBase>
              <div className="">
                <img src="/weapon.png" />
              </div>
              <h2 className="strong text mb p">
                {item.name}
              </h2>
            </CardBase>
          </div>
        ))}
      </div>
    </div>
  );
}