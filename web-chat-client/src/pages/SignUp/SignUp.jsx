import {
  Box,
  Button,
  TextField,
  Typography,
  FormControl,
  RadioGroup,
  FormControlLabel,
  Radio,
  CircularProgress,
} from "@mui/material";

import logo from "../../assets/logo.png";
import { Controller, useForm } from "react-hook-form";
import { NavLink, useNavigate } from "react-router";
import useSignup from "../../hooks/useSignup";

const SignUp = () => {
  const { register, handleSubmit, control } = useForm();

  const { signup, loading } = useSignup();

  const navigate = useNavigate();

  const onSubmit = async (data) => {
    const success = await signup(data);
    if (success) {
      navigate("/");
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
            label="Fullname"
            type="text"
            variant="outlined"
            fullWidth
            {...register("fullName")}
          />
          <TextField
            label="Username"
            type="text"
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

          <FormControl component="fieldset">
            <Controller
              name="gender"
              control={control}
              defaultValue="male"
              // rules={{ required: true }}
              render={({ field }) => (
                <RadioGroup row {...field}>
                  <FormControlLabel
                    value="male"
                    control={<Radio />}
                    label="Male"
                  />
                  <FormControlLabel
                    value="female"
                    control={<Radio />}
                    label="Female"
                  />
                </RadioGroup>
              )}
            />
          </FormControl>

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
              "Sign up"
            )}
          </Button>
        </Box>

        {/* Create New acc */}
        <Typography sx={{ mt: 2, color: "white" }}>
          Already have an account?{" "}
          <NavLink
            to="/login"
            style={{
              fontWeight: "bold",
              color: "primary",
            }}
          >
            Login
          </NavLink>
        </Typography>
      </Box>
    </Box>
  );
};

export default SignUp;
