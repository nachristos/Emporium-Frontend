import { useState } from "react";
import { Input } from "../../../components/shared/input";
import { ImageIcon } from "../../../assets/icons/image-icon";
import { UploadIcon } from "../../../assets/icons/upload-icon";
import { useMutate } from "../../../hooks/use-mutate";
import { Button } from "../../../components/shared/button";
import './index.css';
import { useQueryClient } from "@tanstack/react-query";

export const EditItem = ({ item, onClose }) => {
  const [name, setName] = useState(item.name);
  const [attributes, setAttributes] = useState(item.attributes);
  const [category, setCategory] = useState(item.category);
  const [description, setDescription] = useState(item.description);
  const [picture, setPicture] = useState(null);
  const queryClient = useQueryClient();
  
  const { update } = useMutate(`/item/${item._id}`, () => queryClient.invalidateQueries(['items']));
  
  const handleFileChange = async (fileList) => {
    if (fileList) {
      const reader = new FileReader();
      reader.addEventListener('load', () => setPicture(reader.result), false);
      reader.readAsDataURL(fileList[0]);
    }
  };
  
  const handleUpdate = () => {
    update({
      ...item,
      name,
      attributes,
      category,
      description,
      ...( picture && { picture })
    })
    onClose();
  }
  
  return (
    <div className="w-full item-edit">
      <div className="mb center item-image">
        <div className="border-pri wrapper" onClick={() => document.querySelector('input[type="file"]').click()}>
          {picture || item.imgURL ? (
            <img src={picture || item.imgURL} />
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
          <Input placeholder={'Attributes'} onChange={setAttributes} value={attributes}  />
          <Input placeholder={'Category'} onChange={setCategory} value={category}  />
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