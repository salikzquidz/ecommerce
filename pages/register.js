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

export default function Register() {
  const classes = useStyles();

  const [name, setName] = useState("");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const { state, dispatch } = useContext(Store);
  const { userInfo } = state;

  const router = useRouter();

  const { redirect } = router.query; // contoh query : ?redirect=/whateverroute
  useEffect(() => {
    if (userInfo) {
      router.push("/");
    }
  }, []);
  const submitHandler = async (e) => {
    e.preventDefault(0);
    if (password !== confirmPassword) {
      alert("Password dont match");
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
      alert(error.response ? error.response.data.message : error.message);
    }
  };

  return (
    <Layout title="Register">
      <form action="" className={classes.loginForm} onSubmit={submitHandler}>
        <Typography variant="h1">Register</Typography>
        <List>
          <ListItem>
            <TextField
              variant="outlined"
              fullWidth
              id="name"
              label="Username"
              inputProps={{ type: "text" }}
              onChange={(e) => setName(e.target.value)}
            ></TextField>
          </ListItem>

          <ListItem>
            <TextField
              variant="outlined"
              fullWidth
              id="email"
              label="Email"
              inputProps={{ type: "email" }}
              onChange={(e) => setEmail(e.target.value)}
            ></TextField>
          </ListItem>

          <ListItem>
            <TextField
              variant="outlined"
              fullWidth
              id="password"
              label="Password"
              inputProps={{ type: "password" }}
              onChange={(e) => setPassword(e.target.value)}
            ></TextField>
          </ListItem>

          <ListItem>
            <TextField
              variant="outlined"
              fullWidth
              id="confirmPassword"
              label="Confirm Password"
              inputProps={{ type: "password" }}
              onChange={(e) => setConfirmPassword(e.target.value)}
            ></TextField>
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
