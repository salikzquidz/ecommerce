import Head from "next/head";
import Image from "next/image";
import NextLink from "next/link";
import styles from "../styles/Home.module.css";
import Layout from "../components/Layout";
import { useContext, useEffect } from "react";
import db from "../utils/db";
import Product from "../models/Product";
import { useRouter } from "next/router";
import {
  Grid,
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  Typography,
  CardActions,
  Button,
} from "@material-ui/core";
import axios from "axios";
import { Store } from "../utils/Store";
export default function Home({ products }) {
  const router = useRouter();
  const { state, dispatch } = useContext(Store); // untuk add to cart

  const addToCartHandler = async (product) => {
    const existItem = state.cart.cartItems.find((x) => x._id === product._id);
    const quantity = existItem ? existItem.quantity + 1 : 1;
    const { data } = await axios.get(`/api/products/${product._id}`);
    //kalau kurang stok jgn tambah
    if (data.countInStock < 0) {
      window.alert("Sorry, Product is out of stock");
      return;
    }
    dispatch({ type: "CART_ADD_ITEM", payload: { ...product, quantity } });
    router.push("/cart");
  };

  // temporary solution for switch bug after refresh
  useEffect(() => {
    router.push("/");
  }, []);

  return (
    <Layout>
      <div>
        <hr />
        <hr />
        <Grid container spacing={3}>
          {products.map((product) => {
            return (
              <Grid item md={4} key={product.name}>
                <Card>
                  <NextLink href={`/product/${product.slug}`}>
                    <CardActionArea>
                      <CardMedia
                        component="img"
                        image={product.image}
                        title={product.name}
                      ></CardMedia>
                      <CardContent>
                        <Typography>{product.name}</Typography>
                      </CardContent>
                    </CardActionArea>
                  </NextLink>
                  <CardActions>
                    <Typography>${product.price} </Typography>
                    <Button
                      size="small"
                      color="primary"
                      onClick={() => addToCartHandler(product)}
                    >
                      Add to cart
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            );
          })}
        </Grid>
      </div>
    </Layout>
  );
}
export const getServerSideProps = async (ctx) => {
  await db.connect();
  const products = await Product.find({}).lean(); // ada error pasal serialize so kena guna lean function - mongoose // tapi ada satu error sebab _id // kene  tukar doc ke object - check db.js
  await db.disconnect();
  return {
    props: {
      products: products.map(db.convertDocToObj),
    },
  };
};
