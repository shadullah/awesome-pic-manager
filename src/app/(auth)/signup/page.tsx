"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Button, TextField, Typography, Container } from "@mui/material";
// import { useRouter } from "next/router";
import { zodResolver } from "@hookform/resolvers/zod";
import { signUpSchema } from "@/schemas/signUpSchema";
import { useRouter } from "next/navigation";

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
        <Typography variant="h4" gutterBottom sx={{ color: "orange" }}>
          Sign Up
        </Typography>

        <form onSubmit={handleSubmit(onSubmit)}>
          <TextField
            label="Full Name"
            variant="outlined"
            fullWidth
            margin="normal"
            {...register("fullname")}
            error={!!errors.fullname}
          />

          <TextField
            label="Email"
            variant="outlined"
            fullWidth
            margin="normal"
            {...register("email")}
            error={!!errors.email}
            helperText={errors.email?.message}
          />

          <TextField
            label="Password"
            type="password"
            variant="outlined"
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
              backgroundColor: "orange",
              color: "white",
              "&.Mui-disabled": {
                backgroundColor: "lightcyan",
                color: "white",
                opacity: 1,
              },
            }}
          >
            {isSubmitting ? "Signing Up..." : "Sign Up"}
          </Button>
        </form>
      </Container>
    </div>
  );
}
