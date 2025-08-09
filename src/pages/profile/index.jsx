import { Input } from "../../components/shared/input";
import { Button } from "../../components/shared/button";
import './index.css';
import { useMemo, useState } from "react";
import { useMutate } from "../../hooks/use-mutate";
import { useUserContext } from "../../hooks/use-user-context";

export const Profile = () => {
  const { user } = useUserContext();
  const { update } = useMutate(`/user/${user._id}`);
  
  const [firstName, setFirstName] = useState(user?.firstName || '');
  const [lastName, setLastName] = useState(user?.lastName || '');
  const [alias, setAlias] = useState(user?.alias || '');
  const [email, setEmail] = useState(user?.email || '');
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
  
  const handleUpdate = () => {
    update({
      firstName,
      lastName,
      alias,
      email,
      ...(newPassword && { password: newPassword })
    }).then(response => {
      if (response.ok) {
        alert('Profile updated successfully!');
      } else {
        alert('Failed to update profile.');
      }
    })
  }
  
  const setCancel = () => {
    setFirstName(user.firstName);
    setLastName(user.lastName);
    setAlias(user.alias);
    setEmail(user.email);
    setPassword('');
    setConfirmPassword('');
  }
  
  return (
        <div className="profile scrollable container w-full h-full middle">
          <div className="mb">
            <Input placeholder="First Name" value={firstName} onChange={setFirstName} />
            <Input placeholder="Last Name" value={lastName} onChange={setLastName} />
            <Input placeholder="Alias" value={alias} onChange={setAlias} />
            <Input placeholder="Email" value={email} onChange={setEmail} />
            <Input type="password" placeholder="New Password" value={password} onChange={setPassword} />
            <Input type="password" placeholder="Confirm Password" value={confirmPassword} onChange={setConfirmPassword} />
          </div>
          <div className="flex between">
            <div>
              <Button variant="primary" className="w-full" onClick={handleUpdate} disabled={disabled}>
                Save Changes
              </Button>
            </div>
            <div>
              <Button variant="secondary" className="w-full" onClick={setCancel}>
                Cancel
              </Button>
            </div>
          </div>
        </div>
  );
}