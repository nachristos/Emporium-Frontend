import { useState } from "react";
import { Input } from "../../../components/shared/input";
import { ImageIcon } from "../../../assets/icons/image-icon";
import { UploadIcon } from "../../../assets/icons/upload-icon";
import { useMutate } from "../../../hooks/use-mutate";
import { Button } from "../../../components/shared/button";
import './index.css';

export const EditListing = ({ listing, onClose }) => {
  const [name, setName] = useState(listing.name);
  const [attributes, setAttributes] = useState(listing.attributes);
  const [category, setCategory] = useState(listing.category);
  const [description, setDescription] = useState(listing.description);
  const [picture, setPicture] = useState(null);
  
  const { update } = useMutate(`/listing/${listing._id}`);
  
  const handleFileChange = async (fileList) => {
    if (fileList) {
      const reader = new FileReader();
      reader.addEventListener('load', () => setPicture(reader.result), false);
      reader.readAsDataURL(fileList[0]);
    }
  };
  
  const handleUpdate = () => {
    update.mutate({
      ...listing,
      name,
      attributes,
      category,
      description,
      ...( picture && { picture })
    })
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
          <Input placeholder={'Name'} onChange={setName} value={name}  />
        </div>
        <div className="mb">
          <Input placeholder={'Attributes'} onChange={setAttributes} value={attributes}  />
        </div>
        <div className="mb">
          <Input placeholder={'Category'} onChange={setCategory} value={category}  />
        </div>
        <div className="mb">
          <Input placeholder={'Description'} onChange={setDescription} value={description}  />
        </div>
        <div className="flex between">
          <div>
            <Button variant="primary" className="w-full" onClick={handleUpdate}>
              Save Changes
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