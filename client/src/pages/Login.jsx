import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Typography, TextField, Button } from "@mui/material";
import axios from "axios";
import { useDispatch } from "react-redux";
import { authActions } from "../redux/store";

const Login = () => {
  const navigate = useNavigate();
   const dispatch = useDispatch();
 
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
  });

  
  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };


const handleSubmit = async (e) => {
    e.preventDefault();

    if (!inputs.email || !inputs.password) {
        alert("Please fill all the fields");
        return;
      }


    try {
      const response = await axios.post("http://localhost:8001/api/v1/user/login", {
        email: inputs.email,
        password: inputs.password,
      });

      if (response.data) {
        const { token, user } = response.data;
        const { name, mobile } = user;
       
        localStorage.setItem("token", token);
        localStorage.setItem("loggedInName", name);
        localStorage.setItem("loggedInMobile", mobile);

       
        dispatch(authActions.login());

        alert("User logged in successfully");
        navigate("/home");
      }
    } catch (error) {
      console.error("Error in logging:", error);
      alert("Login failed. Please check your credentials.");
    }
};
     
  return (
    <>
      <form onSubmit={handleSubmit}>
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
            variant="h4"
            sx={{ textTransform: "uppercase" }}
            padding={3}
            textAlign="center"
          >
            Login
          </Typography>

          <TextField
            placeholder="email"
            value={inputs.email}
            name="email"
            margin="normal"
            type={"text"}
            required
            onChange={handleChange}
          />
          <TextField
            placeholder="password"
            value={inputs.password}
            name="password"
            margin="normal"
            type={"password"}
            required
            onChange={handleChange}
          />

          <Button
            type="submit"
            sx={{ borderRadius: 3, marginTop: 3 }}
            variant="contained"
            color="primary"
           
          >
            Submit
          </Button>
          <Button
            onClick={() => navigate("/register")}
            sx={{ borderRadius: 3, marginTop: 3 }}
          >
            Not a user ? Please Register
          </Button>
        </Box>
      </form>
    </>
  );
};

export default Login;
