'use client';

import React, { useState, useEffect } from "react";
import axios from 'axios';
import { AppBar, Box, Button, Container, TextField, InputAdornment, Toolbar, IconButton } from "@mui/material";
import { ExitToApp } from "@mui/icons-material";
import { useRouter } from "next/navigation";

const ProfilePage: React.FC = () => {
    const [profile, setProfile] = useState({
        name: "",
        surname: "",
        email: "",
        phoneNumber: "",
        birthDate: "", // Tarihi string olarak saklayacağız
    });
    const router = useRouter();

    useEffect(() => {
        const fetchProfile = async () => {
            const token = localStorage.getItem('authToken');
            console.log('Token:', token);
            if (!token) {
                alert("Token bulunamadı. Lütfen tekrar giriş yapın.");
                router.push('/');
                return;
            }

            try {
                const response = await axios.get('http://localhost:8080/api/users/myprofile', {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`,
                    },
                });

                if (response.status === 200) {
                    const data = response.data;
                    setProfile({
                        ...data,
                        birthDate: data.birthDate || "", // Ensure it's an empty string if birthDate is not present
                    });
                }
            } catch (error) {
                console.error("Profil bilgileri alınamadı:", error);
                alert("Profil bilgileri alınırken bir hata oluştu.");
            }
        };

        fetchProfile();
    }, []);

    const navigateToProfile = () => {
        router.push('/myprofile');
    };
    const navigateToAllEvents = () => {
        router.push('/allevents');
    };
    const navigateToFavorites = () => {
        router.push('/favorites');
    };
    const navigateToCreateEvent = () => {
        router.push('/createvent');
    };
    const navigateToHome= () => {
        router.push('/user');
    };

    const handleLogout = () => {
        localStorage.removeItem('authToken'); // Token'ı temizle
        router.push('/'); // Giriş sayfasına yönlendir
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setProfile({
            ...profile,
            [e.target.name]: e.target.value,
        });
    };

    return (
        <Box
            sx={{
                backgroundImage: 'url(https://images.pexels.com/photos/62693/pexels-photo-62693.jpeg)',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                minHeight: '100vh',
                color: 'white',
            }}
        >
            <AppBar position="static" sx={{ backgroundColor: 'rgba(0, 0, 0, 0.8)', elevation: 0 }}>
                <Toolbar sx={{ justifyContent: "space-between" }}>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Button onClick={navigateToHome} sx={{ textTransform: 'none', color: 'white', fontSize: '32px', fontWeight: 'bold' }}>
                            EventCenter
                        </Button>
                    </Box>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                        <IconButton color="inherit" onClick={handleLogout}>
                            <ExitToApp />
                        </IconButton>
                    </Box>
                </Toolbar>
            </AppBar>

            <Container maxWidth="sm" sx={{ mt: 4 }}>
                <Box component="form" sx={{ display: "flex", flexDirection: "column" }}>
                    <TextField label="Ad" name="name" value={profile.name} onChange={handleChange} disabled sx={{ marginBottom: 2 }} />
                    <TextField label="Soyad" name="surname" value={profile.surname} onChange={handleChange} disabled sx={{ marginBottom: 2 }} />
                    <TextField label="E-posta" name="email" value={profile.email} disabled sx={{ marginBottom: 2 }} />
                    <TextField
                        label="Telefon Numarası"
                        name="phoneNumber"
                        value={profile.phoneNumber}
                        onChange={handleChange}
                        disabled
                        sx={{ marginBottom: 2 }}
                        InputProps={{ startAdornment: <InputAdornment position="start">+90</InputAdornment> }}
                    />
                    <TextField label="Doğum Tarihi" name="birthDate" value={profile.birthDate} disabled sx={{ marginBottom: 2 }} />
                </Box>
            </Container>
        </Box>
    );
};

export default ProfilePage;
