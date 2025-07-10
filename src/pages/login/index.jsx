import { useEffect } from "react"
import { Button } from "../../components/shared/button"
import { CardBase } from "../../components/shared/card-base"
import { Input } from "../../components/shared/input"
import './index.css'

export const Login = () => {
  
  useEffect(() => {
    // Hide the navigation bar when on the login page
    const nav = document.getElementById('nav');
    if (nav) {
      nav.style.display = 'none';
    }
  }, []);
  
  const handleSubmit = () => {
    window.location.href = '/home';
  }
  
  return (
    <div className="scrollable">
      <div className="login-wrapper">
        <div className="w-full mb center">
          <img src="./src/assets/logo.svg" className="logo" alt="Rd Nefario" />
        </div>
          <CardBase>
            <div className="login container center">
              <h2 className="title">
                Login
              </h2>
              <h5>
                Enter you email and password
              </h5>
              <div className="w-full p">
                <div className="w-full mb">
                <Input type="email" placeholder="Email" />
                </div>
                <div className="w-full">
                  <Input type="password" placeholder="Password" />
                </div>
              </div>
              <div>
                <a href="/forgot-password" className="w-full mb">
                  Forgot password?
                </a>
              </div>
              <div className="w-full p">
                <Button variant="primary" size="large" className="w-full" onClick={handleSubmit}>
                  Login
                </Button>
              </div>
              <div>
                <a href="/register" className="w-full mb">
                  Register
                </a>
              </div>
            </div>
          </CardBase>
        </div>
      </div>
  )
}