import {
  Box,
  Button,
  CircularProgress,
  TextField,
  Typography,
} from "@mui/material";
import logo from "../../assets/logo.png";
import { useForm } from "react-hook-form";
import { NavLink, useNavigate } from "react-router";
import useLogin from "../../hooks/useLogin";

const Login = () => {
  const { register, handleSubmit } = useForm();
  const { login, loading } = useLogin();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    const success = await login(data);
    if (success) {
      navigate("/");
    } else {  
      navigate("/login");
    }
  };

  return (
    <Box
      sx={{
        minHeight: "90vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Box
        sx={{
          width: "100%",
          maxWidth: "500px",
          textAlign: "center",
          backgroundColor: "rgba(210, 191, 227, 0.73)",
          p: 6,
          borderRadius: 2,
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            mb: 5,
          }}
        >
          <NavLink to="/">
            <img src={logo} alt="logo" />
          </NavLink>
        </Box>

        {/* Form */}
        <Box
          onSubmit={handleSubmit(onSubmit)}
          component="form"
          noValidate
          autoComplete="off"
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
          }}
        >
          <TextField
            label="Username"
            type="username"
            variant="outlined"
            fullWidth
            {...register("username")}
          />
          <TextField
            label="Password"
            type="password"
            variant="outlined"
            fullWidth
            {...register("password")}
          />

          <Button
            type="submit"
            variant="contained"
            color="primary"
            sx={{
              py: 1.5,
              textTransform: "none",
              fontWeight: "bold",
              boxShadow: "none",
            }}
          >
            {loading ? (
              <CircularProgress size={24} color="white.main" />
            ) : (
              "Login"
            )}
          </Button>
        </Box>

        {/* Create New acc */}
        <Typography sx={{ mt: 2, color: "white" }}>
          Don't have an account?{" "}
          <NavLink
            to="/signup"
            style={{
              fontWeight: "bold",
              color: "primary",
            }}
          >
            Sign Up
          </NavLink>
        </Typography>
      </Box>
    </Box>
  );
};

export default Login;
