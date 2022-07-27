import React, { ChangeEvent, useState } from "react";
import CustomInput from "../../component/CustomInput";
import style from "../../styles/login.module.css";
import pic from "../../design.svg";
import { Checkbox, FormControlLabel } from "@mui/material";
import { LoadingButton } from "@mui/lab";

import HttpsIcon from "@mui/icons-material/Https";
import AlternateEmailIcon from "@mui/icons-material/AlternateEmail";
import GoogleIcon from "@mui/icons-material/Google";

import { useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
  };

  const handleSubmit = async () => {
    setLoading(() => true);
    await axios.post("/api/user/login", user).then((data) => {
      console.log(data.data);
      setLoading(() => false);
    });
  };

  return (
    <section className={style.body}>
      <div className={style.content}>
        <div className={style.leftContainer}>
          <div className={style.imgBox}>
            <img src={pic} alt="" />
          </div>
          <h3 className={style.slogan}>
            WE ENABLE THE DIGITALLY INVISIBLE <br /> ECOSYSTEM WITH THE USE OF{" "}
            <br /> DESIGN THINKING AND <br /> TECHNOLOGY
          </h3>
        </div>
        <div className={style.rightContainer}>
          <div className={style.innerCon}>
            <h3 className={style.header}>Sign in to BL</h3>
            <CustomInput
              handleChange={handleChange}
              value={user.email}
              placeholder="Email address"
              icon={<AlternateEmailIcon />}
              name="email"
              type="email"
            />
            <br />
            <CustomInput
              handleChange={handleChange}
              value={user.password}
              placeholder="Password"
              icon={<HttpsIcon />}
              name="password"
              type="password"
            />
            <br />
            <FormControlLabel
              control={
                <Checkbox
                  sx={{
                    color: "#8146ff",
                    "&.Mui-checked": {
                      color: "#8146ff",
                    },
                  }}
                />
              }
              label="Remember me"
            />
            <br />
            <LoadingButton
              onClick={handleSubmit}
              sx={{ mt: 3 }}
              fullWidth
              variant="contained"
              loading={loading}
            >
              Sign in
            </LoadingButton>
            <LoadingButton
              startIcon={<GoogleIcon />}
              sx={{ mt: 2 }}
              color="secondary"
              fullWidth
              variant="outlined"
              loading={loading}
            >
              Sign in with Google
            </LoadingButton>
            <p onClick={() => navigate("/register")} className={style.signup}>
              Don't have an account? Sign Up
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
