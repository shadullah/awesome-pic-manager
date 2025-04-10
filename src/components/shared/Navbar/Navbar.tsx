"use client";
import {
  AppBar,
  Button,
  Container,
  IconButton,
  Stack,
  Toolbar,
  Typography,
} from "@mui/material";
import AutoAwesomeMosaicIcon from "@mui/icons-material/AutoAwesomeMosaic";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";

export default function Navbar() {
  const { data: session } = useSession();
  const handleSignOut = () => {
    signOut({ redirect: true, callbackUrl: "/" });
  };
  return (
    <div>
      <Container>
        <AppBar position="sticky" sx={{ backgroundColor: "black" }}>
          <Toolbar
            sx={{
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <Stack direction="row" alignItems="center" spacing={1}>
              <IconButton
                size="medium"
                edge="start"
                aria-label="logo"
                sx={{ color: "orange" }}
              >
                <AutoAwesomeMosaicIcon />
              </IconButton>
              <Link href="/">
                <Typography
                  variant="h5"
                  sx={{
                    color: "orange",
                    fontWeight: "bold",
                    textTransform: "uppercase",
                  }}
                >
                  Aw some
                </Typography>
              </Link>
            </Stack>
            <Stack direction="row" spacing={2}>
              <Link href="/posts">
                <Button color="inherit">Posts</Button>
              </Link>
              {session ? (
                <>
                  <Link href="/dashboard">
                    <Button color="inherit">Dashboard</Button>
                  </Link>
                  <Button color="inherit" onClick={handleSignOut}>
                    Sign Out
                  </Button>
                </>
              ) : (
                <>
                  <Link href="/signin">
                    <Button color="inherit">Sign In</Button>
                  </Link>
                </>
              )}
            </Stack>
          </Toolbar>
        </AppBar>
      </Container>
    </div>
  );
}
