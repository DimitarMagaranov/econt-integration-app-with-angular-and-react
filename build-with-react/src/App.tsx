import { Route, Router, Routes } from 'react-router-dom';

import { Box, CssBaseline, Paper, ThemeProvider, Typography } from '@mui/material';
import { createTheme } from '@mui/material/styles';

import { ProductList } from './components/ProductList/ProductList';
import Checkout from './components/Checkout/Checkout';

import './App.css';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import Home from './components/MUI/Home';
import About from './components/MUI/About';
import Navbar from './components/MUI/Navbar';
import Footer from './components/MUI/Footer';

function App() {
    const theme = createTheme({
        palette: {
            primary: {
                light: '#63b8ff',
                main: '#0989e3',
                dark: '#005db0',
                contrastText: '#000',
            },
            secondary: {
                main: '#4db6ac',
                light: '#82e9de',
                dark: '#00867d',
                contrastText: '#000',
            },
        },
    });

    return (
        // <ThemeProvider theme={theme}>
        //     <CssBaseline />
        //     <Box height="100vh" display="flex" flexDirection="column">
        //         <Navbar />
        //         <Routes>
        //             <Route path="/" element={<Home />}></Route>
        //             <Route path="/about" element={<About />}></Route>
        //         </Routes>
        //         <Footer />
        //     </Box>
        // </ThemeProvider>

        // <ThemeProvider theme={theme}>
        //     <CssBaseline />
        //     <Box height="100vh" display="flex" justifyContent="center" alignItems="center" flexDirection="column">
        //         <Paper elevation={3} sx={{ padding: '1rem', backgroundColor: 'secondary.light' }}>
        //             <Typography color="primary.dark" variant="h1">
        //                 Starter App
        //             </Typography>
        //         </Paper>
        //     </Box>
        // </ThemeProvider>
        // <div id='container'>
        //     <Routes>
        //         <Route path="/" element={<ProductList />} />
        //         <Route path="/checkout" element={<Checkout />} />
        //     </Routes>
        // </div>

        <Box sx={{marginTop: '20px'}}>
            <Routes>
                <Route path="/" element={<ProductList />} />
                <Route path="/checkout" element={<Checkout />} />
            </Routes>
        </Box>
    );
}

export default App;
