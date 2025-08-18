import { useEffect, useState } from "react"
import { Button } from "../../components/shared/button"
import { CardBase } from "../../components/shared/card-base"
import { Input } from "../../components/shared/input"
import logo from '../../assets/logo.svg'
import './index.css'
import { useAuthContext } from "../../hooks/use-auth-context"
import { useMutate } from "../../hooks/use-mutate"

const HIDDEN_PAGES = ['/login']

export const Login = ({ redirect }) => {
  const { token, setAuth } = useAuthContext();
  const [email, setEmail] = useState('')
  const [error, setError] = useState('')
  const [password, setPassword] = useState('')
  const { create } = useMutate('/auth/signin', 
    (data) => {
      if (data.accessToken) {
        setAuth(data);
      } else {
        setError('Login failed. Please check your credentials.');
      }
    },
    (error) => {
      setError(error.message);
    }
  );

  useEffect(() => {
    // Hide the navigation bar when on the login page
    const nav = document.getElementById('nav');
    if (nav && HIDDEN_PAGES.includes(window.location.pathname)) {
      nav.style.display = 'none';
    }
  }, []);
    
  if (redirect && token) {
      window.location.pathname = '/home'
  }
  
  
  const handleSubmit = () => {
    create(
      {
        email,
        password,
      }
    )
  }
  
  if (token) {
    return <div>Lodaing...</div>
  }
  
  return (
    <div className="scrollable">
      <div>
        <div className="w-full mb center">
          <img src={logo} className="logo" alt="Rd Nefario" />
        </div>
        <CardBase>
          <div className="login container center text">
            <h2 className="title">
              Login
            </h2>
            <h5 className="body">
              Enter you email and password
            </h5>
            <div className="w-full p">
              <Input type="email" placeholder="Email" onChange={setEmail} alert={error} onClick={() => setError('')} />
              <Input type="password" placeholder="Password" onChange={setPassword} onClick={() => setError('')} />
            </div>
            <div>
              <a href="/forgot-password" className="w-full mb text">
                Forgot password?
              </a>
            </div>
            <div className="w-full p">
              <Button variant="primary" size="large" className="w-full" onClick={handleSubmit}>
                Login
              </Button>
            </div>
            <div>
              <a href="/register" className="w-full mb text">
                Register
              </a>
            </div>
          </div>
        </CardBase>
      </div>
    </div>
  )
}