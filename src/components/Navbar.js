import React, { useState } from 'react'
import { LightModeOutlined, DarkModeOutlined, Menu as MenuIcon, Search, SettingsOutlined, ArrowDropDownOutlined } from '@mui/icons-material'
import FlexBetween from './FlexBetween';
import { useDispatch } from 'react-redux';
import { setMode } from 'features/ThemeSlice';
import profileImg from "../assets/person.jpg"
import { AppBar, Button, IconButton, InputBase, Menu, MenuItem, Toolbar, useTheme } from '@mui/material';
import { Box, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

function Navbar({ isSidebarOpen, setIsSidebarOpen, user }) {
    const dispatch = useDispatch();
    const navigate=useNavigate()
    const theme = useTheme();
    const [anchorEl, setAnchorEl] = useState(null);
    const isOpen = Boolean(anchorEl);
    const handleClick = (e) => setAnchorEl(e.currentTarget);
    const handleClose = () => {
        setAnchorEl(null)
        localStorage.removeItem('userData')
        navigate('/')
    }
    return (
        <AppBar
            sx={{
                position: "static",
                background: "none",
                boxShadow: "none"
            }}
        >
            <Toolbar sx={{ justifyContent: "space-between" }}>
                <FlexBetween>
                    <IconButton onClick={() => { setIsSidebarOpen(!isSidebarOpen) }}>
                        <MenuIcon />
                    </IconButton>
                    <FlexBetween
                        backgroundColor={theme.palette.background.alt}
                        borderRadius="9px"
                        gap="3rem"
                        p="0.1rem 1.5rem"
                    >

                        <InputBase placeholder='Search...' />
                        <IconButton>
                            <Search />
                        </IconButton>
                    </FlexBetween>
                </FlexBetween>
                <FlexBetween gap="1.5rem">

                    <IconButton onClick={() => dispatch(setMode())}>
                        {
                            theme.palette.mode === "dark" ? (
                                <DarkModeOutlined sx={{ fontSize: "25px" }} />
                            ) : (
                                <LightModeOutlined sx={{ fontSize: "25px" }} />
                            )
                        }
                    </IconButton>
                    <IconButton>
                        <SettingsOutlined sx={{ fontSize: "25px" }} />
                    </IconButton>
                    <FlexBetween>
                        <Button onClick={handleClick}
                            sx={{
                                display: "flex",
                                justifyContent: "space-between",
                                alignItens: "center",
                                textTransform: "none",
                                gap: "1rem"
                            }}
                        >
                            <Box
                                component="img"
                                alt="profile"
                                // src={profileImg}
                                height="40px"
                                width="40px"
                                borderRadius="50%"
                                sx={{ objectFit: "cover" }}
                            />
                            <Box textAlign="left">
                                <Typography
                                    fontWeight="bold"
                                    fontSize="0.9rem"
                                    sx={{ color: theme.palette.secondary[100] }}
                                >
                                    {user?.name}
                                </Typography>
                                <Typography
                                    fontWeight="bold"
                                    fontSize="0.8rem"
                                    sx={{ color: theme.palette.secondary[200] }}
                                >
                                    {user?.occupation}
                                </Typography>
                            </Box>
                            <ArrowDropDownOutlined
                                sx={{ color: theme.palette.secondary[300], fontSize: "25px" }}
                            />

                        </Button>
                        <Menu anchorEl={anchorEl} open={isOpen}
                            onClose={handleClose}
                            anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
                        >
                            <MenuItem onClick={handleClose}>
                                Log out
                            </MenuItem>
                        </Menu>
                    </FlexBetween>
                </FlexBetween>
            </Toolbar>
        </AppBar>
    )
}

export default Navbar