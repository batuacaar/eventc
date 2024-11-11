// app/page.tsx
'use client';

import React from 'react';
import { Box, Button, Typography } from '@mui/material';
import { useRouter } from 'next/navigation';

// useRouter kullanımı
const backgroundImageUrl = 'https://images.pexels.com/photos/9668274/pexels-photo-9668274.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1';

const HomePage = () => {
  const router = useRouter();

  return (
      <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh',
            width: '100vw',
            position: 'relative',
            backgroundImage: `url(${backgroundImageUrl})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
      >
        <Box
            sx={{
              bgcolor: 'rgba(0, 0, 0, 0.6)',
              borderRadius: '12px',
              padding: 4,
              boxShadow: 5,
              width: { xs: '90%', sm: '300px' },
              textAlign: 'center',
            }}
        >
          <Typography
              variant="h4"
              component="h1"
              sx={{
                color: 'white',
                fontWeight: 'bold',
                textShadow: '2px 2px 4px rgba(0, 0, 0, 0.8)',
                fontSize: { xs: '1.5rem', sm: '2rem' },
              }}
          >
            Her Etkinlikte Bir Amaç, Her Eğlencede Bir Hikaye
          </Typography>

          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: 4 }}>
            <Button
                variant="contained"
                color="error"
                sx={{ marginBottom: 2, width: '100%' }}
                onClick={() => router.push('/login')}
            >
              Giriş Yap
            </Button>

            <Button
                variant="outlined"
                color="error"
                sx={{ width: '100%' }}
                onClick={() => router.push('/signup')}
            >
              Kayıt Ol
            </Button>
          </Box>
        </Box>
      </Box>
  );
};

export default HomePage;
