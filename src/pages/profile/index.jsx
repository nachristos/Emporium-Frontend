import { ImageIcon } from "../../assets/icons/image-icon";
import { Input } from "../../components/shared/input";
import { Button } from "../../components/shared/button";
import './index.css';
import { UploadIcon } from "../../assets/icons/upload-icon";
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
    update.mutate({
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
        <div className="profile scrollable container">
          <div className="mb center">
            <div className="border-pri user-icon-wrapper">
              <ImageIcon className="user-icon-placeholder" />
              <h1 className="pri strong">
                UPLOAD IMAGE
                <UploadIcon />
              </h1>
            </div>
          </div>
          <div className="flex mb">
            <Input placeholder="First Name" value={firstName} onChange={setFirstName} />
            <div className="mxs" />
            <Input placeholder="Last Name" value={lastName} onChange={setLastName} />
          </div>
          <div className="flex mb">
            <Input placeholder="Alias" value={alias} onChange={setAlias} />
          </div>
          <div className="flex mb">
            <Input placeholder="Email" value={email} onChange={setEmail} />
          </div>
          <div className="flex mb">
            <Input type="password" placeholder="New Password" value={password} onChange={setPassword} />
          </div>
          <div className="flex mb">
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