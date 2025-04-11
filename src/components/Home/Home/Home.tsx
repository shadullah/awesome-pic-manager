"use client";
import {
  AppBar,
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Container,
  Dialog,
  DialogContent,
  Grid,
  IconButton,
  Slide,
  Stack,
  Toolbar,
  Typography,
} from "@mui/material";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import ControlPointOutlinedIcon from "@mui/icons-material/ControlPointOutlined";
import Link from "next/link";
import { TransitionProps } from "@mui/material/transitions";
import Image from "next/image";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import toast from "react-hot-toast";
interface Post {
  _id: string;
  imgPost: string;
  caption: string;
}

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<unknown>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const HomePage = () => {
  const { data: session } = useSession();
  const [open, setOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const handleOpen = (imgUrl: string) => {
    setSelectedImage(imgUrl);
    setOpen(true);
  };

  const handleClose = () => {
    setSelectedImage(null);
    setOpen(false);
  };

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

  const handleDelete = async (postId: string) => {
    const confirmation = window.confirm("Are you sure to delete the post?");
    if (!confirmation) return;

    try {
      const res = await fetch("/api/posts", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ postId }),
      });
      const data = await res.json();
      if (data.success) {
        setPosts(posts.filter((post) => post._id !== postId));
        toast.success("deleete success", { duration: 2000 });
      }
    } catch (error) {
      console.log("error deleting post", error);
      toast.error("delete failed", { duration: 2000 });
    }
  };

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
              <>Your Gallery is empty now.</>
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
                    backgroundColor: "rgba(129, 196, 233, 0.1)",
                    cursor: "pointer",
                  },
                }}
              >
                <IconButton size="large" sx={{ color: "cyan" }}>
                  <ControlPointOutlinedIcon
                    sx={{ fontSize: 100, mx: "auto" }}
                  />
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
                  onClick={() => handleOpen(post.imgPost)}
                  component="img"
                  image={post.imgPost}
                  alt="Post Image"
                  sx={{
                    objectFit: "cover",
                    height: "300px",
                    ":hover": { cursor: "pointer" },
                  }}
                />
                <CardContent
                  sx={{
                    backgroundColor: "rgb(20, 19, 19)",
                    textAlign: "center",
                  }}
                >
                  <Typography
                    variant="h6"
                    sx={{ textAlign: "center", color: "cyan", mb: 2 }}
                  >
                    {post.caption}
                  </Typography>
                  <Button
                    onClick={() => handleDelete(post._id)}
                    variant="outlined"
                    color="error"
                  >
                    Delete
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <AppBar sx={{ backgroundColor: "grey" }}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
            >
              <CancelOutlinedIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
        <DialogContent sx={{ p: 12, backgroundColor: "grey.800" }}>
          <Image
            width={1000}
            height={1000}
            src={selectedImage ?? "/vercel.svg"}
            alt="Preview"
            style={{ width: "100%", height: "auto", objectFit: "cover" }}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default HomePage;
