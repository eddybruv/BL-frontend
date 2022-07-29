import React, { useEffect, useState } from "react";
import style from "../styles/home.module.css";

import axios from "axios";
import { ICategory } from "../types/category.type";
import Card from "./Card";

const Home = () => {
  const [categories, setCategories] = useState<ICategory[] | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      await axios
        .get("/api/category/categories")
        .then((data) => setCategories(data.data));
    };

    fetchData(); 
  }, [categories]);

  return (
    <section className={style.body}>
      <h2 className={style.h2}>Categories</h2>
      <section className={style.content}>
        {categories?.map((category, index) => {
          return (
            <Card
              created_at={category.created_at}
              name={category.name}
              description={category.description}
              key={index}
              id={category.id}
              image={category.image}
            />
          );
        })}
      </section>
    </section>
  );
};

export default Home;
