import React, { useContext, useState } from "react";
import style from "../styles/categories.module.css";
import SideNav from "../component/SideNav";
import HomeContext, { IHomeContext } from "../context/HomeContext";

import { IconButton } from "@mui/material";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import MenuOpenRoundedIcon from "@mui/icons-material/MenuOpenRounded";

const Categories = () => {
  const { component } = useContext(HomeContext) as IHomeContext;
  const [draw, setDraw] = useState(false);

  const handleDraw = () => {
    setDraw(!draw);
    console.log(draw);
  };

  return (
    <section className={style.body}>
      <div className={style.navButton}>
        <IconButton onClick={handleDraw}>
          {!draw ? (
            <MenuRoundedIcon fontSize="large" />
          ) : (
            <MenuOpenRoundedIcon fontSize="large" />
          )}
        </IconButton>
      </div>
      <div className={`${style.sideNav} ${draw && style.draw}`}>
        <SideNav />
      </div>
      <div className={style.otherDiv}>{component}</div>
    </section>
  );
};

export default Categories;
