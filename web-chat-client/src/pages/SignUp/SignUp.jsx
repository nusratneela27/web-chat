import { Box, Button, FormControl, InputLabel, MenuItem, Select, TextField, Typography } from "@mui/material";
import logo from "../../assets/logo.png";
import { Controller, useForm } from "react-hook-form";
import { NavLink, useNavigate } from "react-router";
import { registerUser } from "../../api/auth";
import toast from "react-hot-toast";

const SignUp = () => {
  const { register, handleSubmit , control } = useForm();
  const navigate = useNavigate();

  const onSubmit = (data) => {
    // console.log(data);
    registerUser(data)
      .then((res) => {
        console.log(res);
        toast.success(res.message);
        // navigate("/login");
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
            label="Fullname"
            type="text"
            variant="outlined"
            fullWidth
            {...register("fullName", { required: true })}
          />
          <TextField
            label="Username"
            type="text"
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

          <FormControl fullWidth variant="outlined">
            <InputLabel id="role-label">Gender</InputLabel>
            <Controller
              name="accountType"
              control={control}
              defaultValue=""
              rules={{ required: true }}
              render={({ field }) => (
                <Select {...field} labelId="role-label" label="Role">
                  <MenuItem value="agent">Male</MenuItem>
                  <MenuItem value="user">Female</MenuItem>
                </Select>
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
            Sign up
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
