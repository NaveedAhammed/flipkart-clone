import styled from '@emotion/styled';
import Carousal from 'react-multi-carousel';
import { SliderItems } from '../../constants/data';
import "react-multi-carousel/lib/styles.css";
import { Box } from '@mui/material';

const Image = styled('img')({
    width: '100%',
    cursor: 'pointer'
})

const Container = styled(Box)`
    margin: 8px 8px;
`;

const responsive = {
    desktop: {
        breakpoint: { max: 3000, min: 1024 },
        items: 1
    },
    tablet: {
        breakpoint: { max: 1024, min: 464 },
        items: 1
    },
    mobile: {
        breakpoint: { max: 464, min: 0 },
        items: 1
    }
};

const Slider = () => {
    return (
        <Container>
            <Carousal
                swipeable={false}
                draggable={false}
                responsive={responsive}
                infinite={true}
                autoPlay={true}
                autoPlaySpeed={4000}
                keyBoardControl={true}
                transitionDuration={500}
                containerClass="carousel-container"
                slidesToSlide={1}
            >
                {SliderItems.map((sliderItem) => (
                    <Image key={sliderItem.id} src={sliderItem.image} alt="Banner" />
                ))}
            </Carousal>
        </Container>

    )
}

export default Slider