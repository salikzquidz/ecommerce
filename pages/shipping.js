import React, { useContext, useEffect, useState } from "react";
import CheckoutWizard from "../components/CheckoutWizard";
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
import { Store } from "../utils/Store";
import { useRouter } from "next/router";

import { useForm, Controller } from "react-hook-form";

export default function Shipping() {
  const classes = useStyles();

  const {
    handleSubmit,
    control,
    formState: { errors },
    setValue, //utk preserve data dlm cookies - untuk form input shipping
  } = useForm();

  const { state, dispatch } = useContext(Store);
  const {
    userInfo,
    cart: { shippingAddress },
  } = state;

  const router = useRouter();

  const { redirect } = router.query; // contoh query : ?redirect=/whateverroute

  useEffect(() => {
    if (!userInfo) {
      router.push("/login?redirect=/shipping");
    }
    setValue("fullName", shippingAddress.fullName);
    setValue("address", shippingAddress.address);
    setValue("city", shippingAddress.city);
    setValue("postalCode", shippingAddress.postalCode);
    setValue("country", shippingAddress.country);
  }, []);

  const submitHandler = ({ fullName, address, city, postalCode, country }) => {
    dispatch({
      type: "SAVE_SHIPPING_ADDRESS",
      payload: { fullName, address, city, postalCode, country },
    });
    Cookies.set(
      "shippingAddress",
      JSON.stringify({
        fullName,
        address,
        city,
        postalCode,
        country,
      })
    );
    router.push("/payment");
  };

  // temporary solution for switch bug after refresh
  useEffect(() => {
    router.push(window.location.pathname);
  }, []);

  return (
    <Layout title="Shipping Address">
      <CheckoutWizard activeStep={1} />
      <form
        action=""
        className={classes.loginForm}
        onSubmit={handleSubmit(submitHandler)}
      >
        <Typography variant="h1">Shipping Address</Typography>
        <List>
          <ListItem>
            <Controller
              name="fullName"
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
                  id="fullName"
                  label="Full Name"
                  inputProps={{ type: "text" }}
                  {...field}
                  error={Boolean(errors.fullName)}
                  helperText={
                    errors.fullName
                      ? errors.fullName.type === "minLength"
                        ? "Full Name length must be more than 5 characters"
                        : "Full Name is required"
                      : ""
                  }
                ></TextField>
              )}
            />
          </ListItem>

          <ListItem>
            <Controller
              name="address"
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
                  id="address"
                  label="Address"
                  inputProps={{ type: "text" }}
                  {...field}
                  error={Boolean(errors.address)}
                  helperText={
                    errors.address
                      ? errors.address.type === "minLength"
                        ? "Address length must be more than 5 characters"
                        : "Address is required"
                      : ""
                  }
                ></TextField>
              )}
            />
          </ListItem>

          <ListItem>
            <Controller
              name="city"
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
                  id="city"
                  label="City"
                  inputProps={{ type: "text" }}
                  {...field}
                  error={Boolean(errors.city)}
                  helperText={
                    errors.city
                      ? errors.city.type === "minLength"
                        ? "City length must be more than 5 characters"
                        : "City is required"
                      : ""
                  }
                ></TextField>
              )}
            />
          </ListItem>

          <ListItem>
            <Controller
              name="postalCode"
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
                  id="postalCode"
                  label="Postal Code"
                  inputProps={{ type: "text" }}
                  {...field}
                  error={Boolean(errors.postalCode)}
                  helperText={
                    errors.postalCode
                      ? errors.postalCode.type === "minLength"
                        ? "Postal Code length must be more than 5 characters"
                        : "Postal Code is required"
                      : ""
                  }
                ></TextField>
              )}
            />
          </ListItem>

          <ListItem>
            <Controller
              name="country"
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
                  id="country"
                  label="Country"
                  inputProps={{ type: "text" }}
                  {...field}
                  error={Boolean(errors.country)}
                  helperText={
                    errors.country
                      ? errors.country.type === "minLength"
                        ? "Country length must be more than 5 characters"
                        : "Country is required"
                      : ""
                  }
                ></TextField>
              )}
            />
          </ListItem>

          <ListItem>
            <Button variant="contained" type="submit" fullWidth color="primary">
              Continue
            </Button>
          </ListItem>
        </List>
      </form>
    </Layout>
  );
}
