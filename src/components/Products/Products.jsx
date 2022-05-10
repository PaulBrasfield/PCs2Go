import React from "react";
import { Grid } from "@mui/material";
import Product from "./Product/Product";

import useStyles from "./styles";

const Products = ({ products, onAddToCart }) => {
  const classes = useStyles();

  return (
    <main className={classes.content}>
      <div className={classes.toolbar} />
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

// {
//   /* <Card className={classes.root}>
//               <CardMedia
//                 className={classes.media}
//                 image={image}
//                 title={product.name}
//               />
//               <CardContent>
//                 <div className={classes.cardContent}>
//                   <Typography variant="h5" gutterBottom>
//                     {product.name}
//                   </Typography>
//                   {console.log("Item Name: " + product.name)}
//                   <Typography variant="h5">{product.price}</Typography>
//                 </div>
//                 <Typography variant="h2" color="textSecondary">
//                   {product.description}
//                 </Typography>
//               </CardContent>
//               <CardActions disableSpacing className={classes.cardActions}>
//                 <IconButton aria-label="Add to Cart">
//                   <AddShoppingCart />
//                 </IconButton>
//               </CardActions>
//             </Card> */
// }
