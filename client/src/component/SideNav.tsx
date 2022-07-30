import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

import HomeContext, { IHomeContext } from "../context/HomeContext";
import style from "../styles/sidenav.module.css";
import { IUser } from "../types/user.type";
import Home from "./Home";
import NewCat from "./NewCat";
import defaultUserProfile from "../defaultPic.svg";

import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import PlaylistAddRoundedIcon from "@mui/icons-material/PlaylistAddRounded";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";
import { LoadingButton } from "@mui/lab";
import axios from "axios";

const SideNav = () => {
  const navigate = useNavigate();

  const { setComponent } = useContext(HomeContext) as IHomeContext;
  const [homeActive, setHomeActive] = useState(true);
  const [createActive, setCreateActive] = useState(false);
  const [loading, setLoading] = useState(false);

  const data = localStorage.getItem("userInfo");
  const user: IUser = data && JSON.parse(data);

  const handleCreateClick = () => {
    setHomeActive(() => false);
    setCreateActive(() => true);
    setComponent && setComponent(<NewCat />);
  };

  const handleHomeClick = () => {
    setHomeActive(() => true);
    setCreateActive(() => false);
    setComponent && setComponent(<Home />);
  };

  const handleLogout = async () => {
    setLoading(true);
    const config = {
      headers: {
        Authorization: `Bearer ${user.access}`,
      },
    };

    const token = {
      refresh_token: `${user.refresh}`,
    };
    await axios
      .post("https://simplor.herokuapp.com/api/user/logout", token, config)
      .then(() => {
        localStorage.removeItem("userInfo");
        navigate("/");
      })
      .catch(() => console.log("bad request"));
  };

  return (
    <section className={style.body}>
      <div className={style.imageBox}>
        <img src={user.avatar ? user.avatar : defaultUserProfile} alt="" />{" "}
        <br />
        {user.first_name} {user.last_name}
      </div>

      <section className={style.navOptions}>
        <ul className={style.ulNavs}>
          <li
            onClick={handleHomeClick}
            className={homeActive ? style.active : ""}
          >
            <HomeRoundedIcon /> Home
          </li>
          <li
            onClick={handleCreateClick}
            className={createActive ? style.active : ""}
          >
            {" "}
            <PlaylistAddRoundedIcon /> Create new category
          </li>
        </ul>
      </section>

      <div className={style.button}>
        <LoadingButton
          variant="outlined"
          color="secondary"
          startIcon={<LogoutRoundedIcon />}
          onClick={handleLogout}
          loading={loading}
        >
          Logout
        </LoadingButton>
      </div>
    </section>
  );
};

export default SideNav;
