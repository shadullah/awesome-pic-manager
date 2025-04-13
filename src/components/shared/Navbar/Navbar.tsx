"use client";
import {
  AppBar,
  Box,
  Button,
  Container,
  createTheme,
  IconButton,
  Menu,
  MenuItem,
  Stack,
  Toolbar,
  Typography,
  useMediaQuery,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import AutoAwesomeMosaicIcon from "@mui/icons-material/AutoAwesomeMosaic";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import { useState } from "react";

export default function Navbar() {
  const { data: session } = useSession();
  const handleSignOut = () => {
    signOut({ redirect: true, callbackUrl: "/" });
  };

  const defaultTheme = createTheme();
  const isMobile = useMediaQuery(defaultTheme.breakpoints.down("md"));
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const menuItems = [
    ...(session
      ? [
          <Link
            key="dashboard"
            href="/dashboard"
            style={{ textDecoration: "none" }}
          >
            <MenuItem onClick={handleClose} sx={{ color: "white" }}>
              Dashboard
            </MenuItem>
          </Link>,
          <MenuItem
            key="signout"
            onClick={handleSignOut}
            sx={{ color: "white" }}
          >
            Sign Out
          </MenuItem>,
        ]
      : [
          <Link key="signin" href="/signin" style={{ textDecoration: "none" }}>
            <MenuItem onClick={handleClose} sx={{ color: "white" }}>
              Sign In
            </MenuItem>
          </Link>,
        ]),
  ];

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
                sx={{ color: "cyan" }}
              >
                <AutoAwesomeMosaicIcon />
              </IconButton>
              <Link href="/">
                <Typography
                  variant="h5"
                  sx={{
                    color: "cyan",
                    fontWeight: "bold",
                    textTransform: "uppercase",
                  }}
                >
                  Aw some
                </Typography>
              </Link>
            </Stack>
            {isMobile ? (
              <>
                <Box>
                  <IconButton
                    size="large"
                    edge="end"
                    color="inherit"
                    aria-label="menu"
                    onClick={handleMenu}
                  >
                    <MenuIcon />
                  </IconButton>
                  <Menu
                    id="menu-appbar"
                    anchorEl={anchorEl}
                    anchorOrigin={{
                      vertical: "top",
                      horizontal: "right",
                    }}
                    keepMounted
                    transformOrigin={{
                      vertical: "top",
                      horizontal: "right",
                    }}
                    open={open}
                    onClose={handleClose}
                    sx={{
                      "& .MuiPaper-root": {
                        backgroundColor: "black",
                        marginTop: "45px",
                      },
                    }}
                  >
                    {menuItems}
                  </Menu>
                </Box>
              </>
            ) : (
              <>
                <Stack direction="row" spacing={2}>
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
              </>
            )}
          </Toolbar>
        </AppBar>
      </Container>
    </div>
  );
}
