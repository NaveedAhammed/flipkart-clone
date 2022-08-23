import { Badge, Box, Button, MenuItem, Typography } from "@mui/material";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import styled from "@emotion/styled";
import LoginDialog from "../login/LoginDialog";
import { useState } from "react";
import { useSelector } from "react-redux";
import Profile from "../home/Profile";
import { Link } from "react-router-dom";

const Wrapper = styled(Box)`
    display: flex;
    align-items: center;
    margin: 0 auto 0 3%;
    & > button, & > p, & > div {
        margin-right: 40px;
        font-size: 14px;
    }
`;

const Container = styled(Box)`
    display: flex;
    align-items: center;
`;

const LoginButton = styled(Button)`
    color: #2874f0;
    background-color: #fff;
    text-transform: none;
    padding: 5px 40px;
    border-radius: 2px;
    box-shadow: none;
    height: 32px;

    &:hover {
        color: #2874f0;
        background-color: #fff;
    }
`;

const CustomButtons = () => {
    const [open, setOpen] = useState(false);
    const { user } = useSelector(state => state.user);
    const { products } = useSelector(state => state.cart);

    const LoginDialogHandler = () => {
        setOpen(prev => !prev);
    }

    return (
        <Wrapper>
            {user !== null ? <Profile /> : <LoginButton variant="contained" onClick={LoginDialogHandler}>Login</LoginButton>}
            <Typography style={{ width: 135, fontSize: 16, fontWeight: '500' }}>Become a Seller</Typography>
            <Typography style={{ fontSize: 16, fontWeight: '500' }}>More</Typography>
            <Link to='/cart'>
                <Container>
                    <MenuItem>
                        <Badge badgeContent={products.length} color="warning">
                            <ShoppingCartIcon />
                        </Badge>
                        <Typography>Cart</Typography>
                    </MenuItem>
                </Container>
            </Link>
            <LoginDialog open={open} setOpen={setOpen} />
        </Wrapper>
    )
}

export default CustomButtons