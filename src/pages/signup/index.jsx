import { Input } from "../../components/shared/input";
import { Button } from "../../components/shared/button";
import { useMemo, useState } from "react";
import { useMutate } from "../../hooks/use-mutate";
import { CardBase } from "../../components/shared/card-base";
import logo from '../../assets/logo.svg';
import './index.css';

export const Signup = () => {
  const { create } = useMutate(`/user`);
  
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
    create.mutate({
      firstName,
      lastName,
      alias,
      email,
      accessLevel: 1, // TODO fix this on back-end
      ...(newPassword && { password: newPassword })
    }).then(response => {
      if (response.ok) {
        alert('Profile updated successfully!');
      } else {
        alert('Failed to update profile.');
      }
    })
  }
  
  return (
    <div className="profile scrollable container">
              <div className="w-full mb center">
                <img src={logo} className="logo" alt="Rd Nefario" />
              </div>
      <CardBase>
        <div className="signup container center text p">
          <h2 className="title">
            Signup
          </h2>
          <h5 className="body mb">
            Enter your account info
          </h5>
          <div className="flex mb">
            <Input placeholder="First Name" value={firstName} onChange={setFirstName} />
            <div className="mxs" />
            <Input placeholder="Last Name" value={lastName} onChange={setLastName} />
          </div>
          <div className="w-full mb">
            <Input placeholder="Alias" value={alias} onChange={setAlias} />
          </div>
          <div className="w-full mb">
            <Input placeholder="Email" value={email} onChange={setEmail} />
          </div>
          <div className="flex w-full mb">
            <Input type="password" placeholder="Password" value={password} onChange={setPassword} />
          </div>
          <div className="flex w-full mb">
            <Input type="password" placeholder="Confirm Password" value={confirmPassword} onChange={setConfirmPassword} />
          </div>
          <div className="flex w-full between">
              <Button href="/login" variant="secondary" className="w-full" onClick={() => window.location.pathname = '/'}>
                Login
              </Button>
              <Button  variant="primary" className="w-full" onClick={handleCreate} disabled={disabled}>
                Create account
              </Button>
          </div>
        </div>
      </CardBase>
    </div>
  );
}