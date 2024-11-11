'use client'
import axios from 'axios';
import React, { useState } from 'react';
import { Box, Button, Checkbox, FormControlLabel, TextField, Typography, Link } from '@mui/material';
import { useRouter } from 'next/navigation';

const backgroundImageUrl = 'https://images.pexels.com/photos/9668274/pexels-photo-9668274.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1';

const Login = () => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [error, setError] = useState<string>('');
    const router = useRouter();

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        try {
            console.log("Login request initiated...");

            const response = await axios.post(
                'http://localhost:8080/api/login',
                { email, password },
                { withCredentials: true }
            );
            //const token = response.headers['authorization']?.split(' ')[1];  // Bearer token'ı al

            // Token'ı localStorage veya state'e kaydedebilirsin
            //if (token) {
              //  localStorage.setItem('token', token);}

            console.log("Login successful:", response.data);
            router.push('/user');
        } catch (error) {
            if (axios.isAxiosError(error)) {
                console.error("Login failed:", error.response?.data);
                setError(error.response?.data?.message || 'Bir hata oluştu. Lütfen tekrar deneyin.');
            } else {
                console.error("Error occurred:", error);
                setError('Bir hata oluştu. Lütfen tekrar deneyin.');
            }
        }
    };

    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                minHeight: '100vh',  // Sayfa kaydırıldığında da arka planın görünmesini sağlar
                width: '100vw',
                position: 'relative',
                backgroundImage: `url(${backgroundImageUrl})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundAttachment: 'fixed',  // Arka plan sabitlenmiş olacak
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
                <Typography variant="h4" component="h1" gutterBottom align="center" sx={{ color: 'white'}}>
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
