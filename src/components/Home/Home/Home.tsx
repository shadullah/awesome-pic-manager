"use client";
import {
  Box,
  Card,
  // CardContent,
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
            <Typography
              variant="h6"
              sx={{ color: "cyan", textTransform: "uppercase", ml: 1 }}
            >
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
          <Grid size={{ xs: 12, sm: 6, md: 4 }}>
            <Link href="/dashboard/post/new" passHref>
              <Box
                sx={{
                  border: "2px dashed cyan",
                  borderRadius: 2,
                  padding: 4,
                  height: "100%",
                  textAlign: "center",
                  transition: "0.3s",
                  "&:hover": {
                    backgroundColor: "rgba(255,165,0,0.1)",
                    cursor: "pointer",
                  },
                }}
              >
                <IconButton size="large" sx={{ color: "cyan" }}>
                  <ControlPointOutlinedIcon sx={{ fontSize: 150 }} />
                </IconButton>
                <Typography variant="body1" sx={{ fontWeight: "bold", mt: 1 }}>
                  Add New Post
                </Typography>
              </Box>
            </Link>
          </Grid>
          {posts?.map((post) => (
            <Grid size={{ xs: 12, sm: 6, md: 4 }} key={post._id}>
              <Card
                sx={{
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  transition: "0.3s",
                  "&:hover": {
                    transform: "scale(1.03)",
                    boxShadow: 6,
                  },
                }}
              >
                <CardMedia
                  component="img"
                  image={post.imgPost}
                  alt="Post Image"
                  sx={{ objectFit: "cover", height: "300px" }}
                />
                {/* <CardContent sx={{ backgroundColor: "#1e1e1e", flexGrow: 1 }}>
                  <Typography
                    variant="h6"
                    sx={{ textAlign: "center", color: "cyan" }}
                  >
                    {post.caption}
                  </Typography>
                </CardContent> */}
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </div>
  );
};

export default HomePage;
