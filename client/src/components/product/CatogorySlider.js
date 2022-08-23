import styled from '@emotion/styled';
import { Box, Typography } from '@mui/material';
import Carousal from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { Link } from 'react-router-dom';
import CategoryItem from './CategoryItem';


const Container = styled(Box)`
    margin: 8px 8px;
    background-color: white;
`;

const Heading = styled(Typography)`
    font-size: 30px;
    font-weight: 400;
    padding: 20px 20px;
    border-bottom: 1px solid lightgray;
`;

const responsive = {
    desktop: {
        breakpoint: { max: 3000, min: 1024 },
        items: 7,
    },
    tablet: {
        breakpoint: { max: 1024, min: 464 },
        items: 4,
    },
    mobile: {
        breakpoint: { max: 464, min: 0 },
        items: 1,
    },
};



const CatogorySlider = ({ products, heading, category }) => {

    const filteredProducts = products.filter(product => product.category === category);

    return (
        <Container>
            <Heading>
                {heading}
            </Heading>
            <Carousal
                swipeable={false}
                draggable={false}
                responsive={responsive}
                autoPlaySpeed={4000}
                keyBoardControl={true}
                transitionDuration={500}
                containerClass="carousel-container"
                slidesToSlide={1}
            >
                {filteredProducts.map((product) => (
                    <Box key={product._id}>
                        <Link to={`/product/${product._id}`}>
                            <CategoryItem product={product} />
                        </Link>
                    </Box>
                ))}
            </Carousal>
        </Container>
    )
}

export default CatogorySlider