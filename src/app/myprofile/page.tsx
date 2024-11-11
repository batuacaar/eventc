'use client';

import React, { useState, useEffect } from "react";
import axios from 'axios';
import { AppBar, Box, Button, Container, TextField, Typography, Avatar, InputAdornment, Toolbar, IconButton } from "@mui/material";
import {Edit, ExitToApp, Menu} from "@mui/icons-material";
import { format } from "date-fns";
import {useRouter} from "next/navigation"; // Import date-fns for formatting the date

const ProfilePage: React.FC = () => {
    const [profile, setProfile] = useState({
        name: "",
        surname: "",
        email: "",
        password: "",
        phoneNumber: "",
        birthDate: new Date(), // Defaulting to current date
    });
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



    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const response = await axios.get('http://localhost:8080/api/users/myprofile');
                if (response.status === 200) {
                    const fetchedData = response.data;
                    const birthDate = new Date(fetchedData.birthDate);
                    if (!isNaN(birthDate.getTime())) {
                        setProfile({
                            name: fetchedData.name,
                            surname: fetchedData.surname,
                            email: fetchedData.email,
                            password: fetchedData.password,
                            phoneNumber: fetchedData.phoneNumber,
                            birthDate: birthDate
                        });
                    } else {
                        console.error("Invalid date format received from the backend");
                    }
                }
            } catch (error) {
                console.error("Error fetching profile data:", error);
                alert("An error occurred while fetching profile data.");
            }
        };

        fetchProfile();
    }, []);
    // Empty dependency array ensures this runs once on component mount

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setProfile({
            ...profile,
            [e.target.name]: e.target.value,
        });
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

            <Container maxWidth="sm" sx={{ mt: 4 }}>
                <Box display="flex" justifyContent="center" alignItems="center" mb={4}>
                    <Avatar alt="Profile Picture" src="/path/to/your/profile-image.jpg" sx={{ width: 100, height: 100 }} />
                </Box>

                <Box component="form" sx={{ display: "flex", flexDirection: "column" }}>
                    <TextField
                        label="Ad"
                        name="name"
                        value={profile.name}
                        onChange={handleChange}
                        sx={{ marginBottom: 2 }}
                    />
                    <TextField
                        label="Soyad"
                        name="surname"
                        value={profile.surname}
                        onChange={handleChange}
                        sx={{ marginBottom: 2 }}
                    />
                    <TextField
                        label="E-posta"
                        name="email"
                        value={profile.email}
                        onChange={handleChange}
                        sx={{ marginBottom: 2 }}
                    />
                    <TextField
                        label="Şifre"
                        name="password"
                        value={profile.password}
                        onChange={handleChange}
                        sx={{ marginBottom: 2 }}
                        type="password"
                    />
                    <TextField
                        label="Telefon Numarası"
                        name="phoneNumber"
                        value={profile.phoneNumber}
                        onChange={handleChange}
                        sx={{ marginBottom: 2 }}
                        InputProps={{ startAdornment: <InputAdornment position="start">+90</InputAdornment> }}
                    />
                    <TextField
                        label="Doğum Tarihi"
                        name="birthDate"
                        value={profile.birthDate ? format(profile.birthDate, "dd.MM.yyyy") : ""}
                        onChange={handleChange}
                        sx={{ marginBottom: 2 }}
                        disabled
                    />

                    <Button variant="contained" color="error" sx={{ marginTop: 2 }} startIcon={<Edit />}>
                        Profili Düzenle
                    </Button>
                </Box>
            </Container>
        </Box>
    );
};

export default ProfilePage;
