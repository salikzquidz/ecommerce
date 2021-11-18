import React, { useContext, useEffect, useState } from "react";
import NextLink from "next/link";
import Cookies from "js-cookie";
import Layout from "../components/Layout";
import {
  Typography,
  List,
  ListItem,
  TextField,
  Button,
  Link,
} from "@material-ui/core";
import useStyles from "../utils/styles";
import axios from "axios";
import { Store } from "../utils/Store";
import { useRouter } from "next/router";

import { useSnackbar } from "notistack";
import { useForm, Controller } from "react-hook-form";

export default function Register() {
  const classes = useStyles();

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();

  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  //   const [name, setName] = useState("");

  //   const [email, setEmail] = useState("");
  //   const [password, setPassword] = useState("");
  //   const [confirmPassword, setConfirmPassword] = useState("");

  const { state, dispatch } = useContext(Store);
  const { userInfo } = state;

  const router = useRouter();

  const { redirect } = router.query; // contoh query : ?redirect=/whateverroute
  useEffect(() => {
    if (userInfo) {
      router.push("/");
    }
  }, []);
  const submitHandler = async ({ name, email, password, confirmPassword }) => {
    // e.preventDefault();
    closeSnackbar();

    if (password !== confirmPassword) {
      enqueueSnackbar("Passwords don't match", { variant: "error" });
      //   alert("Password dont match");
      return;
    }
    try {
      const { data } = await axios.post("/api/users/register", {
        name,
        email,
        password,
      });
      // console.log(data);
      dispatch({ type: "USER_LOGIN", payload: data });
      Cookies.set("userInfo", data);
      router.push(redirect || "/"); // if redirect is null, redirect user to homepage
      // alert("Success login");
    } catch (error) {
      enqueueSnackbar(
        error.response.data ? error.response.data.message : error.message,
        { variant: "error" }
      );
      //   alert(error.response ? error.response.data.message : error.message);
    }
  };

  return (
    <Layout title="Register">
      <form
        action=""
        className={classes.loginForm}
        onSubmit={handleSubmit(submitHandler)}
      >
        <Typography variant="h1">Register</Typography>
        <List>
          <ListItem>
            <Controller
              name="name"
              control={control}
              defaultValue=""
              rules={{
                required: true,
                minLength: 5,
              }}
              render={({ field }) => (
                <TextField
                  variant="outlined"
                  fullWidth
                  id="name"
                  label="Username"
                  inputProps={{ type: "text" }}
                  {...field}
                  error={Boolean(errors.name)}
                  helperText={
                    errors.name
                      ? errors.name.type === "minLength"
                        ? "Name length must be more than 5 characters"
                        : "Name is required"
                      : ""
                  }
                ></TextField>
              )}
            />
          </ListItem>

          <ListItem>
            <Controller
              name="email"
              control={control}
              defaultValue=""
              rules={{
                required: true,
                pattern: /^[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$/,
              }}
              render={({ field }) => (
                <TextField
                  variant="outlined"
                  fullWidth
                  id="email"
                  label="Email"
                  inputProps={{ type: "email" }}
                  // onChange={(e) => setEmail(e.target.value)}
                  {...field}
                  error={Boolean(errors.email)}
                  // double ternary operator
                  helperText={
                    errors.email
                      ? errors.email.type === "pattern"
                        ? "Email is not valid"
                        : "Email is required"
                      : ""
                  }
                ></TextField>
              )}
            />
          </ListItem>

          <ListItem>
            <Controller
              name="password"
              control={control}
              defaultValue=""
              rules={{
                required: true,
                minLength: 6,
              }}
              render={({ field }) => (
                <TextField
                  variant="outlined"
                  fullWidth
                  id="password"
                  label="Password"
                  inputProps={{ type: "password" }}
                  // onChange={(e) => setPassword(e.target.value)}
                  {...field}
                  error={Boolean(errors.password)}
                  helperText={
                    errors.password
                      ? errors.password.type === "minLength"
                        ? "Password must be more than 5 characters"
                        : "Password is required"
                      : ""
                  }
                ></TextField>
              )}
            />
          </ListItem>

          <ListItem>
            <Controller
              name="confirmPassword"
              control={control}
              defaultValue=""
              rules={{
                required: true,
                minLength: 6,
              }}
              render={({ field }) => (
                <TextField
                  variant="outlined"
                  fullWidth
                  id="confirmPassword"
                  label="Confirm Password"
                  inputProps={{ type: "password" }}
                  {...field}
                  error={Boolean(errors.confirmPassword)}
                  helperText={
                    errors.confirmPassword
                      ? errors.confirmPassword.type === "minLength"
                        ? "Confirm Password must be more than 5 characters"
                        : "Confirm Password is required"
                      : ""
                  }
                ></TextField>
              )}
            />
          </ListItem>

          <ListItem>
            <Button variant="contained" type="submit" fullWidth color="primary">
              Register
            </Button>
          </ListItem>

          <ListItem>
            Already have an account? &nbsp;
            <NextLink href={`/login?redirect=${redirect || "/"}`} passHref>
              <Link>Login</Link>
            </NextLink>
          </ListItem>
        </List>
      </form>
    </Layout>
  );
}
