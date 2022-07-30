import React, { useState } from "react";
import style from "../styles/card.module.css";
import { ICategory } from "../types/category.type";
import brokenImage from "../broken.png";
import { ButtonGroup, Button } from "@mui/material";

import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import EditIcon from "@mui/icons-material/Edit";
import DeleteModal from "./DeleteModal";
import EditModal from "./EditModal";

const Card = ({ created_at, description, id, image, name }: ICategory) => {
  const [hover, setHover] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showEdit, setShowEdit] = useState(false);

  const openEdit = () => {
    setShowEdit(true);
  };

  const closeEdit = () => {
    setShowEdit(false);
  };

  const handleShowModal = () => {
    setShowModal(true);
  };
  const handleClose = () => {
    setShowModal(false);
  };

  return (
    <section className={style.body} onMouseLeave={() => setHover(() => false)}>
      <div onMouseEnter={() => setHover(() => true)} className={style.imageBox}>
        <img alt="Category" src={image ? image : brokenImage} />
        {hover && (
          <div
            onMouseLeave={() => setHover(() => false)}
            className={style.overlay}
          >
            <ButtonGroup>
              <Button
                onClick={openEdit}
                startIcon={<EditIcon />}
                variant="contained"
                color="success"
              >
                Edit
              </Button>
              <Button
                onClick={handleShowModal}
                endIcon={<DeleteForeverIcon />}
                variant="contained"
                color="info"
              >
                Delete
              </Button>
            </ButtonGroup>
          </div>
        )}
      </div>
      <div className={style.bottom}>
        <p className={style.name}>
          Name: <span>{name}</span>
        </p>
        <p className={style.description}>
          Description: <span>{description}</span>
        </p>
        <p className={style.created_at}>
          Date created: <span>{created_at.split("T")[0]}</span>
        </p>
      </div>

      {showModal && <DeleteModal handleClose={handleClose} id={id} />}
      {showEdit && (
        <EditModal
          description={description}
          name={name}
          id={id}
          handleClose={closeEdit}
          image={image}
        />
      )}
    </section>
  );
};

export default Card;
