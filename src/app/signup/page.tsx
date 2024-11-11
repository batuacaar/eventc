'use client';

import React, { useState } from 'react';
import { Box, Button, TextField, Typography, Link } from '@mui/material';
import { useRouter } from 'next/navigation';

const backgroundImageUrl = 'https://images.pexels.com/photos/9668274/pexels-photo-9668274.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1';

const Signup = () => {
    const router = useRouter();
    const [formData, setFormData] = useState({
        username: '',
        name: '',
        surname: '',
        email: '',
        phoneNumber: '',
        birthDate: '',
        password: '',
    });
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const [formErrors, setFormErrors] = useState({
        name: '',
        surname: '',
        email: '',
        phoneNumber: '',
        birthDate: '',
        password: '',
    });

    // Formdaki değişiklikleri işleyin
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // Formu gönderme işlemi
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setMessage('');
        setError('');

        // Hata kontrolü
        const errors = {
            name: formData.name ? '' : 'İsim alanı boş olamaz',
            surname: formData.surname ? '' : 'Soyisim alanı boş olamaz',
            email: formData.email ? '' : 'E-posta alanı boş olamaz',
            phoneNumber: formData.phoneNumber ? '' : 'Telefon numarası alanı boş olamaz',
            birthDate: formData.birthDate ? '' : 'Doğum tarihi alanı boş olamaz',
            password: formData.password ? '' : 'Parola alanı boş olamaz',
        };
        setFormErrors(errors);

        // Eğer formda herhangi bir hata varsa, kaydetme işlemi yapılmaz
        if (Object.values(errors).some((error) => error !== '')) {
            return;
        }

        // Veritabanına kaydetme işlemi
        try {
            const response = await fetch('http://localhost:8080/api/users/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                setMessage('Kayıt başarılı! Aramıza katıldığın için çok mutluyuz!');
            } else if (response.status === 400) {
                const data = await response.json();
                setError(data.message || 'Bu e-posta ile zaten bir kullanıcı kayıtlı.');
            } else {
                setError('Kayıt başarısız. Lütfen tekrar deneyin.');
            }
        } catch (err) {
            setError('Sunucu hatası. Lütfen daha sonra tekrar deneyin.');
        }
    };

    const handleBackToLogin = () => {
        router.push('/login');
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
                    width: '280px',
                    maxWidth: '90%',
                    height: 'auto',
                    backdropFilter: 'blur(10px)',
                    border: '2px solid rgba(255, 255, 255, 0.3)',
                }}
            >
                <Typography variant="h4" component="h1" gutterBottom align="center" sx={{ color: 'white' }}>
                    EventCenter
                </Typography>

                <form onSubmit={handleSubmit}>
                    <TextField
                        label="İsim"
                        name="name"
                        variant="outlined"
                        margin="normal"
                        fullWidth
                        value={formData.name}
                        onChange={handleChange}
                        sx={{
                            marginBottom: 1,
                            '& .MuiInputBase-input': { color: 'white' },
                            '& .MuiInputLabel-root': { color: 'white' },
                        }}
                        error={!!formErrors.name}
                        helperText={formErrors.name}
                    />
                    <TextField
                        label="Soyisim"
                        name="surname"
                        variant="outlined"
                        margin="normal"
                        fullWidth
                        value={formData.surname}
                        onChange={handleChange}
                        sx={{
                            marginBottom: 1,
                            '& .MuiInputBase-input': { color: 'white' },
                            '& .MuiInputLabel-root': { color: 'white' },
                        }}
                        error={!!formErrors.surname}
                        helperText={formErrors.surname}
                    />
                    <TextField
                        label="E-posta"
                        name="email"
                        variant="outlined"
                        margin="normal"
                        fullWidth
                        value={formData.email}
                        onChange={handleChange}
                        sx={{
                            marginBottom: 1,
                            '& .MuiInputBase-input': { color: 'white' },
                            '& .MuiInputLabel-root': { color: 'white' },
                        }}
                        error={!!formErrors.email}
                        helperText={formErrors.email}
                    />
                    <TextField
                        label="Telefon Numarası"
                        name="phoneNumber"
                        variant="outlined"
                        margin="normal"
                        fullWidth
                        value={formData.phoneNumber}
                        onChange={handleChange}
                        sx={{
                            marginBottom: 1,
                            '& .MuiInputBase-input': { color: 'white' },
                            '& .MuiInputLabel-root': { color: 'white' },
                        }}
                        error={!!formErrors.phoneNumber}
                        helperText={formErrors.phoneNumber}
                    />

                    <TextField
                        label="Doğum Tarihi (dd.MM.yyyy)"
                        name="birthDate"
                        variant="outlined"
                        margin="normal"
                        fullWidth
                        value={formData.birthDate}
                        onChange={handleChange}
                        sx={{
                            marginBottom: 1,
                            '& .MuiInputBase-input': { color: 'white' },
                            '& .MuiInputLabel-root': { color: 'white' },
                        }}
                        error={!!formErrors.birthDate}
                        helperText={formErrors.birthDate}
                    />


                    <TextField
                        label="Parola"
                        name="password"
                        type="password"
                        variant="outlined"
                        margin="normal"
                        fullWidth
                        value={formData.password}
                        onChange={handleChange}
                        sx={{
                            marginBottom: 1,
                            '& .MuiInputBase-input': { color: 'white' },
                            '& .MuiInputLabel-root': { color: 'white' },
                        }}
                        error={!!formErrors.password}
                        helperText={formErrors.password}
                    />

                    <Button
                        type="submit"
                        variant="contained"
                        color="error"
                        fullWidth
                        sx={{ marginTop: 2 }}
                    >
                        Kayıt Ol
                    </Button>

                    {message && (
                        <Typography variant="body2" align="center" sx={{ color: 'green', marginTop: 2 }}>
                            {message}
                        </Typography>
                    )}
                    {error && (
                        <Typography variant="body2" align="center" sx={{ color: 'red', marginTop: 2 }}>
                            {error}
                        </Typography>
                    )}
                </form>

                <Typography variant="body2" align="center" sx={{ color: 'white', marginTop: 2 }}>
                    Zaten üye misin?{' '}
                    <Link onClick={handleBackToLogin} sx={{ color: 'red', textDecoration: 'underline' }}>
                        Giriş Sayfasına Dön
                    </Link>
                </Typography>
            </Box>
        </Box>
    );
};

export default Signup;
