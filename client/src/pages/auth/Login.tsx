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

interface IUser {
  email: string;
  password: string;
}

const Login = () => {
  const navigate = useNavigate();

  const [displayToast, setDisplayToast] = useState(false);
  const [mismatchToast, setMismatchToast] = useState(false);
  const [inputToast, setInputToast] = useState(false);
  const [googleToastFailure, setGoogleToastFailure] = useState(false);

  const clientId =
    "26253785310-8d7ona179lpba7mr712htftraj4d333u.apps.googleusercontent.com";

  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    setDisplayToast(false);
    setInputToast(false);
    setUser({
      ...user,
      [name]: value,
    });
  };

  useEffect(() => {
    const start = () => {
      gapi.client.init({
        clientId,
        scope: "https://www.googleapis.com/auth/userinfo.profile",
      });
    };

    gapi.load("client:auth2", start);
  }, []);

  const responseGoogle = async (response: any) => {
    setLoading(true);
    await axios
      .post("https://simplor.herokuapp.com/api/user/login", {
        email: response.profileObj.email,
        password: response.profileObj.googleId,
      })
      .then((data) => {
        setLoading(false);
        localStorage.setItem("userInfo", JSON.stringify(data.data));
        navigate("/categories");
      })
      .catch((err) => {
        if (
          err.response.data.detail ===
          "No active account found with the given credentials"
        ) {
          setMismatchToast(true);
        } else {
          setDisplayToast(true);
        }
      });
    setLoading(() => false);
  };

  const checkInputs = (user: IUser) => {
    if (user.email === "" || user.password === "") return false;
    return true;
  };

  const handleSubmit = async () => {
    setLoading(() => true);

    if (!checkInputs(user)) {
      setLoading(false);
      setInputToast(true);
      return;
    }

    await axios
      .post("https://simplor.herokuapp.com/api/user/login", user)
      .then((data) => {
        localStorage.setItem("userInfo", JSON.stringify(data.data));
        setLoading(() => false);
        navigate("/categories");
      })
      .catch((err) => {
        if (
          err.response.data.detail ===
          "No active account found with the given credentials"
        ) {
          setMismatchToast(true);
        } else {
          setDisplayToast(true);
        }
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
          <h3 className={style.slogan}>Build with Us</h3>
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
              clientId={clientId}
              onSuccess={responseGoogle}
              onFailure={() => setGoogleToastFailure(true)}
              render={(renderProps) => (
                <LoadingButton
                  onClick={renderProps.onClick}
                  startIcon={<GoogleIcon />}
                  sx={{ mt: 2 }}
                  color="secondary"
                  fullWidth
                  variant="outlined"
                  disabled={loading}
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
            {mismatchToast && (
              <Toast severity="" message="Credentials don't match" />
            )}
            {googleToastFailure && (
              <Toast message="Google not responding, try the other way" />
            )}
            {inputToast && <Toast message="Fill all input fields" />}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
