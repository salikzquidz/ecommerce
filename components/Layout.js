import React, { useContext, useEffect, useState } from "react";
import Head from "next/head";
import NextLink from "next/link";
import { useRouter } from "next/router";
import {
  AppBar,
  Toolbar,
  Typography,
  Container,
  Link,
  createTheme,
  ThemeProvider,
  CssBaseline,
  Switch,
  Badge,
  Button,
  Menu,
  MenuItem,
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

export default function Layout({ title, description, children }) {
  const router = useRouter();
  const { state, dispatch } = useContext(Store); // for dark mode
  const { darkMode, cart, userInfo } = state; // for dark mode | cart
  const classes = useStyles();
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

  const darkModeChangeHandler = () => {
    dispatch({ type: darkMode ? "DARK_MODE_OFF" : "DARK_MODE_ON" });
    const newDarkMode = !darkMode;
    Cookies.set("darkMode", newDarkMode ? "ON" : "OFF");
  };

  // -> FOR PROFILE BUTTON
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  // <- FOR PROFILE BUTTON

  //FOR LOGOUT
  const logoutClickHandler = () => {
    setAnchorEl(null); //close menu
    dispatch({ type: "USER_LOGOUT" });
    Cookies.remove("userInfo");
    Cookies.remove("cartItems");
    router.push("/");
  };
  //FOR LOGOUT

  useEffect(() => {
    console.log(darkMode);
    // darkMode = !darkMode;
  }, [darkMode]);

  const [cek, setCek] = useState(false);

  // function cekHandler () {

  // }
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
              {/* <Switch checked={cek} onChange={() => setCek(!cek)}></Switch> */}

              {/* {darkMode ? "ON" : "OFF"} */}
              <Switch
                checked={darkMode}
                onChange={darkModeChangeHandler}
              ></Switch>

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
              {userInfo ? (
                <>
                  <Button
                    className={classes.navbarButton}
                    aria-controls="simple-menu"
                    aria-haspopup="true"
                    onClick={handleClick}
                  >
                    {userInfo.name}
                    {/* <NextLink href="/login" passHref>
                    <Link>Logout</Link>
                  </NextLink> */}
                  </Button>
                  <Menu
                    id="simple-menu"
                    anchorEl={anchorEl}
                    keepMounted
                    open={Boolean(anchorEl)}
                    onClose={handleClose}
                  >
                    <MenuItem onClick={handleClose}>Profile</MenuItem>
                    <MenuItem onClick={handleClose}>My account</MenuItem>
                    <MenuItem onClick={logoutClickHandler}>Logout</MenuItem>
                  </Menu>
                </>
              ) : (
                <NextLink href="/login" passHref>
                  <Link>Login</Link>
                </NextLink>
              )}
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
