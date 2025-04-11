"use client";
import { signIn } from "next-auth/react";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import {
  TextField,
  Button,
  Box,
  Typography,
  Container,
  Alert,
  CircularProgress,
} from "@mui/material";
import Link from "next/link";
import toast from "react-hot-toast";

const Signin = () => {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const credentialsAction = async (event: React.FormEvent) => {
    event.preventDefault();
    setError(null);
    setIsLoading(true);

    const formData = new FormData(event.target as HTMLFormElement);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    try {
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (result?.error) {
        setError(result.error);
      } else if (result?.ok) {
        router.push("/");
        toast.success("Signed In successfully!!", { duration: 3000 });
      }
    } catch (err) {
      setError("An unexpected error occurred. Please try again.");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <Container component="main" maxWidth="xs">
        <Box
          sx={{
            my: "60px",
            input: {
              color: "white",
            },
            label: {
              color: "gray",
            },
            border: {
              color: "gray",
            },
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                borderColor: "gray",
              },
              "&:hover fieldset": {
                borderColor: "gray",
              },
            },
          }}
        >
          <Typography
            component="h1"
            variant="h4"
            sx={{ mb: 3, fontWeight: "bold", color: "orange" }}
          >
            Sign In
          </Typography>
          <Typography component="h1" variant="body1">
            Not Signed Up Yet?{" "}
          </Typography>
          <Link href="/signup">
            <Typography sx={{ textDecoration: "underline", color: "orange" }}>
              Sign Up
            </Typography>
          </Link>

          {error && (
            <Alert severity="error" sx={{ width: "100%", mb: 2 }}>
              {error}
            </Alert>
          )}

          <Box
            component="form"
            onSubmit={credentialsAction}
            sx={{ mt: 1, width: "100%" }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="credentials-email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              variant="standard"
            />

            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="credentials-password"
              autoComplete="current-password"
              variant="standard"
            />

            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              disabled={isLoading}
              sx={{
                mt: "20px",
                backgroundColor: "orange",
                color: "white",
                "&.Mui-disabled": {
                  backgroundColor: "greenyellow",
                  color: "white",
                  opacity: 1,
                },
              }}
            >
              {isLoading ? (
                <>
                  <CircularProgress
                    size={24}
                    sx={{ mr: 1, color: "inherit" }}
                  />
                  <span>Signing In...</span>
                </>
              ) : (
                "Sign In"
              )}
            </Button>
          </Box>
        </Box>
      </Container>
    </div>
  );
};

export default Signin;
