import {
  Box,
  Button,
  CircularProgress,
  TextField,
  Typography,
  FormControl,
  RadioGroup,
  FormControlLabel,
  Radio,
  useTheme,
} from "@mui/material";
import logo from "../../assets/logo.png";
import { Controller, useForm } from "react-hook-form";
import { NavLink, useNavigate } from "react-router";
import useSignup from "../../hooks/useSignup";

const SignUp = () => {
  const { register, handleSubmit, control } = useForm();
  const { signup, loading } = useSignup();
  const navigate = useNavigate();
  const theme = useTheme();

  const onSubmit = async (data) => {
    const success = await signup(data);
    if (success) {
      navigate("/");
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
        {/* Left side */}
        <Box
          sx={{
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
          <Typography variant="h3" fontWeight="bold" gutterBottom textAlign="center">
            Create Account
          </Typography>
          <Typography variant="body1" textAlign="center" maxWidth="300px">
            Sign up now and explore everything we have to offer.
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
          <Box sx={{ width: "100%", textAlign: "center" }}>
            {/* Logo */}
            <Box sx={{ mb: 5 }}>
              <NavLink to="/">
                <img src={logo} alt="logo" />
              </NavLink>
            </Box>

            {/* Form */}
            <Box
              component="form"
              onSubmit={handleSubmit(onSubmit)}
              noValidate
              autoComplete="off"
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: 2,
              }}
            >
              <TextField
                label="Full Name"
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

              <FormControl component="fieldset">
                <Controller
                  name="gender"
                  control={control}
                  defaultValue="male"
                  rules={{ required: true }}
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
                  <CircularProgress size={24} sx={{ color: "#fff" }} />
                ) : (
                  "Sign Up"
                )}
              </Button>
            </Box>

            {/* Login link */}
            <Typography sx={{ mt: 2 }}>
              Already have an account?{" "}
              <NavLink
                to="/login"
                style={{
                  color: theme.palette.primary.main,
                  textDecoration: "none",
                  fontWeight: "bold",
                  marginLeft: "5px",
                }}
              >
                Login
              </NavLink>
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default SignUp;



// import {
//   Box,
//   Button,
//   TextField,
//   Typography,
//   FormControl,
//   RadioGroup,
//   FormControlLabel,
//   Radio,
//   CircularProgress,
// } from "@mui/material";

// import logo from "../../assets/logo.png";
// import { Controller, useForm } from "react-hook-form";
// import { NavLink, useNavigate } from "react-router";
// import useSignup from "../../hooks/useSignup";

// const SignUp = () => {
//   const { register, handleSubmit, control } = useForm();

//   const { signup, loading } = useSignup();

//   const navigate = useNavigate();

//   const onSubmit = async (data) => {
//     const success = await signup(data);
//     if (success) {
//       navigate("/");
//     }
//   };

//   return (
//     <Box
//       sx={{
//         minHeight: "90vh",
//         display: "flex",
//         justifyContent: "center",
//         alignItems: "center",
//       }}
//     >
//       <Box
//         sx={{
//           width: "100%",
//           maxWidth: "500px",
//           textAlign: "center",
//           backgroundColor: "rgba(160, 174, 155, 0.53)",
//           p: 6,
//           borderRadius: 2,
//           boxShadow: 3,
//         }}
//       >
//         <Box
//           sx={{
//             display: "flex",
//             justifyContent: "center",
//             alignItems: "center",
//             mb: 5,
//           }}
//         >
//           <NavLink to="/">
//             <img src={logo} alt="logo" />
//           </NavLink>
//         </Box>

//         {/* Form */}
//         <Box
//           onSubmit={handleSubmit(onSubmit)}
//           component="form"
//           noValidate
//           autoComplete="off"
//           sx={{
//             display: "flex",
//             flexDirection: "column",
//             gap: 2,
//           }}
//         >
//           <TextField
//             label="Fullname"
//             type="text"
//             variant="outlined"
//             fullWidth
//             {...register("fullName", { required: true })}
//           />
//           <TextField
//             label="Username"
//             type="text"
//             variant="outlined"
//             fullWidth
//             {...register("username", { required: true })}
//           />
//           <TextField
//             label="Password"
//             type="password"
//             variant="outlined"
//             fullWidth
//             {...register("password", { required: true })}
//           />

//           <FormControl component="fieldset">
//             <Controller
//               name="gender"
//               control={control}
//               defaultValue="male"
//               rules={{ required: true }}
//               render={({ field }) => (
//                 <RadioGroup row {...field}>
//                   <FormControlLabel
//                     value="male"
//                     control={<Radio />}
//                     label="Male"
//                   />
//                   <FormControlLabel
//                     value="female"
//                     control={<Radio />}
//                     label="Female"
//                   />
//                 </RadioGroup>
//               )}
//             />
//           </FormControl>

//           <Button
//             type="submit"
//             variant="contained"
//             color="primary"
//             sx={{
//               py: 1.5,
//               textTransform: "none",
//               fontWeight: "bold",
//               boxShadow: "none",
//             }}
//           >
//             {loading ? (
//               <CircularProgress size={24} color="white.main" />
//             ) : (
//               "Sign up"
//             )}
//           </Button>
//         </Box>

//         {/* Create New acc */}
//         <Typography sx={{ mt: 2 }}>
//           Already have an account?
//           <NavLink
//             to="/login"
//             style={{
//               color: "#2a3d1b",
//               textDecoration: "none",
//               fontWeight: "bold",
//               marginLeft: "5px",
//             }}
//           >
//             Login
//           </NavLink>
//         </Typography>
//       </Box>
//     </Box>
//   );
// };

// export default SignUp;
