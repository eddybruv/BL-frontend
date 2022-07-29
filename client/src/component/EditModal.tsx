import axios from "axios";
import React, { ChangeEvent, useState } from "react";
import style from "../styles/editModal.module.css";
import { LoadingButton } from "@mui/lab";
import { Button, IconButton } from "@mui/material";

import DescriptionIcon from "@mui/icons-material/Description";
import DriveFileRenameOutlineIcon from "@mui/icons-material/DriveFileRenameOutline";

import Toast from "./misc/Toast";
import CustomInput from "./CustomInput";
import { Close } from "@mui/icons-material";

interface Props {
  id: number;
  name: string;
  description: string;
  image: string;
  handleClose: () => void;
}

const EditModal = ({ id, name, description, image, handleClose }: Props) => {
  const [loading, setLoading] = useState(false);
  const [errorToast, setErrorToast] = useState(false);
  const [info, setInfo] = useState({
    name,
    description,
  });
  const [newImage, setNewImage] = useState<File | undefined>(undefined);
  const [preview, setPreview] = useState(image);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setErrorToast(false);
    const { value, name } = e.target;
    setInfo({
      ...info,
      [name]: value,
    });
  };

  const handleImage = (e: ChangeEvent<HTMLInputElement>) => {
    setErrorToast(false);
    // @ts-ignore
    const image = e.target.files[0];
    setNewImage(image);
    setPreview(URL.createObjectURL(image));
  };

  const handleSubmit = async () => {
    setLoading(true);
    if (info.description === "" || info.name === "" || preview === "") {
      setErrorToast(true);
      setLoading(false);
      return;
    }

    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };

    const formData = new FormData();
    formData.append("name", info.name);
    formData.append("description", info.description);
    // @ts-ignore
    formData.append("image", newImage);

    await axios
      .put(`/api/category/update/${id}`, formData, config)
      .then(() => {
        setLoading(false);
        handleClose();
      })
      .catch(() => console.log("bad request"));
  };

  return (
    <section className={style.body}>
      <section className={style.content}>
        <header className={style.header}>
          <h2 className={style.h2}>Edit Category</h2>
          <IconButton onClick={() => handleClose()}>
            <Close fontSize="large" />
          </IconButton>
        </header>
        <div className={style.inputs}>
          <CustomInput
            handleChange={handleChange}
            value={info.name}
            placeholder="Category name"
            icon={<DriveFileRenameOutlineIcon />}
            name="name"
            type="tel"
          />
          <CustomInput
            handleChange={handleChange}
            value={info.description}
            placeholder="Description"
            icon={<DescriptionIcon />}
            name="description"
            type="tel"
          />
        </div>
        {preview && (
          <div className={style.selectImageBox}>
            <img src={preview} alt="" />
          </div>
        )}
        <div className={style.buttons}>
          <input
            onChange={handleImage}
            type="file"
            style={{ display: "none" }}
          />
          <Button
            variant="contained"
            color="secondary"
            // @ts-ignore
            onClick={() => document.querySelector("input[type=file]").click()}
          >
            Add new category image
          </Button>
          <LoadingButton
            loading={loading}
            onClick={handleSubmit}
            variant="contained"
          >
            Update category
          </LoadingButton>
        </div>{" "}
        {errorToast && (
          <Toast message="Not created! Check Input fields and internet connection and make sure to add image" />
        )}
      </section>
    </section>
  );
};

export default EditModal;
