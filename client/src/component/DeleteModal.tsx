import React from "react";
import style from "../styles/deleteModal.module.css";

import axios from "axios";
import { Button, ButtonGroup } from "@mui/material";

import TaskAltIcon from "@mui/icons-material/TaskAlt";
import CancelIcon from "@mui/icons-material/Cancel";

interface Props {
  handleClose: () => void;
  id: number;
}

const DeleteModal = ({ id, handleClose }: Props) => {
  const handleDelete = async () => {
    await axios.delete(`/api/category/delete/${id}`);
    handleClose();
  };

  return (
    <section onClick={() => handleClose()} className={style.body}>
      <div className={style.content}>
        <h3>Delete category?</h3>
        <div className={style.buttons}>
          <ButtonGroup>
            <Button color="secondary" startIcon={<CancelIcon />} onClick={() => handleClose()}>
              No
            </Button>
            <Button variant="contained" endIcon={<TaskAltIcon />} onClick={handleDelete}>
              Yes
            </Button>
          </ButtonGroup>
        </div>
      </div>
    </section>
  );
};

export default DeleteModal;
