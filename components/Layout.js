import React, { useContext } from "react";
import Head from "next/head";
import NextLink from "next/link";

import {
  AppBar,
  Toolbar,
  Typography,
  Container,
  Link,
  makeStyles,
  createTheme,
  ThemeProvider,
  CssBaseline,
  Switch,
  Badge,
} from "@material-ui/core";
import useStyles from "../utils/styles";
import { Store } from "../utils/Store";
import Cookies from "js-cookie";
// children
// layout wrap
// masalah mui dan ssr, settle dekat _app guna useEffect
// _document.js dan _app
// create link dlm next+mui kena guna dua2 link
// slug
// need to wrap components inside Store.Provider (in _app.js)

export default function Layout({ description, title, children }) {
  const classes = useStyles();
  const { state, dispatch } = useContext(Store); // for dark mode
  const { darkMode, cart } = state; // for dark mode | cart
  const theme = createTheme({
    typography: {
      h1: {
        fontSize: "1.6rem",
        fontWeight: 400,
        margin: "1rem 0",
      },
    },
    palette: {
      type: darkMode ? "dark" : "light",
      primary: {
        main: "#f0c000",
      },
      secondary: {
        main: "#208080",
      },
    },
  });

  function darkModeHandler() {
    dispatch({ type: darkMode ? "DARK_MODE_OFF" : "DARK_MODE_ON" });
    const newDarkMode = !darkMode;
    Cookies.set("darkMode", newDarkMode ? "ON" : "OFF"); // to preserve dark/light mode when refresh the page
  }

  return (
    <div>
      <Head>
        <title> {title ? `${title} - eCommerce S+` : "eCommerce S+"} </title>
        {description && <meta name="description" content={description}></meta>}
      </Head>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <AppBar position="static" className={classes.navbar}>
          <Toolbar>
            <NextLink href="/" passHref>
              <Link>
                <Typography className={classes.title}>eCommerce S+</Typography>
              </Link>
            </NextLink>
            <div className={classes.grow}></div>
            <div>
              <Switch checked={darkMode} onChange={darkModeHandler}></Switch>
              <NextLink href="/cart" passHref>
                <Link>
                  {cart.cartItems.length > 0 ? (
                    <Badge
                      color="secondary"
                      badgeContent={cart.cartItems.length}
                    >
                      Cart
                    </Badge>
                  ) : (
                    "Cart"
                  )}
                </Link>
              </NextLink>
              <NextLink href="/login" passHref>
                <Link>Login</Link>
              </NextLink>
            </div>
          </Toolbar>
        </AppBar>
        <Container className={classes.main}>{children}</Container>
        <footer className={classes.footer}>
          {/* All Rights Reserved. 2021 eCommerce S */}
          <Typography>All Rights Reserved. 2021s eCommerce S+</Typography>
        </footer>
      </ThemeProvider>
    </div>
  );
}
