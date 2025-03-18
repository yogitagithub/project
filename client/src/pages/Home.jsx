import React, { useEffect, useState } from "react";
import { Box, Typography, TextField, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
const Home = () => {
    const navigate = useNavigate();
    const [loggedInName, setLoggedInNames] = useState('');
    const [loggedInMobile, setLoggedInMobiles] = useState('');

    useEffect(() => {
        setLoggedInNames(localStorage.getItem('loggedInName'))
        setLoggedInMobiles(localStorage.getItem('loggedInMobile'))
    }, [])

    const handleLogout = (e) => {
        localStorage.removeItem('token');
        localStorage.removeItem('loggedInName');
        localStorage.removeItem('loggedInMobile');

        setTimeout(() => {
            navigate('/register');
        }, 1000)
    }

    return (
        <>

            <Box
                maxWidth={450}
                display="flex"
                flexDirection={"column"}
                alignItems="center"
                justifyContent={"center"}
                margin="auto"
                marginTop={5}
                boxShadow="10px 10px 20px #ccc"
                padding={3}
                borderRadius={5}
            >
                <Typography
                    variant="h5"
                    sx={{ textTransform: "uppercase" }}
                    padding={3}
                    textAlign="center"
                >
                    welcome {loggedInName}
                </Typography>

                <Typography
                    variant="h5"
                    sx={{ textTransform: "uppercase" }}
                    padding={-25}
                    textAlign="center"
                >
                    Mobile No - {loggedInMobile}
                </Typography>

                <Button
                    type="submit"
                    sx={{ borderRadius: 3, marginTop: 3 }}
                    variant="contained"
                    color="primary"
                    onClick={handleLogout}
                >
                    Logout
                </Button>

            </Box>

        </>
    );
};

export default Home;
