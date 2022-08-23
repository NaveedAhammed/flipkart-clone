import { Box, Button, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router'
import { getProduct } from '../../service/api';
import styled from '@emotion/styled';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import FlashOnIcon from '@mui/icons-material/FlashOn';
import CircularProgress from '@mui/material/CircularProgress';
import AutorenewIcon from '@mui/icons-material/Autorenew';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import { add } from '../../redux/cartRedux';
import { toast } from 'react-toastify';
import StripeCheckout from "react-stripe-checkout";

const Container = styled(Box)`
    width: 100vw;
    min-height: 100vh;
    margin: 56px 76.6px 0 76.6px;
    max-width: 1366px;
    display: flex;
    flex-direction: column;
`;

const LeftWrapper = styled(Box)`
    padding: 10px;
`;

const RightWrapper = styled(Box)`
    flex: 1;
    padding: 20px 15px;
    width: 100%;
`;

const Image = styled("img")({
    objectFit: 'contain',
    width: '440px',
    height: '528px'
})

const Title = styled(Typography)`
    font-weight: 400;
    font-size: 18px;
    margin-bottom: 8px;
`;

const BillSection = styled(Box)`
    display: flex;
    align-items: center;
    margin-bottom: 15px;
`;

const Price = styled(Box)`
    font-size: 28px;
    font-weight: 500;
`;

const OriginalPrice = styled(Box)`
    font-size: 16px;
    color: #878787;
    text-decoration: line-through;
    margin-left: 12px;
`;

const Discount = styled(Box)`
    color: #26a541;
    font-size: 16px;
    font-weight: 500;
    margin-left: 12px;
`;

const Info = styled("img")({
    fontSize: '14px',
    width: '18px',
    marginLeft: '12px'
});

const RatingSection = styled(Box)`
    display: flex;
    align-items: center;
    margin-bottom: 10px;
`;

const Rating = styled(Box)`
    background-color: #26a541;
    color: white;
    font-size: 16px;
    font-weight: 500;
    padding: 2px 7px;
    border-radius: 14px;
`
const Counts = styled(Box)`
    color: #878787;
    font-weight: 500;
    font-size: 16px;
    margin-left: 8px;
`;

const OffersSection = styled(Box)`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
`;

const AvailableOffers = styled(Typography)`
    font-size: 16px;
    font-weight: 500;
    margin-bottom: 10px;
`;

const BankOffer = styled(Typography)`
    font-size: 14px;
    font-weight: 500;
    margin-right: 8px;
`;

const OfferItem = styled(Box)`
    display: flex;
    align-items: center;
    margin-bottom: 10px;
`;

const CustomButton = styled(Button)`
    padding: 18px 8px;
    color: white;
    border-radius: 2px;
    font-size: 16px;
    font-weight: 500;
    height: 56px;
    width: 220px;
`;

const Tag = styled("img")({
    width: '18px',
    height: '18px',
    marginRight: '10px'
});

const OfferType = styled(Box)`
    font-size: 14px;
    margin-right: 10px;
`;

const OfferDetails = styled(Box)`
    color: #2874f0; 
    font-size: 14px; 
    font-weight: 500; 
`;

const DeliverySection = styled(Box)`
    display: flex;
    align-items: flex-start;
    margin-top: 20px;
`;

const Heading = styled(Typography)`
    color: #878787;
    font-size: 14px;
    font-weight: 500;
    padding-right: 40px;
`;

const Delivery = styled(Typography)`
    font-size: 14px;
    font-weight: 500;
    display: flex;
    align-items: center;
    margin-bottom: 5px;
`;

const KEY = process.env.REACT_APP_STRIPE

const Product = () => {

    const [product, setProduct] = useState(null);
    const { productId } = useParams();
    const dispatch = useDispatch();

    const date = new Date();
    date.setDate(date.getDate() + 2);
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const deliveryDate = date.toLocaleString("en-US", options);
    const { user } = useSelector(state => state.user);

    const addToCartHandler = () => {
        dispatch(add({ product }));
        toast("Added successfully");
    }

    useEffect(() => {
        const getProductFromBackend = async () => {
            const data = await getProduct(dispatch, productId);
            setProduct(data.data);
        }

        getProductFromBackend();
    }, [productId, dispatch]);

    const Loading = <Box style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100vw', height: '100vh' }}><CircularProgress /></Box>

    const discountPrice = product !== null ? product.price * 100 / (100 - product.discount) : 0;

    const placeOrderHandler = () => {
        if (!user) {
            toast("Please login to proceed");
        }
    }

    const onToken = (token) => {
        console.log(token);
    }

    const Content = <Container>
        <Box style={{ display: 'flex', backgroundColor: 'white', width: '100%' }}>
            <LeftWrapper>
                <Box style={{ border: '1px solid lightGray', marginBottom: '15px', padding: '5px' }}>
                    <Image src={product === null ? "" : product.imageUrl} />
                </Box>
                <Box style={{ display: 'flex', alignItems: 'center' }}>
                    <CustomButton style={{ backgroundColor: '#ff9f00', marginRight: '10px' }} onClick={addToCartHandler}><ShoppingCartIcon /> Add To Cart</CustomButton>
                    <StripeCheckout
                        name="Flipkart"
                        description={`Your total is ${product === null ? "" : product.price}`}
                        ComponentClass="div"
                        panelLabel="Give Money"
                        amount={product === null ? "" : product.price * 100}
                        currency="INR"
                        stripeKey={KEY}
                        shippingAddress
                        billingAddress
                        zipCode={false}
                        allowRememberMe // "Remember Me" option (default true)
                        token={onToken}
                        disabled={user === null}
                    >
                        <CustomButton style={{ backgroundColor: '#fb641b' }} onClick={placeOrderHandler} ><FlashOnIcon /> Buy Now</CustomButton>
                    </StripeCheckout>
                </Box>
            </LeftWrapper>
            <RightWrapper>
                <Title>{product === null ? "" : product.title}</Title>
                <RatingSection>
                    <Rating component='span'>
                        <span>{product === null ? "" : product.rating}</span>
                        <img src='data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMyIgaGVpZ2h0PSIxMiI+PHBhdGggZmlsbD0iI0ZGRiIgZD0iTTYuNSA5LjQzOWwtMy42NzQgMi4yMy45NC00LjI2LTMuMjEtMi44ODMgNC4yNTQtLjQwNEw2LjUuMTEybDEuNjkgNC4wMSA0LjI1NC40MDQtMy4yMSAyLjg4Mi45NCA0LjI2eiIvPjwvc3ZnPg==' alt='Star' />
                    </Rating>
                    <Counts component='span'>{product === null ? "" : product.ratingsCount.toLocaleString("en-IN")} ratings and {product === null ? "" : product.reviewsCount.toLocaleString("en-IN")} reviews</Counts>
                    <img style={{ marginLeft: '12px', fontSize: '28px', width: '66px' }} src='https://static-assets-web.flixcart.com/fk-p-linchpin-web/fk-cp-zion/img/fa_62673a.png' alt='Assured' />
                </RatingSection>
                <BillSection>
                    <Price component='span'>&#8377;{product === null ? "" : product.price.toLocaleString("en-IN")}</Price>
                    <OriginalPrice component='span'>&#8377;{product === null ? "" : discountPrice.toLocaleString("en-IN")}</OriginalPrice>
                    <Discount component='span'>{product === null ? "" : product.discount}% off</Discount>
                    <Info src='https://static-assets-web.flixcart.com/fk-p-linchpin-web/fk-cp-zion/img/info-basic_6c1a38.svg' />
                </BillSection>
                <OffersSection>
                    <AvailableOffers>
                        Available offers
                    </AvailableOffers>
                    <OfferItem>
                        <Tag src='https://rukminim1.flixcart.com/www/36/36/promos/06/09/2016/c22c9fc4-0555-4460-8401-bf5c28d7ba29.png?q=90' alt='Tag' />
                        <BankOffer>Partner Offer</BankOffer>
                        <OfferType component='span'>Purchase this product & win a surprise cashback coupon for The Big Billion Days Sale 2022</OfferType>
                        <OfferDetails component='span'>Know More</OfferDetails>
                    </OfferItem>
                    <OfferItem>
                        <Tag src='https://rukminim1.flixcart.com/www/36/36/promos/06/09/2016/c22c9fc4-0555-4460-8401-bf5c28d7ba29.png?q=90' alt='Tag' />
                        <BankOffer>Partner Offer</BankOffer>
                        <OfferType component='span'>Earn Extra 10% Up to ₹100 SuperCoins</OfferType>
                        <OfferDetails component='span'>Know More</OfferDetails>
                    </OfferItem>
                    <OfferItem>
                        <Tag src='https://rukminim1.flixcart.com/www/36/36/promos/06/09/2016/c22c9fc4-0555-4460-8401-bf5c28d7ba29.png?q=90' alt='Tag' />
                        <BankOffer>Bank Offer</BankOffer>
                        <OfferType component='span'>10% off on Citi Credit and Debit Cards, up to ₹3,000. On orders of ₹5,000 and above</OfferType>
                        <OfferDetails component='span'>T&C</OfferDetails>
                    </OfferItem>
                    <OfferItem>
                        <Tag src='https://rukminim1.flixcart.com/www/36/36/promos/06/09/2016/c22c9fc4-0555-4460-8401-bf5c28d7ba29.png?q=90' alt='Tag' />
                        <BankOffer>Bank Offer</BankOffer>
                        <OfferType component='span'>10% off on Bank of Baroda Credit Cards, up to ₹1,500. On orders of ₹5,000 and above</OfferType>
                        <OfferDetails component='span'>T&C</OfferDetails>
                    </OfferItem>
                    <OfferItem>
                        <Tag src='https://rukminim1.flixcart.com/www/36/36/promos/06/09/2016/49f16fff-0a9d-48bf-a6e6-5980c9852f11.png?q=90' alt='Tag' />
                        <OfferType component='span'>No Cost EMI on Bajaj Finserv EMI Card on cart value above ₹2999</OfferType>
                        <OfferDetails component='span'>T&C</OfferDetails>
                    </OfferItem>
                    <OfferItem>
                        <Tag src='https://rukminim1.flixcart.com/www/36/36/promos/06/09/2016/c22c9fc4-0555-4460-8401-bf5c28d7ba29.png?q=90' alt='Tag' />
                        <BankOffer>Bank Offer</BankOffer>
                        <OfferType component='span'>10% off on OneCard Credit Cards, up to ₹1,500. On orders of ₹5,000 and above</OfferType>
                        <OfferDetails component='span'>T&C</OfferDetails>
                    </OfferItem>
                    <OfferItem>
                        <Tag src='https://rukminim1.flixcart.com/www/36/36/promos/06/09/2016/c22c9fc4-0555-4460-8401-bf5c28d7ba29.png?q=90' alt='Tag' />
                        <BankOffer>Partner Offer</BankOffer>
                        <OfferType component='span'>Sign up for Flipkart Pay Later and get Flipkart Gift Card worth upto ₹500*</OfferType>
                        <OfferDetails component='span'>Know More</OfferDetails>
                    </OfferItem>
                    <OfferItem>
                        <Tag src='https://rukminim1.flixcart.com/www/36/36/promos/06/09/2016/c22c9fc4-0555-4460-8401-bf5c28d7ba29.png?q=90' alt='Tag' />
                        <BankOffer>Bank Offer</BankOffer>
                        <OfferType component='span'>5% Cashback on Flipkart Axis Bank Card</OfferType>
                        <OfferDetails component='span'>T&C</OfferDetails>
                    </OfferItem>
                </OffersSection>
                <DeliverySection>
                    <Heading>Delivery</Heading>
                    <Delivery>Delivery by {deliveryDate} | <span style={{ color: '#388e3c', marginLeft: 5, marginRight: 5 }}>Free</span></Delivery>
                </DeliverySection>
                <DeliverySection>
                    <Heading>Services</Heading>
                    <Box style={{ display: 'flex', flexDirection: 'column' }}>
                        <Delivery><AutorenewIcon fontSize='small' style={{ marginRight: 5, color: '#2874f0' }} /> 7 Days Return Policy</Delivery>
                        <Delivery><CurrencyRupeeIcon fontSize='small' style={{ marginRight: 5, color: '#2874f0' }} /> Cash on Delivery available</Delivery>
                    </Box>
                </DeliverySection>
            </RightWrapper>
        </Box>
    </Container>

    return (
        <>
            {product !== null ? Content : Loading}
        </>

    )
}

export default Product