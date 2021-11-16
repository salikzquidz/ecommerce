import React, { useState } from "react";
import NextLink from "next/link";

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
export default function Login() {
  const classes = useStyles();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const submitHandler = async (e) => {
    e.preventDefault(0);
    try {
      const { data } = await axios.post("/api/users/login", {
        email,
        password,
      });
      alert("Success login");
    } catch (error) {
      alert(error.response.data ? error.response.data.message : error.message);
    }
  };
  return (
    <Layout title="login">
      <form action="" className={classes.loginForm} onSubmit={submitHandler}>
        <Typography variant="h1">Login</Typography>
        <List>
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
            <Button variant="contained" type="submit" fullWidth color="primary">
              Login
            </Button>
          </ListItem>

          <ListItem>
            Don't have an account? &nbsp;
            <NextLink href="/register" passHref>
              <Link>Register</Link>
            </NextLink>
          </ListItem>
        </List>
      </form>
    </Layout>
  );
}
