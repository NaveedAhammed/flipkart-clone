import styled from "@emotion/styled";
import { Box } from "@mui/material";
import React from "react";

const Container = styled(Box)`
	width: 220px;
    height: fit-content;
	background-color: white;
`;

const Wrapper = styled(Box)`
	padding: 20px;
	display: flex;
	flex-direction: column;
	background-color: white;
    &:hover{
        color: #2874f0;
    }
`;

const Image = styled("img")({
    height: '180px',
    width: '100%',
    objectFit: 'contain',
    paddingBottom: '16px',
    marginBottom: '5px',
    cursor: 'pointer',
});

const Detailes = styled(Box)`
	display: flex;
	flex-direction: column;
`;

const Title = styled(Box)`
	font-size: 14px;
	padding-bottom: 5px;
    cursor: pointer;
    line-height: 19.6px;
    &:hover {
        color: #2874f0;
    }
`;

const Rating = styled(Box)`
	background-color: #388e3c;
	color: white;
	font-size: 12px;
	padding: 2px 4px 2px 6px;
	display: flex;
	align-items: center;
	width: fit-content;
	height: fit-content;
	border: none;
	border-radius: 2px;
`;

const Star = styled("img")`
	height: 10px;
`;

const Assured = styled("img")`
	height: 21px;
`;

const ProductItem = (props) => {
    return (
        <Container>
            <Wrapper>
                <Image src={props.img} />
                <Detailes>
                    <Title>{props.title.slice(0, 45)}...</Title>
                    <Box style={{ display: "flex", alignItems: "center", marginBottom: 3 }}>
                        <Box
                            style={{
                                display: "inline-block",
                                paddingRight: 10,
                                flex: 1
                            }}
                        >
                            <Box style={{ display: "inline-block" }}>
                                <Rating component="span">
                                    <Box
                                        style={{
                                            display: "inline-block",
                                            marginRight: 2,
                                        }}
                                    >
                                        {props.rating}
                                    </Box>
                                    <Star src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMyIgaGVpZ2h0PSIxMiI+PHBhdGggZmlsbD0iI0ZGRiIgZD0iTTYuNSA5LjQzOWwtMy42NzQgMi4yMy45NC00LjI2LTMuMjEtMi44ODMgNC4yNTQtLjQwNEw2LjUuMTEybDEuNjkgNC4wMSA0LjI1NC40MDQtMy4yMSAyLjg4Mi45NCA0LjI2eiIvPjwvc3ZnPg==" />
                                </Rating>
                            </Box>
                            <Box
                                component="span"
                                style={{
                                    fontSize: 14,
                                    fontWeight: 500,
                                    color: "#878787",
                                    paddingLeft: 2,
                                }}
                            >
                                ({props.ratingsCount})
                            </Box>
                        </Box>
                        <Assured src="https://static-assets-web.flixcart.com/fk-p-linchpin-web/fk-cp-zion/img/fa_62673a.png" />
                    </Box>
                    <Box style={{ margin: "3 0 3 0" }}>
                        <Box style={{ display: "flex", alignItems: "center" }}>
                            <Box
                                component="span"
                                style={{ fontSize: 16, fontWeight: 500, color: 'black' }}
                            >
                                &#8377;{props.price}
                            </Box>
                            <Box
                                component="span"
                                style={{
                                    fontSize: 14,
                                    fontWeight: 500,
                                    color: "#878787",
                                    textDecoration: "line-through",
                                    marginLeft: 8,
                                }}
                            >
                                &#8377;{props.price}
                            </Box>
                            <Box
                                component="span"
                                style={{
                                    fontSize: 12,
                                    fontWeight: 500,
                                    color: "#388e3c",
                                    marginLeft: 8,
                                }}
                            >
                                {props.discount}% off
                            </Box>
                        </Box>
                    </Box>
                </Detailes>
            </Wrapper>
        </Container>
    );
};

export default ProductItem;
