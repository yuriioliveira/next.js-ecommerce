import React from 'react';
import Head from 'next/head';
import NextLink from 'next/link';
import { AppBar, Container, Link, Toolbar, Typography } from '@material-ui/core';
import useStyles from '../utils/styles';

export default function Layout({ title, children}) {
    const classes = useStyles();
    return (
        <div>
            <Head>
                <title>{title? `${title} - Next Commerce` : 'Next Commerce'}</title>
            </Head>
            <AppBar position="static" className={classes.navbar}>
                <Toolbar>
                    <NextLink href="/" passHref>
                        <Link>
                            <Typography className={classes.brand}>Next commerce</Typography>
                        </Link>
                    </NextLink>
                    <div className={classes.grow}></div>
                    <div>
                        <NextLink href="/cart" passHref>
                            <Link>Cart</Link>
                        </NextLink>
                        <NextLink href="/login" passHref>
                            <Link>Login</Link>
                        </NextLink>
                    </div>
                </Toolbar>
            </AppBar>
            <Container className={classes.main}>
                {children}
            </Container>
            <footer className={classes.footer}>
                <Typography>
                    Next Commerce 2021 - All rights reserved
                </Typography>
            </footer>
        </div>
    )
}
