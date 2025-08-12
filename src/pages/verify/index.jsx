import { useParams } from "react-router-dom";
import { useMutate } from "../../hooks/use-mutate";
import { useEffect, useState } from "react";
import { Loader } from "../../components/shared/loader";

export const VerifyPage = () => {
  const [verified, setVerified] = useState(false);
  const { token } = useParams();
  const { create } = useMutate(`/auth/verify`, () => {
    console.log("Verification successful");
    setVerified(true);
  });
  
  useEffect(() => {
    if (token && !verified) {
      create({ token });
    }
  }, [token, create, verified]);
  
  if (!verified) {
    return (<Loader />);
  }
  
  return (
    <div className="flex col center h-full">
      <div>
        <h1 className="pri">Your account has been verified!</h1>
        <a href="/">Go to Login</a>
      </div>
    </div>
  );
}