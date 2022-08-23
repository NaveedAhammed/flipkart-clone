import styled from '@emotion/styled';
import { Box, Typography } from '@mui/material';
import { CatogoryItems } from '../../constants/data';

const Container = styled(Box)`
    display: flex;
    width: 100%;
    align-items: center;
    justify-content: center;
    background-color: #fff;
    box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 1px 0px;
`;

const Wrapper = styled(Box)`
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin: 55px 130px 0 130px;
    width: 100%;
`;

const Title = styled(Typography)`
    font-size: 14px;
    font-weight: 500;
`;

const CatogoryBox = styled(Box)`
    display: flex;
    flex-direction: column; 
    align-items: center; 
    justify-content: center;
    padding: 8px 12px;
    cursor: pointer;
    &:hover{
        color: #2874f0;
    }
`;

const CatogoryNavbar = () => {
    return (
        <Container>
            <Wrapper>
                {CatogoryItems.map((catogoryItem) => (
                    <CatogoryBox key={catogoryItem.id} style={{}}>
                        <img src={catogoryItem.image} alt={catogoryItem.title} style={{ width: 64 }} />
                        <Title>{catogoryItem.title}</Title>
                    </CatogoryBox>
                ))}
            </Wrapper>
        </Container>
    )
}

export default CatogoryNavbar