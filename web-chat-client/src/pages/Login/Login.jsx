import {
  Box,
  Button,
  CircularProgress,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import logo from "../../assets/logo.png";
import { useForm } from "react-hook-form";
import { NavLink, useNavigate } from "react-router";
import useLogin from "../../hooks/useLogin";

const Login = () => {
  const theme = useTheme();
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
        p: 4,
        minHeight: "90vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          height: { xs: "auto", sm: "auto", md: 700 },
          width: "100%",
          maxWidth: "800px",
          backgroundColor: "rgba(160, 174, 155, 0.53)",
          borderRadius: 2,
          boxShadow: 3,
        }}
      >
        {/* left side */}
        <Box
          sx={{
            // flex: 1,
            backgroundColor: theme.palette.primary.main,
            color: "#fff",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
            p: 4,
            borderRadius: { xs: "8px 8px 0 0", md: "8px 0 0 8px" },
          }}
        >
          <Typography
            variant="h3"
            fontWeight="bold"
            gutterBottom
            textAlign="center"
            sx={{
              fontSize: {
                xs: "1.25rem",
                sm: "1.5rem",
                md: "2rem",
              },
            }}
          >
            Welcome Back!
          </Typography>
          <Typography variant="body1" textAlign="center" maxWidth="300px">
            Login to your account and continue exploring the app.
          </Typography>
        </Box>

        {/* Right side */}
        <Box
          sx={{
            flex: 1,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            p: 4,
          }}
        >
          <Box
            sx={{
              width: "100%",
              textAlign: "center",
            }}
          >
            {/* Logo */}
            <Box sx={{ mb: 5 }}>
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
                {...register("username", { required: true })}
              />
              <TextField
                label="Password"
                type="password"
                variant="outlined"
                fullWidth
                {...register("password", { required: true })}
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
                  <CircularProgress size={24} sx={{ color: "#fff" }} />
                ) : (
                  "Login"
                )}
              </Button>
            </Box>

            {/* Create New acc */}
            <Typography sx={{ mt: 2 }}>
              Don't have an account? <br />
              <NavLink
                to="/signup"
                style={{
                  color: theme.palette.primary.main,
                  textDecoration: "none",
                  fontWeight: "bold",
                  marginLeft: "5px",
                }}
              >
                Sign Up
              </NavLink>
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Login;
