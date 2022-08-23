import styled from "@emotion/styled";
import { Box, Typography } from "@mui/material";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { add, remove, subtract } from "../../redux/cartRedux";
import { toast } from 'react-toastify';

const Container = styled(Box)`
	width: 100%;
	height: fit-content;
	background-color: white;
	border-bottom: 1px solid lightgray;
`;

const Wrapper = styled(Box)`
	padding: 24px;
	display: flex;
	flex-direction: column;
`;

const Image = styled(Box)`
	height: 112px;
	width: 112px;
	cursor: pointer;
`;

const ProductDetails = styled(Box)`
	display: flex;
`;

const Details = styled(Box)`
	padding: 0 24px 12px 24px;
	display: flex;
	flex-direction: column;
	align-items: flex-start;
    flex: 1;
`;

const Title = styled(Typography)`
	height: 20px;
	overflow-y: hidden;
	overflow-x: hidden;
	font-size: 16px;
	margin-bottom: 10px;
	cursor: pointer;
	&:hover {
		color: #2874f0;
	}
`;

const OrginalPrice = styled(Box)`
	color: #878787;
	font-size: 14px;
	margin-top: 18px;
	margin-right: 10px;
	text-decoration: line-through;
`;

const Price = styled(Box)`
	font-size: 18px;
	font-weight: 500;
	margin-top: 18px;
	margin-right: 10px;
`;

const Offer = styled(Box)`
	color: #388e3c;
	font-size: 14px;
	font-weight: 500;
	margin-top: 18px;
	margin-right: 10px;
`;

const DeliverySection = styled(Box)`
	font-size: 14px;
	margin-top: 5px;
`;

const ActionButtons = styled(Box)`
	display: flex;
	align-items: center;
    margin-top: 15px;
`;

const CustomButton = styled("button")({
    border: "1px solid #c2c2c2",
    borderRadius: "50%",
    outline: "none",
    backgroundColor: "rgba(0,0,0,0)",
    width: "28px",
    height: "28px",
    marginRight: 5,
    fontSize: "16px",
    fontWeight: 500,
    cursor: 'pointer'
});

const Input = styled(Box)`
	padding: 3px 6px;
	border: 1px solid #c2c2c2;
	height: 24px;
	width: 35px;
	font-size: 14px;
	outline: none;
	margin-right: 5px;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const TextButton = styled(Box)`
	font-size: 16px;
	font-weight: 500;
	margin: 0 25px;
	cursor: pointer;
	&:hover {
		color: #2874f0;
	}
`;

const CartItem = ({ product }) => {

    const [quantity, setQuantity] = useState(product.quantity);
    const date = new Date();
    date.setDate(date.getDate() + 2);
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const deliveryDate = date.toLocaleString("en-US", options);
    const dispatch = useDispatch();

    const discountPrice = product.price * 100 / (100 - product.discount);

    const quantityHandler = (type) => {
        if (type === 'decrement') {
            quantity > 1 && setQuantity(prev => prev - 1);
            dispatch(subtract({ product }));
        } else if (type === 'increment') {
            setQuantity(prev => prev + 1);
            dispatch(add({ product }));
        } else if (type === 'remove') {
            dispatch(remove({ product }))
            toast("Deleted successfully");
        }
    }

    return (
        <Container>
            <Wrapper>
                <ProductDetails>
                    <Image>
                        <img
                            src={product.imageUrl}
                            alt="Product"
                            style={{
                                width: "100%",
                                height: "100%",
                                objectFit: "contain",
                            }}
                        />
                    </Image>
                    <Details>
                        <Title>
                            {product.title.slice(0, 35)}...
                        </Title>
                        <img
                            src="https://static-assets-web.flixcart.com/fk-p-linchpin-web/fk-cp-zion/img/fa_62673a.png"
                            alt="Assured"
                            style={{ height: "16px", width: "58px" }}
                        />
                        <Box style={{ display: "flex", alignItems: "center" }}>
                            <OrginalPrice component="span">
                                &#8377;{discountPrice.toLocaleString("en-IN")}
                            </OrginalPrice>
                            <Price component="span">&#8377;{product.price.toLocaleString("en-IN")}</Price>
                            <Offer component="span">
                                {product.discount}% Off 2 offers applied
                            </Offer>
                        </Box>
                    </Details>
                    <DeliverySection>
                        Delivery by {deliveryDate} |{" "}
                        <span
                            style={{
                                color: "#388e3c",
                                marginLeft: 5,
                                marginRight: 5,
                            }}
                        >
                            Free
                        </span>{" "}
                        <span style={{ textDecoration: "line-through" }}>
                            ₹40
                        </span>
                    </DeliverySection>
                </ProductDetails>
                <ActionButtons>
                    <CustomButton disabled={quantity === 1} onClick={() => { quantityHandler("decrement") }}>-</CustomButton>
                    <Input>{quantity}</Input>
                    <CustomButton onClick={() => { quantityHandler("increment") }}>+</CustomButton>
                    <TextButton component="span">SAVE FOR LATER</TextButton>
                    <TextButton component="span" onClick={() => { quantityHandler("remove") }}>REMOVE</TextButton>
                </ActionButtons>
            </Wrapper>
        </Container>
    );
};

export default CartItem;
