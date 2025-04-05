import { Box, Button, TextField, Typography } from "@mui/material";
import logo from "../../assets/logo.png";
import { useForm } from "react-hook-form";
import { NavLink, useNavigate } from "react-router";
import { loginUser } from "../../api/auth";
import toast from "react-hot-toast";
import { useAuth } from "../../providers/AuthProviders";

const Login = () => {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();
  const {login} = useAuth();

  const onSubmit = (data) => {
    // console.log(data);
    loginUser(data)
    .then((res) => {
      console.log(res);
      toast.success(res.message);
      login(res.accessToken);
      navigate("/");
    })
    .catch((err) => {
      console.log(err);
    });
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
            Login
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
