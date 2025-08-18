import { useState } from "react";
import { Input } from "../../../components/shared/input";
import { ImageIcon } from "../../../assets/icons/image-icon";
import { UploadIcon } from "../../../assets/icons/upload-icon";
import { useMutate } from "../../../hooks/use-mutate";
import { Button } from "../../../components/shared/button";
import './index.css';
import { useQueryClient } from "@tanstack/react-query";

export const EditItem = ({ item, onClose, onUpdate }) => {
  const [name, setName] = useState(item?.name || '');
  const [attributes, setAttributes] = useState(item?.attributes || '');
  const [category, setCategory] = useState(item?.category || '');
  const [description, setDescription] = useState(item?.description || '');
  const [price, setPrice] = useState(item?.price || 0);
  const [stock, setStock] = useState(item?.stock || 0);
  const [picture, setPicture] = useState(null);
  const queryClient = useQueryClient();
  
  const { update, create: post, destroy } = useMutate(`/item/${item._id || ''}`, resp => {
    queryClient.invalidateQueries(['items']);
    onUpdate(resp.slug);
  });
  
  const disabled = !name || !category || !description || !price || !stock;
  
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
    if(item?._id) {
    update({
      ...item,
      name,
      attributes,
      category,
      description,
      price,
      stock,
      ...( picture && { picture })
    })
    } else {
      post({
        name,
        attributes,
        category,
        description,
        price,
        stock,
        picture
      });
    }
    onClose();
  }
  
  return (
    <div className="w-full item-edit">
      <div className="w-full wrap center mb">
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
        <div className="info px">
          <div className="mb">
            <Input placeholder={'Name'} onChange={setName} value={name}  />
            <Input placeholder={'Category'} onChange={setCategory} value={category}  />
            <div className="flex">
              <Input placeholder={'Price in cents'} onChange={value => setPrice(Number(value))} value={price} type="number" />
              <div className="mxs" />
              <Input placeholder={'Stock'} onChange={value => setStock(value)} value={stock} type="number" />
            </div>
            <Input type="textbox" placeholder={'Attributes'} onChange={setAttributes} value={attributes}  />
            <Input type="textbox" placeholder={'Description'} onChange={setDescription} value={description}  />
          </div>
          <div className="flex between">
            { item?._id && (
            <div>
              <Button variant="primary" className="w-full" onClick={handleDelete}>
                Delete
              </Button>
            </div>
            )}
            <div>
              <Button disabled={disabled} variant="primary" className="w-full" onClick={handleSubmit}>
                {item?._id ? 'Save Changes' : 'Add Item'}
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
    </div>  
  )
}