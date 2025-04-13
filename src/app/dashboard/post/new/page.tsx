"use client";
import { useRouter } from "next/navigation";
import { SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import React, { useState } from "react";
import {
  Box,
  Button,
  CircularProgress,
  Container,
  TextField,
  Typography,
} from "@mui/material";

interface postForm {
  caption: string;
  imgPost: string;
}

const AddNewPost = () => {
  const [isLoading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<postForm>();

  const [image, setImage] = useState<File | null>(null);
  const router = useRouter();
  //   const { data: session } = useSession();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setImage(e.target.files[0]);
    }
  };

  const handlePostCreate: SubmitHandler<postForm> = async (data) => {
    setLoading(true);

    if (!image) {
      toast.error("Please upload an image");
      return;
    }

    const formData = new FormData();
    formData.append("caption", data.caption);
    formData.append("image", image);
    console.log(formData);

    try {
      const res = await fetch("/api/posts", {
        method: "POST",
        body: formData,
      });
      console.log(res);

      if (res.ok) {
        toast.success("New Post added", { duration: 3000 });
        router.push("/");
      } else {
        toast.error("Unthorized!! Please login to Add Post", {
          duration: 3000,
        });
      }
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "An unknown error occurred";
      toast.error(errorMessage);
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="sm">
      <Box
        component="form"
        onSubmit={handleSubmit(handlePostCreate)}
        sx={{
          backgroundColor: "#1e1e1e",
          borderRadius: 2,
          p: 4,
          boxShadow: 3,
          display: "flex",
          flexDirection: "column",
          gap: 3,
        }}
      >
        <Typography variant="h5" color="cyan" fontWeight="bold">
          Create New Post
        </Typography>

        <TextField
          label="Caption"
          fullWidth
          variant="outlined"
          {...register("caption", { required: "caption is required" })}
          error={!!errors.caption}
          helperText={errors.caption?.message}
          InputProps={{ style: { color: "white" } }}
          InputLabelProps={{ style: { color: "gray" } }}
          sx={{
            "& .MuiOutlinedInput-root": {
              "& fieldset": { borderColor: "gray" },
              "&:hover fieldset": { borderColor: "cyan" },
            },
          }}
        />

        <input
          type="file"
          onChange={handleFileChange}
          style={{ color: "white" }}
        />

        <Button
          type="submit"
          variant="contained"
          fullWidth
          sx={{
            backgroundColor: "cyan",
            color: "white",
            fontWeight: "bold",
            "&:hover": {
              backgroundColor: "darkcyan",
            },
            "&.Mui-disabled": {
              backgroundColor: "lightgray",
              color: "white",
              opacity: 1,
            },
          }}
          disabled={!image}
        >
          {isLoading ? (
            <>
              <CircularProgress size={24} sx={{ mr: 1, color: "inherit" }} />
              <span>Adding post...</span>
            </>
          ) : (
            "Add New Post"
          )}
        </Button>
      </Box>
    </Container>
  );
};

export default AddNewPost;
