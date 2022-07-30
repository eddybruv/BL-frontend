import React, { useState, ChangeEvent } from "react";
import Toast from "./misc/Toast";
import style from "../styles/newcat.module.css";
import CustomInput from "./CustomInput";

import DescriptionIcon from "@mui/icons-material/Description";
import DriveFileRenameOutlineIcon from "@mui/icons-material/DriveFileRenameOutline";
import { Button } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import axios from "axios";

const NewCat = () => {
  const [loading, setLoading] = useState(false);
  const [errorToast, setErrorToast] = useState(false);
  const [info, setInfo] = useState({
    name: "",
    description: "",
  });
  const [image, setImage] = useState<File | undefined>(undefined);
  const [preview, setPreview] = useState("");

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
    setImage(image);
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
    formData.append("image", image);

    await axios
      .post(
        "https://simplor.herokuapp.com/api/category/create",
        formData,
        config
      )
      .then(() => {
        setLoading(false);
        setPreview("");
        setInfo({
          name: "",
          description: "",
        });
      });
  };

  return (
    <section className={style.body}>
      <h2 className={style.h2}>Create a New Category</h2>
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
        <input onChange={handleImage} type="file" style={{ display: "none" }} />
        <Button
          variant="contained"
          color="secondary"
          // @ts-ignore
          onClick={() => document.querySelector("input[type=file]").click()}
        >
          Add category image
        </Button>
        <LoadingButton
          loading={loading}
          onClick={handleSubmit}
          variant="contained"
        >
          Submit category
        </LoadingButton>
      </div>{" "}
      {errorToast && (
        <Toast message="Not created! Check Input fields and internet connection and make sure to add image" />
      )}
    </section>
  );
};

export default NewCat;
