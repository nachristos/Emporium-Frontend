import { useState } from "react";
import { Input } from "../../../components/shared/input";
import { ImageIcon } from "../../../assets/icons/image-icon";
import { UploadIcon } from "../../../assets/icons/upload-icon";
import { useMutate } from "../../../hooks/use-mutate";
import { Button } from "../../../components/shared/button";
import './index.css';
import { useQueryClient } from "@tanstack/react-query";
import { useItems } from "../../../hooks/use-items";

export const EditListing = ({ listing, onClose, onUpdate }) => {
  const [itemId, setItemId] = useState(listing?.itemId || '');
  const [type, setType] = useState(listing?.type || '');
  const [picture, setPicture] = useState(null);
  const queryClient = useQueryClient();
  const { data } = useItems(); 
  
  const { update, create: post, destroy } = useMutate(`/listing/${listing._id || ''}`, resp => {
    queryClient.invalidateQueries(['listings']);
    onUpdate(resp.slug);
  });

  const disabled = !itemId || !type;
  
  const handleFileChange = async (fileList) => {
    if (fileList) {
      const reader = new FileReader();
      reader.addEventListener('load', () => setPicture(reader.result), false);
      reader.readAsDataURL(fileList[0]);
    }
  };

  const handleDelete = () => {
    destroy();
    onClose();
  }
  
  const handleSubmit = () => {
    if(listing?._id) {
    update({
      ...listing,
      type,
      ...( picture && { picture })
    })
    } else {
      post({
        itemId,
        type,
        picture
      });
    }
    onClose();
  }
  
  return (
    <div className="w-full listing-edit">
      <div className="mb center listing-image">
        <div className="border-pri wrapper" onClick={() => document.querySelector('input[type="file"]').click()}>
          {picture || listing.imgURL ? (
            <img src={picture || listing.imgURL} />
          ) : (
            <>
              <ImageIcon className="placeholder" />
              <h1 className="pri strong">
                UPLOAD IMAGE
                <UploadIcon />
              </h1>
            </>
          )}
          <input type="file" hidden onChange={e => handleFileChange(e.target.files)} />
        </div>
      </div>
      <div className="p">
        <div className="mb">
          { listing?._id && (
            <div>
              <Input placeholder={'Name'} value={listing.itemId.name} readonly />
            </div>
          ) ||
            <select className="filter" name="cars" id="cars" onChange={v => setItemId(v.currentTarget.value)}>
              {data.map(item => (
                <option value={item._id}>{item.name}</option>
              ))}
            </select>
          }
        </div>
        <div className="mb">
          <Input placeholder={'Type'} onChange={setType} value={type}  />
        </div>
        <div className="flex between">
            { listing?._id && (
            <div>
              <Button variant="primary" className="w-full" onClick={handleDelete}>
                Delete
              </Button>
            </div>
            )}
            <div>
              <Button disabled={disabled} variant="primary" className="w-full" onClick={handleSubmit}>
                {listing?._id ? 'Save Changes' : 'Create Ad'}
              </Button>
            </div>
            <div>
              <Button variant="secondary" className="w-full" onClick={onClose}>
                Cancel
              </Button>
            </div>
          </div>
      </div>
    </div>  
  )
}