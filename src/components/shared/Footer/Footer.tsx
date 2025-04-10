import React from "react";
import { Box, Typography, Link, Stack, IconButton } from "@mui/material";
import { Instagram, Facebook, Twitter } from "@mui/icons-material"; // Import Material-UI icons

const Footer = () => {
  return (
    <footer>
      <Box sx={{ px: 2, py: 8, maxWidth: "1100px", mx: "auto" }}>
        <Stack direction="row" spacing={3}>
          <Box sx={{ mb: 8 }}>
            <Typography
              variant="h4"
              sx={{ mb: 6, fontWeight: "bold", lineHeight: 1.5 }}
            >
              Aw some image gellary is a realtime gellary where people can
              upload their images.
            </Typography>
            <Typography variant="subtitle1" sx={{ mb: 1 }}>
              Get in touch
            </Typography>
            <Box sx={{ mb: 8 }}>
              <Typography variant="h6">hexaalif2020@gmail.com</Typography>
              <Typography variant="h6">+8801612456987</Typography>
            </Box>
          </Box>

          <Box
            sx={{
              backgroundColor: "gray.800",
              px: 6,
              py: 3,
              textAlign: "center",
              borderRadius: 3,
              mb: 6,
            }}
          >
            <Typography variant="h4" sx={{ color: "white" }}>
              Follow us
            </Typography>
            <Stack
              direction="row"
              spacing={2}
              justifyContent="center"
              sx={{ mt: 2 }}
            >
              {/* Social Media Icons */}
              <IconButton
                sx={{ color: "white", "&:hover": { color: "violet" } }}
                component="a"
                href="https://instagram.com"
              >
                <Instagram />
              </IconButton>
              <IconButton
                sx={{ color: "white", "&:hover": { color: "blue" } }}
                component="a"
                href="https://facebook.com"
              >
                <Facebook />
              </IconButton>
              <IconButton
                sx={{ color: "white", "&:hover": { color: "blue" } }}
                component="a"
                href="https://twitter.com"
              >
                <Twitter />
              </IconButton>
            </Stack>
          </Box>
        </Stack>

        {/* Bottom Footer */}
        <Box sx={{ display: "flex", justifyContent: "space-between", mt: 4 }}>
          <Typography variant="body2" sx={{ color: "gray.500" }}>
            &copy; {new Date().getFullYear()} Aw some All rights reserved.
          </Typography>
          <Stack direction="row" spacing={4} sx={{ color: "gray.500" }}>
            <Link href="/" variant="body2">
              Privacy Policy
            </Link>
            <Link href="/" variant="body2">
              Terms of Services
            </Link>
          </Stack>
        </Box>
      </Box>
    </footer>
  );
};

export default Footer;
