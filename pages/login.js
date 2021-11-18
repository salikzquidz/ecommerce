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
import { useForm, Controller } from "react-hook-form";

export default function Login() {
  const classes = useStyles();

  // form validation
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();

  // const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");

  const { state, dispatch } = useContext(Store);
  const { userInfo } = state;

  const router = useRouter();

  const { redirect } = router.query; // contoh query : ?redirect=/whateverroute
  useEffect(() => {
    if (userInfo) {
      router.push("/");
    }
  }, []);

  // no need to useState when using react-hook-form
  const submitHandler = async ({ email, password }) => {
    // e.preventDefault();
    try {
      const { data } = await axios.post("/api/users/login", {
        email,
        password,
      });
      // console.log(data);
      dispatch({ type: "USER_LOGIN", payload: data });
      Cookies.set("userInfo", data);
      router.push(redirect || "/"); // if redirect is null, redirect user to homepage
      // alert("Success login");
    } catch (error) {
      alert(error.response ? error.response.data.message : error.message);
    }
  };

  return (
    <Layout title="login">
      <form
        action=""
        className={classes.loginForm}
        onSubmit={handleSubmit(submitHandler)}
      >
        <Typography variant="h1">Login</Typography>
        <List>
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
            <Button variant="contained" type="submit" fullWidth color="primary">
              Login
            </Button>
          </ListItem>

          <ListItem>
            Don't have an account? &nbsp;
            <NextLink href={`/register?redirect=${redirect || "/"}`} passHref>
              <Link>Register</Link>
            </NextLink>
          </ListItem>
        </List>
      </form>
    </Layout>
  );
}
