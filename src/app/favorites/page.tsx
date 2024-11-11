'use client';

import React from 'react';
import { Box, AppBar, Toolbar, Typography, Button, IconButton } from '@mui/material';
import {ExitToApp, Menu} from '@mui/icons-material';
import {useRouter} from "next/navigation";

const FavoritesPage = () => {

    const router = useRouter();

    const navigateToCreateEvent = () => {
        router.push('/createvent');
    };

    const navigateToAllEvents = () => {
        router.push('/allevents');
    };
    const navigateToFavorites = () => {
        router.push('/favorites');
    };
    const navigateToProfile = () => {
        router.push('/myprofile');
    };
    const navigateToHome= () => {
        router.push('/user');
    };
    const handleLogout = () => {
        router.push('/');
    };

    return (
        <Box
            sx={{
                backgroundImage: 'url(https://images.pexels.com/photos/62693/pexels-photo-62693.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1)',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                minHeight: '100vh',
                color: 'white',
            }}
        >
            {/* AppBar Section */}
            <AppBar position="static" sx={{ backgroundColor: 'rgba(0, 0, 0, 0.8)', elevation: 0 }}>
                <Toolbar sx={{ justifyContent: "space-between" }}>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Button onClick={navigateToHome} sx={{ textTransform: 'none', color: 'white', fontSize: '32px', fontWeight: 'bold' }}>
                            EventCenter
                        </Button>
                    </Box>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                        <Button color="inherit" onClick={navigateToAllEvents} sx={{ textTransform: 'none' }}>Tüm Etkinliklerim</Button>
                        <Button color="inherit" onClick={navigateToFavorites} sx={{ textTransform: 'none' }}>Favorilerim</Button>
                        <Button color="inherit" onClick={navigateToProfile} sx={{ textTransform: 'none' }}>Profilim</Button>
                        <Button variant="contained" color="error" onClick={navigateToCreateEvent} sx={{ textTransform: 'none' }}>Etkinlik Oluşturmak İstiyorum</Button>
                        <IconButton color="inherit" onClick={handleLogout}>
                            <ExitToApp />
                        </IconButton>
                    </Box>
                </Toolbar>
            </AppBar>


        </Box>
    );
}

export default FavoritesPage;
