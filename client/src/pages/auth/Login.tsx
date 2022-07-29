import React, { ChangeEvent, useState, useEffect } from "react";
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
import { gapi } from "gapi-script";
import { GoogleLogin } from "react-google-login";
import Toast from "../../component/misc/Toast";

const Login = () => {
  const navigate = useNavigate();

  const [displayToast, setDisplayToast] = useState(false);
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    setDisplayToast(false);
    setUser({
      ...user,
      [name]: value,
    });
  };

  useEffect(() => {
    const start = () => {
      gapi.client.init({
        clientId:
          "26253785310-88f9ki4snsj27qmg52m01qbmoreh5d3g.apps.googleusercontent.com",
        scope: "",
        apiKey: "AIzaSyBqKeHwtptqPfFJ2szg_F1moJUzhJDU1Ys",
      });
    };

    gapi.load("client:auth2", start);
  }, []);

  const responseGoogle = (response: any) => {
    console.log(response);
  };

  const handleSubmit = async () => {
    // setDisplayToast(false)
    setLoading(() => true);
    await axios
      .post("/api/user/login", user)
      .then((data) => {
        localStorage.setItem("userInfo", JSON.stringify(data.data));
        setLoading(() => false);
        navigate("/categories");
      })
      .catch(() => {
        setLoading(() => false);
        setDisplayToast(true);
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
            We provide above market remuneration for our <br /> staff, as well
            as profit sharing options <br /> and other additional benefits to
            make <br /> sure you`re being recognized <br /> for the value you
            bring <br /> to your role.
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
            <GoogleLogin
              clientId="26253785310-88f9ki4snsj27qmg52m01qbmoreh5d3g.apps.googleusercontent.com"
              onSuccess={responseGoogle}
              render={(renderProps) => (
                <LoadingButton
                  onClick={renderProps.onClick}
                  startIcon={<GoogleIcon />}
                  sx={{ mt: 2 }}
                  color="secondary"
                  fullWidth
                  variant="outlined"
                  loading={loading}
                >
                  Continue with Google
                </LoadingButton>
              )}
              cookiePolicy={"single_host_origin"}
            />
            <p onClick={() => navigate("/register")} className={style.signup}>
              Don't have an account? Sign Up
            </p>
            {displayToast && (
              <Toast severity="" message="Error trying to sign in" />
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
