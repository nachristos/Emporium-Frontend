import { Input } from "../../components/shared/input";
import { Button } from "../../components/shared/button";
import { useMemo, useState } from "react";
import { useMutate } from "../../hooks/use-mutate";
import { CardBase } from "../../components/shared/card-base";
import logo from '../../assets/logo.svg';
import './index.css';

export const Signup = () => {
  const [emailSent, setEmailSent] = useState(false);
  const { create } = useMutate(`/user`, () => {
    window.location.href = '/'; // Redirect to login after successful signup
    setEmailSent(true);
  });
  
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [alias, setAlias] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  
  const newPassword = useMemo(() => {
    if (password && confirmPassword && password === confirmPassword) {
      return password;
    }
    return '';
  }, [password, confirmPassword]);
  
  const disabled = useMemo(() => {
    return !firstName || !lastName || !alias || !email || (newPassword && (newPassword !== confirmPassword));
  }, [firstName, lastName, alias, email, newPassword, confirmPassword]);
  
  const handleCreate = () => {
    create({
      firstName,
      lastName,
      alias,
      email,
      accessLevel: 1, // TODO fix this on back-end
      ...(newPassword && { password: newPassword })
    })
  }
  
  return (
    <div className="scrollable container">
      <div className="w-full mb center">
        <img src={logo} className="logo" alt="Rd Nefario" />
      </div>
      { emailSent ? (
        <div className="email-sent text p mt">
          <img src={'mail.png'} alt="Rd Nefario" />
          <h2 className="sec mb">
            Email Sent!
          </h2>
          <h5 className="body center mb p">
            A verification code has been sent to your email, please check your junk mail if you don’t receive an email.
          </h5>
        </div>
      ) : (
      <CardBase>
        <div className="signup container center text p">
          <h2 className="title">
            Signup
          </h2>
          <h5 className="body mb">
            Enter your account info
          </h5>
          <div className="flex">
            <Input placeholder="First Name" value={firstName} onChange={setFirstName} />
            <div className="mxs" />
            <Input placeholder="Last Name" value={lastName} onChange={setLastName} />
          </div>
          <div className="w-full">
            <Input placeholder="Alias" value={alias} onChange={setAlias} />
          </div>
          <div className="w-full">
            <Input placeholder="Email" value={email} onChange={setEmail} />
          </div>
          <div className="flex w-full">
            <Input type="password" placeholder="Password" value={password} onChange={setPassword} />
          </div>
          <div className="flex w-full mb">
            <Input type="password" placeholder="Confirm Password" value={confirmPassword} onChange={setConfirmPassword} />
          </div>
          <div className="flex w-full mb">
            <Button  variant="primary" size="large" className="w-full" onClick={handleCreate} disabled={disabled}>
              Register
            </Button>
          </div>
          <div>
            <a href="/" className="w-full mb text">
              Go Back
            </a>
          </div>
        </div>
      </CardBase>
      )}
    </div>
  );
}