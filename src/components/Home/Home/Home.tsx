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
import React, { useEffect, useState } from "react";
import ControlPointOutlinedIcon from "@mui/icons-material/ControlPointOutlined";
import Link from "next/link";

interface Post {
  _id: string;
  imgPost: string;
  caption: string;
}

const HomePage = () => {
  const { data: session } = useSession();
  // console.log(session?.user.email);

  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await fetch("/api/posts", {
          method: "GET",
        });
        const data = await res.json();
        if (data.success) {
          setPosts(data.posts);
        }
      } catch (error) {
        console.log("error fetching posts", error);
      }
    };
    fetchPosts();
  }, []);

  return (
    <div>
      <Container>
        <Box sx={{ textAlign: "center", my: "30px" }}>
          <Stack direction="row" sx={{ justifyContent: "center", mb: "10px" }}>
            <Typography variant="h6">Hello, </Typography>
            <Typography variant="h6" sx={{ color: "orange" }}>
              {session?.user?.name}
            </Typography>
          </Stack>
          <Typography variant="h5" sx={{ fontStyle: "italic" }}>
            {posts.length > 0 ? (
              <>You have total {posts.length} Posts.</>
            ) : (
              <>Your Gellary is empty now.</>
            )}
          </Typography>
        </Box>
        <Grid container spacing={4} sx={{ my: 12, mx: 4 }}>
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
          {posts?.map((post) => (
            <Grid key={post?._id} item xs={12} sm={6} md={4}>
              <Card>
                <CardMedia
                  component="img"
                  height="140"
                  image={post.imgPost}
                  alt="Item 1"
                />
                <CardContent>
                  <Typography variant="h6" sx={{ textAlign: "center" }}>
                    {post.caption}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </div>
  );
};

export default HomePage;
