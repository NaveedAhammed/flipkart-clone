import styled from "@emotion/styled";
import { Box, Button, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import CartItem from "./CartItem";
import { toast } from 'react-toastify';
import StripeCheckout from "react-stripe-checkout";
import { useEffect, useState } from "react";
import { setCart } from "../../redux/cartRedux";
import { Link } from "react-router-dom";

const Container = styled(Box)`
	margin-top: 56px;
	background-color: #f1f3f6;
	width: 100vw;
	height: 100%;
	display: flex;
	justify-content: center;
`;

const CartContainer = styled(Box)`
	display: flex;
	width: 100%;
	align-items: flex-start;
	margin: 0 150px;
    flex: 1;
`;

const LeftWrapper = styled(Box)`
    flex: 8;
	overflow: hidden;
	margin: 8px;
	background-color: white;
	box-shadow: rgb(0 0 0 / 20%) 0px 1px 2px 0px;
`;

const RightWrapper = styled(Box)`
	margin: 8px;
	background-color: white;
	box-shadow: rgb(0 0 0 / 20%) 0px 1px 2px 0px;
    flex: 3;
`;

const Title = styled(Typography)`
	padding: 10px 20px;
	font-size: 20px;
	font-weight: 500;
	border-bottom: 1px solid lightgray;
`;

const PriceDetails = styled(Typography)`
	font-size: 16px;
	font-weight: 500;
	color: #878787;
	padding: 13px 24px;
	border-bottom: 1px solid lightgray;
`;

const PriceDetailItem = styled(Box)`
	display: flex;
	align-items: center;
	justify-content: space-between;
	margin: 20px 24px;
`;

const Line = styled(Box)`
	border-bottom: 1px dashed lightgray;
	margin-right: 24px;
	margin-left: 24px;
`;

const PlaceOrderSection = styled(Box)`
	box-shadow: 0 -2px 10px 0 rgb(0 0 0 / 10%);
	padding: 16px 22px;
	background-color: white;
	text-align: right;
`;

const CustomButton = styled(Button)`
	padding: 16px 30px;
	color: white;
	border-radius: 2px;
	font-size: 16px;
	font-weight: 500;
	height: 56px;
	width: 250px;
	background-color: #fb641b;
	&:hover {
		color: white;
		background-color: #fb641b;
	}
`;

const NoItems = styled(Box)`
    height: 80vh; 
    width: 80vw;
    display: flex; 
    align-items: center; 
    justify-content: center; 
    background-color: white;
    flex-direction: column;
`;

const ShopNow = styled("button")({
    color: 'white',
    backgroundColor: 'rgb(40, 116, 240)',
    boxShadow: '0 2px 4px 0 rgb(0 0 0 / 20%)',
    border: 'none',
    padding: '12px 72px',
    marginTop: '15px',
    cursor: 'pointer'

});

const KEY = process.env.REACT_APP_STRIPE

const Cart = () => {

    const [stripeToken, setStripeToken] = useState(null);

    const onToken = (token) => {
        setStripeToken(token);
    }



    const { products, totalAmount, discountAmount, originalAmount } = useSelector(state => state.cart);
    const { user } = useSelector(state => state.user);
    const dispatch = useDispatch();

    const placeOrderHandler = () => {
        if (!user) {
            toast("Please login to proceed");
        }
    }

    useEffect(() => {
        const makeRequest = async () => {
            dispatch(setCart());
        }

        stripeToken && makeRequest();
    }, [stripeToken, dispatch])

    return (
        <Container>
            {products.length !== 0 ?
                <CartContainer>
                    <LeftWrapper>
                        <Title>Shopping Cart</Title>
                        <Box style={{ maxHeight: "70vh", overflowY: 'scroll' }}>
                            {products.map((product) => (
                                <CartItem key={product._id} product={product} />
                            ))}
                        </Box>
                        <PlaceOrderSection>
                            <StripeCheckout
                                name="Flipkart"
                                description={`Your total is ${totalAmount}`}
                                ComponentClass="div"
                                panelLabel="Give Money"
                                amount={totalAmount * 100}
                                currency="INR"
                                stripeKey={KEY}
                                shippingAddress
                                billingAddress
                                zipCode={false}
                                allowRememberMe // "Remember Me" option (default true)
                                token={onToken}
                                disabled={user === null}
                            >
                                <CustomButton onClick={placeOrderHandler}>Place Order</CustomButton>
                            </StripeCheckout>
                        </PlaceOrderSection>
                    </LeftWrapper>
                    <RightWrapper>
                        <PriceDetails>PRICE DETAILS</PriceDetails>
                        <PriceDetailItem>
                            <span>Price ({products.length} items)</span>
                            <span>&#8377;{originalAmount.toLocaleString("en-IN")}</span>
                        </PriceDetailItem>
                        <PriceDetailItem>
                            <span>Discount</span>
                            <span style={{ color: "#388e3c" }}>-&#8377;{discountAmount.toLocaleString("en-IN")}</span>
                        </PriceDetailItem>
                        <PriceDetailItem>
                            <span>Delivery Charges</span>
                            <span style={{ color: "#388e3c" }}>FREE</span>
                        </PriceDetailItem>
                        <Line></Line>
                        <PriceDetailItem>
                            <span style={{ fontSize: 18, fontWeight: 500 }}>
                                Total Amount
                            </span>
                            <span style={{ fontSize: 18, fontWeight: 500 }}>
                                &#8377;{totalAmount.toLocaleString("en-IN")}
                            </span>
                        </PriceDetailItem>
                        <Line></Line>
                        <Typography
                            style={{
                                color: "#388e3c",
                                fontSize: 16,
                                fontWeight: 500,
                                margin: "20px 24px",
                            }}
                        >
                            You will save ₹{discountAmount.toLocaleString("en-IN")} on this order
                        </Typography>
                    </RightWrapper>
                </CartContainer>

                :

                <NoItems>
                    <img src="https://rukminim1.flixcart.com/www/800/800/promos/16/05/2019/d438a32e-765a-4d8b-b4a6-520b560971e8.png?q=90" alt="Empty" style={{ height: '162px', marginBottom: 20 }} />
                    <Typography variant="h5" style={{ marginBottom: 10 }}>Your cart is empty!</Typography>
                    <Typography variant="p">Add items to it now.</Typography>
                    <Link to='/'>
                        <ShopNow>Shop Now</ShopNow>
                    </Link>
                </NoItems>
            }
        </Container>
    );
};

export default Cart;
