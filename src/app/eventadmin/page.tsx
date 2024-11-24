'use client';
import React, { useState, useEffect } from 'react';
import { Box, Button, TextField, Typography, AppBar, Toolbar, IconButton, MenuItem, Select, FormControl, InputLabel } from '@mui/material';
import { useRouter } from 'next/navigation';
import { ExitToApp } from '@mui/icons-material';
import axios from 'axios'; // Import axios



interface Category {
    categoryId: string;
    name: string;
    description: string;
}

const EventCreate = () => {
    const router = useRouter();

    const navigateToEventAdmin = () => {
        router.push('/eventadmin');
    };

    const handleLogout = () => {
        router.push('/login');
    };

    const [formData, setFormData] = useState({
        title: '',
        description: '',
        categoryName: '',
        location: '',
        eventDate: '',
        status: '',
        maxCapacity: '',
        minAge: '',
    });

    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const [formErrors, setFormErrors] = useState({
        title: '',
        description: '',
        categoryName: '',
        location: '',
        eventDate: '',
        status: '',
        maxCapacity: '',
        minAge: '',
    });

    const [categories, setCategories] = useState<Category[]>([]);
    // Kategorileri tutacak state

    // Kategori verilerini almak için useEffect
    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await axios.get('http://localhost:8080/api/events/categories');
                setCategories(response.data); // response.data, Category[] tipinde olmalı
            } catch (err) {
                console.error('Kategori verileri alınırken hata oluştu:', err);
            }
        };

        fetchCategories();
    }, []);
    // component mount olduğunda çalışacak

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleCategoryChange = (e: React.ChangeEvent<{ value: unknown }>) => {
        setFormData({ ...formData, categoryName: e.target.value as string });
    };



    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setMessage('');
        setError('');

        const errors = {
            title: formData.title ? '' : 'Başlık boş olamaz',
            description: formData.description ? '' : 'Açıklama boş olamaz',
            categoryName: formData.categoryName ? '' : 'Kategori boş olamaz',
            location: formData.location ? '' : 'Lokasyon boş olamaz',
            eventDate: formData.eventDate ? '' : 'Etkinlik tarihi boş olamaz',
            status: formData.status ? '' : 'Durum boş olamaz',
            maxCapacity: formData.maxCapacity ? '' : 'Maksimum kapasite boş olamaz',
            minAge: formData.minAge ? '' : 'Minimum yaş boş olamaz',
        };
        setFormErrors(errors);

        if (Object.values(errors).some((error) => error !== '')) {
            return;
        }

        try {
            const token = localStorage.getItem('authToken');
            const response = await axios.post('http://localhost:8080/api/events/create', formData, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
            });
            console.log(response);
            if (response.status === 201) {
                setMessage('Etkinlik başarıyla oluşturuldu!');

                // 2 saniye sonra sayfa yenileme ve form verilerinin sıfırlanması
                setTimeout(() => {
                    setFormData({
                        title: '',
                        description: '',
                        categoryName: '',
                        location: '',
                        eventDate: '',
                        status: '',
                        maxCapacity: '',
                        minAge: '',
                    });
                    // Sayfa yenileme
                    window.location.reload();
                }, 2000); // 2 saniye bekle

            }
        } catch (error) {
            if (error.response) {
                console.error('Response Data:', error.response.data);
                console.error('Status Code:', error.response.status);
            } else {
                console.error('Error:', error.message);
            }
        }
    };

    return (
        <Box
            sx={{
                backgroundImage:
                    'url(https://images.pexels.com/photos/62693/pexels-photo-62693.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1)',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                minHeight: '100vh',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
            }}
        >
            <AppBar position="static" sx={{ backgroundColor: 'rgba(0, 0, 0, 0.8)', elevation: 0 }}>
                <Toolbar sx={{ justifyContent: "space-between" }}>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Button sx={{ textTransform: 'none', color: 'white', fontSize: '32px', fontWeight: 'bold' }}>
                            EventCenter
                        </Button>
                    </Box>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                        <Button color="inherit" sx={{ textTransform: 'none' }}>Gelen Kutusu</Button>
                        <Button color="inherit" sx={{ textTransform: 'none' }}>Profilim</Button>
                        <Button variant="contained" color="error" onClick={navigateToEventAdmin} sx={{ textTransform: 'none' }}>Etkinlik Oluştur</Button>
                        <IconButton color="inherit" onClick={handleLogout}>
                            <ExitToApp />
                        </IconButton>
                    </Box>
                </Toolbar>
            </AppBar>
            <Box
                sx={{
                    backgroundColor: 'white',
                    color: 'black',
                    borderRadius: 3,
                    padding: 4,
                    width: '400px',
                    maxWidth: '90%',
                    boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.3)',
                }}
            >
                <Typography variant="h4" align="center" gutterBottom>
                    Etkinlik Oluştur
                </Typography>
                <form onSubmit={handleSubmit}>
                    <TextField
                        label="Başlık"
                        name="title"
                        fullWidth
                        margin="normal"
                        value={formData.title}
                        onChange={handleChange}
                        error={!!formErrors.title}
                        helperText={formErrors.title}
                    />
                    <TextField
                        label="Açıklama"
                        name="description"
                        fullWidth
                        margin="normal"
                        value={formData.description}
                        onChange={handleChange}
                        error={!!formErrors.description}
                        helperText={formErrors.description}
                    />
                    <FormControl fullWidth margin="normal" error={!!formErrors.categoryName}>
                        <InputLabel>Kategori</InputLabel>
                        <Select
                            name="category"
                            value={formData.categoryName}
                            onChange={(e) => handleCategoryChange(e)}
                            label="Kategori"
                        >
                            {categories.map((category) => (
                                <MenuItem key={category.categoryId} value={category.name}>
                                    {category.name}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>


                    <TextField
                        label="Lokasyon"
                        name="location"
                        fullWidth
                        margin="normal"
                        value={formData.location}
                        onChange={handleChange}
                        error={!!formErrors.location}
                        helperText={formErrors.location}
                    />
                    <TextField
                        label="Etkinlik Tarihi"
                        name="eventDate"
                        type="datetime-local"
                        fullWidth
                        margin="normal"
                        InputLabelProps={{ shrink: true }}
                        value={formData.eventDate}
                        onChange={handleChange}
                        error={!!formErrors.eventDate}
                        helperText={formErrors.eventDate}
                    />
                    <TextField
                        label="Durum"
                        name="status"
                        fullWidth
                        margin="normal"
                        value={formData.status}
                        onChange={handleChange}
                        error={!!formErrors.status}
                        helperText={formErrors.status}
                    />
                    <TextField
                        label="Maksimum Kapasite"
                        name="maxCapacity"
                        type="number"
                        fullWidth
                        margin="normal"
                        value={formData.maxCapacity}
                        onChange={handleChange}
                        error={!!formErrors.maxCapacity}
                        helperText={formErrors.maxCapacity}
                    />
                    <TextField
                        label="Minimum Yaş"
                        name="minAge"
                        type="number"
                        fullWidth
                        margin="normal"
                        value={formData.minAge}
                        onChange={handleChange}
                        error={!!formErrors.minAge}
                        helperText={formErrors.minAge}
                    />
                    {message && <Typography color="success.main">{message}</Typography>}
                    {error && <Typography color="error.main">{error}</Typography>}
                    <Button
                        type="submit"
                        variant="contained"
                        color="error"
                        fullWidth
                        sx={{ marginTop: 2 }}
                    >
                        Etkinlik Oluştur
                    </Button>
                </form>
            </Box>
        </Box>
    );
};

export default EventCreate;
