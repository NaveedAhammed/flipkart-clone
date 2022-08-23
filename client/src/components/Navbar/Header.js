import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import styled from '@emotion/styled';
import { Typography } from '@mui/material';

// components
import Search from './Search';
import CustomButtons from './CustomButtons';
import { Link } from 'react-router-dom';

const StyledHeader = styled(AppBar)`
    background: #2874f0;
    height: 55px;
    justify-content: center;
`;

const Container = styled(Box)`
    margin-left: 12%;
    line-height: 0;
`;

const SubHeading = styled(Typography)`
    font-style: italic;
    font-size: 11px;
    display: flex;
    align-items: center;
    cursor: pointer;
    &:hover {
        text-decoration: underline;
    }
`;

const PlusImage = styled('img')({
    width: 10,
    height: 10,
    marginLeft: 4
})

const Header = () => {

    const logoUrl = "https://static-assets-web.flixcart.com/fk-p-linchpin-web/fk-cp-zion/img/flipkart-plus_8d85f4.png";
    const subLogoUrl = "https://static-assets-web.flixcart.com/fk-p-linchpin-web/fk-cp-zion/img/plus_aef861.png";
    return (
        <Box sx={{ flexGrow: 1 }}>
            <StyledHeader elevation={0}>
                <Toolbar>
                    <Container>
                        <Link to='/'>
                            <img src={logoUrl} alt="logo" style={{ height: 20.113 }} />
                            <Box style={{ display: 'flex' }}>
                                <SubHeading>Explore <Box component="span" style={{ color: '#FFE500', fontWeight: 500, marginLeft: 2, fontSize: 11, fontStyle: 'italic' }}>Plus</Box></SubHeading>
                                <PlusImage src={subLogoUrl} alt='Plus' />
                            </Box>
                        </Link>
                    </Container>
                    <Search />
                    <CustomButtons />
                </Toolbar>
            </StyledHeader>
        </Box>
    );
}


export default Header