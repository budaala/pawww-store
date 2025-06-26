import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Stack, Button } from "@mui/material";
import { useState } from "react";

// todo: hmm this email is not looking correctly
// todo: password regex with cool ui - register

const LogIn = () => {
  const cannotBeEmptyError = "Wypełnij to pole.";
  const [formErrors, setFormErrors] = useState({ email: "", password: "" });
  const [formValues, setFormValues] = useState({ email: "", password: "" });

  const validate = () => {
    const errors: { email: string; password: string } = {
      email: "",
      password: "",
    };

    if (!formValues.email.trim()) {
      errors.email = "Wypełnij to pole.";
    } else if (!/\S+@\S+\.\S+/.test(formValues.email)) {
      errors.email = "Ten email nie wygląda poprawnie...";
    }

    if (!formValues.password.trim()) {
      errors.password = "Wypełnij to pole.";
    }

    setFormErrors(errors);
    return !errors.email && !errors.password;
  };

  const handleSubmit = () => {
    if (validate()) {
      // wykonaj logowanie (np. fetch)
      console.log("Dane poprawne:", formValues);
    }
  };

  return (
    <>
      <Box
        sx={{
          mx: 3,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Box>
          <Typography variant="h2">Login</Typography>
          <Typography variant="subtitle1" gutterBottom>
            Zaloguj się na swoje konto
          </Typography>
        </Box>
        <Stack
          component="form"
          sx={{ width: "35ch" }}
          spacing={2}
          noValidate
          autoComplete="off"
        >
          <TextField
            id="outlined-error"
            label="E-mail"
            value={formValues.email}
            onChange={(e) => {
              setFormValues({ ...formValues, email: e.target.value });
              setFormErrors({ ...formErrors, email: "" });
            }}
            error={!!formErrors.email}
            helperText={formErrors.email}
          />
          <TextField
            id="outlined-error-helper-text"
            label="Hasło"
            value={formValues.password}
            onChange={(e) => {
              setFormValues({ ...formValues, password: e.target.value });
              setFormErrors({ ...formErrors, password: "" });
            }}
            error={!!formErrors.password}
            helperText={formErrors.password}
          />
          <Button
            variant="contained"
            sx={{ backgroundColor: "#1d9994" }}
            onClick={handleSubmit}
          >
            Zaloguj się
          </Button>
        </Stack>
      </Box>
    </>
  );
};

export default LogIn;
