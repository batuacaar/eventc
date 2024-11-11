'use client';
import React from 'react';
import { AppBar, Box, Button, Container, MenuItem, Select, Toolbar, Typography, IconButton } from '@mui/material';
import {ExitToApp, Favorite, Menu} from '@mui/icons-material';
import { useRouter } from "next/navigation";

const events = [
    {
        title: "M Lisa Konseri",
        description: `M Lisa, Türk rap sahnesinin yükselen yıldızlarından biridir. İlk olarak "Melisa Zey" adıyla müziğe adım atan güzel sanatçı, kısa sürede M Lisa ismiyle büyük bir çıkış yakaladı. Etkileyici tarzıyla herkesin gözdesi olan M Lisa, güçlü sözleri ve özgün tarzıyla beğenilmektedir. Özellikle "ARABA" adlı şarkısıyla müzik kariyerinde önemli bir dönemeç yaşadı. M Lisa, rap müziğine kattığı özgün dokunuşlarla adından sıkça söz ettirmektedir.
    🙌Sakın bu şahane performansı kaçırma sen de bize katıl!`,
        price: "250 ₺",
    },
    {
        title: "Köy Okulu Ziyareti",
        description: `Toplumsal dayanışmayı ve sosyal sorumluluğu teşvik etmek amacıyla düzenlenmiş olduğumuz Köy Okulu Ziyareti Etkinliği'ne sizleri davet etmekten mutluluk duyuyoruz!
    Bu etkinlik kapsamında, ihtiyaç sahibi köy okullarını ziyaret ederek oradaki öğrencilere kitap, kırtasiye malzemeleri, oyunlar ve çeşitli eğitim materyalleri hediye edeceğiz. Amacımız, köy okullarında okuyan kardeşlerimize moral desteği sunmak, eğitim yolculuklarında onlara katkıda bulunmak ve aramızda sevgi köprüleri kurmaktır.`,
    },
];

const UserPage: React.FC = () => {
    const router = useRouter();

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
    const handleLogout = () => {
        router.push('/');
    };


    return (
        <Box
            sx={{
                backgroundImage: 'url(https://images.pexels.com/photos/62693/pexels-photo-62693.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1)',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                height: '100vh',  // Sayfanın tam yüksekliği
                color: 'white',
                backgroundAttachment: 'fixed', // Arka plan sabitlenmiş olacak
                position: 'relative', // Sabitleme için konumlandırma
            }}
        >

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

                {/* Event Cards */}
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
