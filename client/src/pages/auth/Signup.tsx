import React, { ChangeEvent, useState, useEffect } from "react";
import CustomInput from "../../component/CustomInput";
import style from "../../styles/signup.module.css";
import pic from "../../signup.svg";

import { Checkbox, FormControlLabel } from "@mui/material";
import { LoadingButton } from "@mui/lab";

import HttpsIcon from "@mui/icons-material/Https";
import AlternateEmailIcon from "@mui/icons-material/AlternateEmail";
import GoogleIcon from "@mui/icons-material/Google";
import NumbersIcon from "@mui/icons-material/Numbers";
import PersonIcon from "@mui/icons-material/Person";
import PermIdentityIcon from "@mui/icons-material/PermIdentity";

import { GoogleLogin } from "react-google-login";

import { useNavigate } from "react-router-dom";
import axios from "axios";
import { gapi } from "gapi-script";

const Signup = () => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const [user, setUser] = useState({
    email: "",
    password: "",
    first_name: "",
    last_name: "",
    phone: "",
  });
  const [avatar, setAvatar] = useState<File | undefined>(undefined);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
  };

  const handleAvatar = (e: ChangeEvent<HTMLInputElement>) => {
    // @ts-ignore
    const image = e.target.files[0];
    setAvatar(image);
  };

  const handleSubmit = async () => {
    setLoading(() => true);

    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };

    const formData = new FormData();
    formData.append("first_name", user.first_name);
    formData.append("last_name", user.last_name);
    formData.append("password", user.password);
    formData.append("email", user.email);
    formData.append("phone", user.phone);
    // @ts-ignore
    formData.append("avatar", avatar);

    await axios
      .post("https://simplor.herokuapp.com/api/user/register", formData, config)
      .then((data) => {
        setLoading(false);
        localStorage.setItem("userInfo", data.data);
      })
      .catch(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    const start = () => {
      gapi.client.init({
        clientId:
          "26253785310-88f9ki4snsj27qmg52m01qbmoreh5d3g.apps.googleusercontent.com",
        scope: ""
      });
    }

    gapi.load("client:auth2", start);
  }, [])

  const responseGoogle = (response: any) => {
    console.log(response);
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
            <h3 className={style.header}>Sign Up for an account </h3>
            <CustomInput
              handleChange={handleChange}
              value={user.first_name}
              placeholder="First name"
              icon={<PersonIcon />}
              name="first_name"
              type="text"
            />
            <br />
            <CustomInput
              handleChange={handleChange}
              value={user.last_name}
              placeholder="Last name"
              icon={<PermIdentityIcon />}
              name="last_name"
              type="text"
            />
            <br />

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
              value={user.phone}
              placeholder="Phone number (+xxx x xx xx xx xx) "
              icon={<NumbersIcon />}
              name="phone"
              type="tel"
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

            <input
              onChange={handleAvatar}
              type="file"
              name=""
              id=""
              style={{ display: "none" }}
            />

            <LoadingButton
              loading={loading}
              // @ts-ignore
              onClick={() => document.querySelector("input[type=file]").click()}
            >
              Upload avatar
            </LoadingButton>
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
              Sign Up
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
                  Sign in with Google
                </LoadingButton>
              )}
              cookiePolicy={"single_host_origin"}
            />

            <p onClick={() => navigate("/")} className={style.login}>
              Already have an account? Login
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Signup;
