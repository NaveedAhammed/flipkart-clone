import { Box, Menu, MenuItem, Typography } from '@mui/material'
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import PowerSettingsNewIcon from '@mui/icons-material/PowerSettingsNew';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import styled from '@emotion/styled';
import { logout } from '../../redux/userRedux';

const UsernameStyle = styled(Typography)`
    display: flex;
    align-items: center;
    font-size: 16px;
    font-weight: 500;
`;

const Profile = () => {

    const { user } = useSelector(state => state.user);
    const [anchorEle, setAnchorEle] = useState(null);
    const [open, setopen] = useState(false);
    const dispatch = useDispatch();

    const handleClose = () => {
        setAnchorEle(null);
        setopen(false);
    }

    const logoutHandler = () => {
        setAnchorEle(null);
        setopen(false);
        dispatch(logout());
    }

    const handleMenuOpen = (event) => {
        setAnchorEle(event.currentTarget);
        setopen(true);
    }


    return (
        <Box style={{ cursor: 'pointer' }}>
            <UsernameStyle onClick={handleMenuOpen}>{user.username} <KeyboardArrowDownIcon fontSize='10px' /></UsernameStyle>
            <Menu anchorEl={anchorEle} open={open} onClose={handleClose}>
                <MenuItem onClick={logoutHandler}>
                    <PowerSettingsNewIcon color='primary' fontSize='small' />
                    <Typography style={{ marginLeft: '10px' }}>Logout</Typography>
                </MenuItem>
            </Menu>
        </Box>
    )
}

export default Profile