import { makeStyles } from "@material-ui/core";
const useStyles = makeStyles({
  navbar: {
    backgroundColor: "#203040",
    "& a": {
      color: "#ffffff",
      marginLeft: 10,
    },
  },
  title: {
    fontFamily: "Lato",
    fontWeight: 700,
    fontSize: "1.3rem",
    // color: "black",
  },
  grow: {
    flexGrow: 1,
  },
  main: {
    minHeight: "80vh",
  },
  footer: {
    marginTop: 10,
    textAlign: "center",
  },
  backLink: {
    marginTop: 10,
  },
  loginForm: {
    maxWidth: 800,
    margin: "0 auto",
  },
  navbarButton: {
    color: "#ffffff",
    textTransform: "initial",
  },
  transparentBackground: {
    backgroundColor: "transparent",
  },
  section: {
    marginTop: 10,
    marginBottom: 10,
  },
});
export default useStyles;
