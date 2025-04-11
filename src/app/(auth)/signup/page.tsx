"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import {
  Button,
  TextField,
  Typography,
  Container,
  CircularProgress,
} from "@mui/material";
// import { useRouter } from "next/router";
import { zodResolver } from "@hookform/resolvers/zod";
import { signUpSchema } from "@/schemas/signUpSchema";
import { useRouter } from "next/navigation";
import Link from "next/link";
import toast from "react-hot-toast";

interface SignUpFormInputs {
  fullname: string;
  email: string;
  password: string;
}

export default function SignUpForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpFormInputs>({
    resolver: zodResolver(signUpSchema),
  });

  const onSubmit = async (data: SignUpFormInputs) => {
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (response.ok) {
        alert(result.message);
        router.push("/signin");
        toast.success("Signed Up successfully!!, Login Now.", {
          duration: 3000,
        });
      } else {
        alert(result.message);
      }
    } catch (error) {
      console.error("Error during sign-up:", error);
      alert("There was an error with the sign-up process. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      <Container
        maxWidth="xs"
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
          variant="h4"
          gutterBottom
          sx={{ color: "cyan", fontWeight: "bold" }}
        >
          Sign Up
        </Typography>
        <Typography component="h1" variant="body1">
          Already have an Account?{" "}
        </Typography>
        <Link href="/signin">
          <Typography sx={{ textDecoration: "underline", color: "cyan" }}>
            Sign In
          </Typography>
        </Link>

        <form onSubmit={handleSubmit(onSubmit)}>
          <TextField
            label="Full Name"
            variant="standard"
            fullWidth
            margin="normal"
            {...register("fullname")}
            error={!!errors.fullname}
          />

          <TextField
            label="Email"
            variant="standard"
            fullWidth
            margin="normal"
            {...register("email")}
            error={!!errors.email}
            helperText={errors.email?.message}
          />

          <TextField
            label="Password"
            type="password"
            variant="standard"
            fullWidth
            margin="normal"
            {...register("password")}
            error={!!errors.password}
            helperText={errors.password?.message}
          />

          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            disabled={isSubmitting}
            sx={{
              mt: "20px",
              backgroundColor: "cyan",
              color: "white",
              "&.Mui-disabled": {
                backgroundColor: "greenyellow",
                color: "white",
                opacity: 1,
              },
            }}
          >
            {isSubmitting ? (
              <>
                <CircularProgress size={24} sx={{ mr: 1, color: "inherit" }} />
                <span>Signing Up...</span>
              </>
            ) : (
              "Sign Up"
            )}
          </Button>
        </form>
      </Container>
    </div>
  );
}
