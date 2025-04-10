"use client";
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Container,
  Grid,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import { useSession } from "next-auth/react";
import React from "react";
import ControlPointOutlinedIcon from "@mui/icons-material/ControlPointOutlined";
import Link from "next/link";

const HomePage = () => {
  const { data: session } = useSession();
  console.log(session?.user.email);
  return (
    <div>
      <Container>
        <Box sx={{ textAlign: "center", my: "20px" }}>
          <Stack direction="row" sx={{ justifyContent: "center", mb: "10px" }}>
            <Typography variant="h6">Hello, </Typography>
            <Typography variant="h6" sx={{ color: "orange" }}>
              {session?.user?.name}
            </Typography>
          </Stack>
          <Typography variant="h5" sx={{ fontStyle: "italic" }}>
            Your Gellary is empty now.
          </Typography>
        </Box>
        <Grid container spacing={4} sx={{ my: 4, mx: 4 }}>
          <Link href="/dashboard/post/new">
            <Box
              sx={{
                border: "2px solid",
                borderColor: "grey.500",
                padding: 5,
                borderRadius: 1,
              }}
            >
              <IconButton
                size="large"
                edge="start"
                aria-label="icon"
                sx={{
                  color: "orange",
                  mx: "auto",
                }}
              >
                <ControlPointOutlinedIcon sx={{ fontSize: "100px" }} />
              </IconButton>
              <Typography
                variant="body1"
                sx={{
                  color: "orange",
                  fontWeight: "bold",
                  textTransform: "uppercase",
                }}
              >
                Add new Post
              </Typography>
            </Box>
          </Link>
          <Grid item xs={12} sm={6} md={4}>
            <Card>
              <CardMedia
                component="img"
                height="140"
                image="https://via.placeholder.com/150"
                alt="Item 1"
              />
              <CardContent>
                <Typography variant="h6">Item 1</Typography>
                <Typography variant="body2" color="textSecondary">
                  Description for Item 1.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default HomePage;
