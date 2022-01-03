import {
  Grid,
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  Typography,
  CardActions,
  Button,
} from '@material-ui/core';
import NextLink from 'next/link';
import Layout from '../components/Layout';
import db from '../utils/db';
import Product from '../models/Product';
import axios from 'axios';
import { useRouter } from 'next/router';
import { useContext } from 'react';
import { Store } from '../utils/Store';
import useStyles from '../utils/styles';

export default function Home(props) {
  const router = useRouter();
  const { state, dispatch } = useContext(Store);
  const { products } = props;
  const classes = useStyles();
  const addToCartHandler = async (product) => {
    const existItem = state.cart.cartItems.find((x) => x._id === product._id);
    const quantity = existItem ? existItem.quantity + 1 : 1;
    const { data } = await axios.get(`/api/products/${product._id}`);
    if (data.CountInStock < quantity) {
      window.alert('Sorry. Product is out of stock');
      return;
    }
    dispatch({ type: 'CART_ADD_ITEM', payload: { ...product, quantity } });
    router.push('/cart');
  };
  const round2 = (num) => Math.round(num * 100 + Number.EPSILON) / 100; // 123.456 => 123.46
  return (
    <Layout>
      <div>
        <h1>Produtos</h1>
        <Grid container spacing={3}>
          {products.map((product) => (
            <Grid item md={4} key={product.name}>
              <Card>
                <NextLink href={`/product/${product.slug}`} passHref>
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
                <CardActions disableSpacing className={classes.areaPreco}>
                  <Typography className={classes.precoDe}>
                    De: R$ {product.price}
                  </Typography>
                  <Typography className={classes.precoPor}>
                    Por: R$ {product.promoPrice}
                  </Typography>
                  <Typography>
                    ou 4x de R${round2(product.promoPrice / 4)}
                  </Typography>
                </CardActions>
                <CardActions>
                  <Button
                    size="small"
                    color="primary"
                    onClick={() => addToCartHandler(product)}
                    fullWidth
                  >
                    Comprar
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </div>
    </Layout>
  );
}

export async function getServerSideProps() {
  await db.connect();
  const products = await Product.find({}).lean();
  await db.disconnect();
  return {
    props: {
      products: products.map(db.convertDocToObj),
    },
  };
}
