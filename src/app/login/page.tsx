'use client';
import React, { useState } from 'react';
import { Box, Button, Checkbox, FormControlLabel, TextField, Typography, Link } from '@mui/material';
import { useRouter } from 'next/navigation';

const backgroundImageUrl = 'https://images.pexels.com/photos/9668274/pexels-photo-9668274.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1';

// Token'dan payload bilgilerini çözmek için bir yardımcı fonksiyon
const parseJwt = (token: string) => {
    try {
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const jsonPayload = decodeURIComponent(
            atob(base64)
                .split('')
                .map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
                .join('')
        );
        return JSON.parse(jsonPayload); // Token'ın payload kısmını döndürüyoruz
    } catch (error) {
        console.error("Invalid token:", error);
        return null;
    }
};

// Login fonksiyonu
const login = async (email: string, password: string) => {
    const response = await fetch('http://localhost:8080/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
    });

    if (response.ok) {
        const data = await response.json();
        const token = data.token;
        const role = data.role;

        localStorage.setItem('authToken', token); // Token'ı localStorage'a kaydediyoruz

        // Token'dan email'i alıyoruz
        const decodedToken = parseJwt(token);
        const emailFromToken = decodedToken?.email;

        console.log('Token:', token);
        console.log('Email from token:', emailFromToken);

        // Rol bazlı yönlendirme
        if (role === 'ADMIN') {
            window.location.href = '/admin';
        } else if (role === 'USER') {
            window.location.href = '/user';
        }
    } else {
        throw new Error('Geçersiz e-posta veya parola!');
    }
};

const Login = () => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [error, setError] = useState<string>('');
    const router = useRouter();

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        try {
            console.log("Login request initiated...");
            await login(email, password);
        } catch (error) {
            console.error(error);
            setError((error as Error).message);
        }
    };

    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                minHeight: '100vh',
                width: '100vw',
                position: 'relative',
                backgroundImage: `url(${backgroundImageUrl})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundAttachment: 'fixed',
            }}
        >
            <Box
                sx={{
                    bgcolor: 'rgba(0, 0, 0, 0.7)',
                    borderRadius: '12px',
                    padding: 3,
                    boxShadow: 5,
                    width: '300px',
                    backdropFilter: 'blur(10px)',
                    border: '2px solid rgba(255, 255, 255, 0.3)',
                }}
            >
                <Typography variant="h4" component="h1" gutterBottom align="center" sx={{ color: 'white' }}>
                    EventCenter
                </Typography>

                <form onSubmit={handleSubmit}>
                    <TextField
                        label="E-posta"
                        variant="outlined"
                        margin="normal"
                        fullWidth
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        sx={{
                            marginBottom: 1,
                            '& .MuiInputBase-input': {
                                color: 'white',
                            },
                            '& .MuiInputLabel-root': {
                                color: 'white',
                            },
                        }}
                    />
                    <TextField
                        label="Parola"
                        type="password"
                        variant="outlined"
                        margin="normal"
                        fullWidth
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        sx={{
                            marginBottom: 1,
                            '& .MuiInputBase-input': {
                                color: 'white',
                            },
                            '& .MuiInputLabel-root': {
                                color: 'white',
                            },
                        }}
                    />

                    <FormControlLabel
                        control={<Checkbox sx={{ color: 'white' }} />}
                        label="Beni Hatırla"
                        sx={{ color: 'white' }}
                    />

                    <Button variant="contained" color="error" fullWidth sx={{ marginTop: 2 }} type="submit">
                        Giriş Yap
                    </Button>

                    {error && (
                        <Typography color="error" sx={{ textAlign: 'center', marginTop: 1 }}>
                            {error}
                        </Typography>
                    )}

                    <Typography variant="body2" align="center" sx={{ color: 'white', marginTop: 2 }}>
                        Üye değil misin?{' '}
                        <Link href="/signup" sx={{ color: 'red', textDecoration: 'underline' }}>
                            Hemen üye ol, etkinlikleri kaçırma!
                        </Link>
                    </Typography>
                </form>
            </Box>
        </Box>
    );
};

export default Login;
