'use client';
import React, {useEffect, useState} from 'react';
import { AppBar, Box, Button, Container, MenuItem, Select, Toolbar, Typography, IconButton } from '@mui/material';
import {ExitToApp, Favorite} from '@mui/icons-material';
import { useRouter } from "next/navigation";


const UserPage: React.FC = () => {
    const router = useRouter();
    const [events, setEvents] = useState<any[]>([]); // Etkinlikler state'i
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const response = await fetch('http://localhost:8080/api/events'); // Etkinlik API'si
                const data = await response.json();
                setEvents(data); // Etkinlikleri state'e ata
            } catch (error) {
                console.error('Etkinlikler alınırken hata oluştu:', error);
            } finally {
                setLoading(false); // Yükleme tamamlandı
            }
        };
        fetchEvents();
    }, []);

    // Function to navigate to profile page
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
    // Logout fonksiyonu
    const handleLogout = () => {
        // Saklanan bilgileri temizle
        localStorage.removeItem('token');
        console.log('Çıkış yapıldı, bilgiler temizlendi.');

        // Kullanıcıyı giriş sayfasına yönlendir
        window.location.href = '/login';
    };

    if (loading) {
        return <Typography variant="h6">Yükleniyor...</Typography>;
    }

    return (
        <Box
            sx={{
                position: 'relative', // İçerik için position: relative ayarlıyoruz
                minHeight: '100vh', // Sayfanın en az tüm ekranı kapsaması için
            }}
        >
            {/* Arka plan */}
            <Box
                sx={{
                    backgroundImage: 'url(https://images.pexels.com/photos/62693/pexels-photo-62693.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1)',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    zIndex: -1,
                    height: '100%',
                    width: '100%',
                }}
            />

            {/* Navigation Bar */}
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
            <Container maxWidth="md" sx={{ mt: 4, color: 'white' }}>
                {/* Header Section */}
                <Box display="flex" justifyContent="space-between" alignItems="center" mb={4}>
                    <Typography variant="h4" sx={{ color: 'red', fontWeight: 'bold' }}>Etkinlikler</Typography>
                </Box>

                {/* Filters */}
                <Box display="flex" justifyContent="space-between" mb={2}>
                    <Select defaultValue="" displayEmpty>
                        <MenuItem value="">
                            Etkinlik Türü
                        </MenuItem>
                        <MenuItem value="concert">Konser</MenuItem>
                        <MenuItem value="social">Sosyal Sorumluluk</MenuItem>
                    </Select>
                    <Select defaultValue="" displayEmpty>
                        <MenuItem value="">
                            Gelişmiş Sıralama
                        </MenuItem>
                        <MenuItem value="date">Tarih</MenuItem>
                        <MenuItem value="popularity">Popülerlik</MenuItem>
                    </Select>
                </Box>

                {events.map((event, index) => (
                    <Box
                        key={index}
                        sx={{
                            bgcolor: 'rgba(0, 0, 0, 0.7)',
                            color: 'white',
                            p: 3,
                            borderRadius: 2,
                            mb: 3,
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                        }}
                    >
                        <Box flex="1">
                            <Typography variant="h5" color="red" mb={1}>{event.title}</Typography>
                            <Typography variant="body2" mb={2}>{event.description}</Typography>

                            {/* Display other event details */}
                            <Typography variant="body2" mb={1}><strong>Category:</strong> {event.categoryName}</Typography>
                            <Typography variant="body2" mb={1}><strong>Location:</strong> {event.location}</Typography>
                            <Typography variant="body2" mb={1}><strong>Date:</strong> {new Date(event.eventDate).toLocaleDateString()}</Typography>
                            <Typography variant="body2" mb={1}><strong>Status:</strong> {event.status}</Typography>
                            <Typography variant="body2" mb={1}><strong>Max Capacity:</strong> {event.maxCapacity}</Typography>
                            <Typography variant="body2" mb={1}><strong>Min Age:</strong> {event.minAge}</Typography>
                        </Box>

                        <Box display="flex" flexDirection="column" alignItems="center" ml={3}>
                            {event.price && <Typography variant="h6">{event.price}</Typography>}
                            <Button variant="contained" color="error" startIcon={<Favorite />}>
                                Favorilerime Ekle
                            </Button>
                        </Box>
                    </Box>
                ))}
            </Container>
        </Box>
    );
};

export default UserPage;