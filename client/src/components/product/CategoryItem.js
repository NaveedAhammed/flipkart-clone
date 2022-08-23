import styled from '@emotion/styled';
import { Box, Typography } from '@mui/material';



const Item = styled(Box)`
    padding: 20px;
	display: flex;
	flex-direction: column;
	background-color: white;
    align-items: center;
    &:hover{
        color: #2874f0;
    }
`;

const Image = styled("img")({
    height: '180px',
    width: '95%',
    objectFit: 'contain',
    paddingBottom: '16px',
    marginBottom: '5px',
    cursor: 'pointer',
    '&:hover': {
        height: '185px',
        width: '100%'
    }
});

const Title = styled(Typography)`
    font-size: 14px;
    margin-top: 15px;
    font-weight: 500;
`;

const Price = styled(Typography)`
    font-size: 16px;
    padding-top: 8px;
    color: gray;
`;

const Discount = styled(Typography)`
    font-size: 16px;
    padding-top: 8px;
    color: #388e3c;
`;

const CategoryItem = ({ product }) => {

    return (
        <Item>
            <Box style={{ height: '190px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Image src={product.imageUrl} />
            </Box>
            <Title>
                {product.title.slice(0, 20)}...
            </Title>
            <Discount>
                With {product.discount}% off
            </Discount>
            <Price>
                Only at &#8377;{product.price}
            </Price>
        </Item>
    )
}

export default CategoryItem