// 'use client' ifadesini unutmayın, çünkü MUI bileşenleri yalnızca istemci tarafında render edilir.
'use client';

import React from 'react';
import { Box, Container, Typography, AppBar, Toolbar, IconButton, Button } from '@mui/material';
import { useRouter } from 'next/navigation';
import {ExitToApp} from "@mui/icons-material";

const AdminPage: React.FC = () => {
    const router = useRouter();

    const navigateToEventAdmin = () => {
        router.push('/eventadmin');
    };

    const handleLogout = () => {
        // Giriş çıkış işlemleri ve yönlendirme işlemleri burada yapılabilir.
        router.push('/login'); // Örneğin giriş sayfasına yönlendirin.
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
            <AppBar position="static" sx={{ backgroundColor: 'rgba(0, 0, 0, 0.8)', elevation: 0 }}>
                <Toolbar sx={{ justifyContent: "space-between" }}>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Button  sx={{ textTransform: 'none', color: 'white', fontSize: '32px', fontWeight: 'bold' }}>
                            EventCenter
                        </Button>
                    </Box>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                        <Button color="inherit"  sx={{ textTransform: 'none' }}>Gelen Kutusu</Button>
                        <Button color="inherit"  sx={{ textTransform: 'none' }}>Profilim</Button>
                        <Button variant="contained" color="error" onClick={navigateToEventAdmin} sx={{ textTransform: 'none' }}>Etkinlik Oluştur</Button>
                        <IconButton color="inherit" onClick={handleLogout}>
                            <ExitToApp />
                        </IconButton>
                    </Box>
                </Toolbar>
            </AppBar>
            {/* Ana İçerik Alanı */}
            <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
                <Typography variant="h4" gutterBottom>
                    Hoş Geldiniz, Admin
                </Typography>

            </Container>
        </Box>
    );
};

export default AdminPage;
