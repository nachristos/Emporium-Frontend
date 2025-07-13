import { useEffect, useState } from "react"
import { Button } from "../../components/shared/button"
import { CardBase } from "../../components/shared/card-base"
import { Input } from "../../components/shared/input"
import logo from '../../assets/logo.svg'
import './index.css'
import { post } from "../../utils/fetch-client"
import { useAuthContext } from "../../hooks/use-auth-context"

const HIDDEN_PAGES = ['/login']

export const Login = () => {
  const { setAuth } = useAuthContext();
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  
  useEffect(() => {
    // Hide the navigation bar when on the login page
    const nav = document.getElementById('nav');
    if (nav && HIDDEN_PAGES.includes(window.location.pathname)) {
      nav.style.display = 'none';
    }
  }, []);
  
  const handleSubmit = () => {
    post('/auth/signin', {
      email,
      password,
    }).then((data) => {
      if (data.accessToken) {
        setAuth(data);
      } else {
        alert('Login failed. Please check your credentials.');
      }
    });
    
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
              <div className="w-full mb">
              <Input type="email" placeholder="Email" onChange={setEmail} />
              </div>
              <div className="w-full">
                <Input type="password" placeholder="Password" onChange={setPassword} />
              </div>
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