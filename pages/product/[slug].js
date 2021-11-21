import React, { useContext, useEffect } from "react";
// import { useRouter } from "next/router";
import NextLink from "next/link";
import Image from "next/image";
import {
  Link,
  Grid,
  List,
  ListItem,
  Typography,
  Card,
  Button,
} from "@material-ui/core";
import Layout from "../../components/Layout";
import useStyles from "../../utils/styles";

import Product from "../../models/Product";
import db from "../../utils/db";
import axios from "axios";

import { Store } from "../../utils/Store"; // untuk add to cart
import { useRouter } from "next/router";

export default function ProductPage({ product }) {
  const classes = useStyles();
  const router = useRouter();
  const { state, dispatch } = useContext(Store); // untuk add to cart

  const addToCartHandler = async () => {
    const existItem = state.cart.cartItems.find((x) => x._id === product._id);
    const quantity = existItem ? existItem.quantity + 1 : 1;
    const { data } = await axios.get(`/api/products/${product._id}`);
    // kalau kurang stok jangan tambah
    if (data.countInStock < quantity) {
      window.alert("Sorry, Product is out of stock");
      return;
    }
    dispatch({ type: "CART_ADD_ITEM", payload: { ...product, quantity } });
    router.push("/cart");
  };

  // temporary solution for switch bug after refresh
  useEffect(() => {
    router.push(window.location.pathname);
  }, []);

  return (
    <Layout title={product.name} description={product.description}>
      <div className={classes.backLink}>
        <NextLink href="/" passHref>
          <Link>Back to Product page</Link>
        </NextLink>
      </div>
      <Grid container spacing={1}>
        <Grid item md={6} xs={12}>
          <Image
            src={product.image}
            width={640}
            height={640}
            layout="responsive"
          ></Image>
        </Grid>
        <Grid item md={3} xs={12}>
          <List>
            <ListItem>
              <Typography component="h1" variant="h1">
                {product.name}
              </Typography>
            </ListItem>
            <ListItem>
              <Typography>Category: {product.category}</Typography>
            </ListItem>
            <ListItem>
              <Typography>Brand: {product.brand}</Typography>
            </ListItem>
            <ListItem>
              <Typography>
                Rating: {product.rating} stars ({product.numReviews} reviews)
              </Typography>
            </ListItem>

            <ListItem>
              <Typography>Description: {product.description}</Typography>
              <Typography></Typography>
            </ListItem>
          </List>
        </Grid>
        <Grid item md={3} xs={12}>
          <Card>
            <List>
              <ListItem>
                <Grid container>
                  <Grid item xs={6}>
                    Price
                  </Grid>
                  <Grid item xs={6}>
                    ${product.price}
                  </Grid>
                </Grid>
              </ListItem>
              <ListItem>
                <Grid container>
                  <Grid item xs={6}>
                    Status
                  </Grid>
                  <Grid item xs={6}>
                    {product.countInStock > 0 ? "In stock" : "Unavailable"}
                  </Grid>
                </Grid>
              </ListItem>
              <ListItem>
                <Button
                  type="button"
                  fullWidth
                  variant="contained"
                  color="primary"
                  onClick={addToCartHandler}
                >
                  {" "}
                  Add to cart
                </Button>
              </ListItem>
            </List>
          </Card>
        </Grid>
      </Grid>
    </Layout>
  );
}

export const getServerSideProps = async (ctx) => {
  const { params } = ctx;
  const { slug } = params;

  await db.connect();
  const products = await Product.findOne({ slug }).lean(); // ada error pasal serialize so kena guna lean function - mongoose // tapi ada satu error sebab _id // kene  tukar doc ke object - check db.js
  await db.disconnect();
  return {
    props: {
      product: db.convertDocToObj(products),
    },
  };
};
