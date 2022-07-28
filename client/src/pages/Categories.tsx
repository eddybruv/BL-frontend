import React, { useContext } from "react";
import style from "../styles/categories.module.css";
import SideNav from "../component/SideNav";
import HomeContext, { IHomeContext } from "../context/HomeContext";
import Home from "../component/Home";

const Categories = () => {
  const { component } = useContext(HomeContext) as IHomeContext;

  return (
    <section className={style.body}>
      <div className={style.sideNav}>
        <SideNav />
      </div>
      <div className={style.otherDiv}>{component}</div>
    </section>
  );
};

export default Categories;
