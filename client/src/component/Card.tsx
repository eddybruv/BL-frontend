import React from "react";
import style from "../styles/card.module.css";
import { ICategory } from "../types/category.type";

const Card = ({ created_at, description, id, image, name }: ICategory) => {
  return (
    <section className={style.body}>
      <div className={style.imageBox}>
        {/* @ts-ignore */}
        <img
          alt="Category"
          src={
            image
              ? image
              : "https://bitsofco.de/content/images/2018/12/broken-1.png"
          }
        />
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
    </section>
  );
};

export default Card;
