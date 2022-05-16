import React from "react";
import { Grid } from "@mui/material";
import Product from "./Product/Product";
import SortBar from "../SortBar/SortBar";

import useStyles from "./styles";

const Products = ({ products, onAddToCart, productsSort }) => {
  const classes = useStyles();

  return (
    <main className={classes.content}>
      <div className={classes.toolbar} />
      <SortBar productsSort={productsSort} />
      <Grid container justifyContent="center" spacing={4}>
        {products.map((product) => (
          <Grid item key={product.id} xs={12} sm={6} md={4} lg={3}>
            <Product product={product} onAddToCart={onAddToCart}></Product>
          </Grid>
        ))}
      </Grid>
    </main>
  );
};

export default Products;
